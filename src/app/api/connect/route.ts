import { IContactForm } from '@/app/interfaces/IContactForm';
import { formDataToContactForm } from '@/app/utils/mapper';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';
import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';
import * as Yup from 'yup';
import { IContactRequestDao } from '@/app/interfaces/dao/IContactRequestDao';
import MongoService from '@/app/_lib/mongo-service';
import MongoLogger from '@/app/utils/mongoLogger';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

function sanitizeForm(input: IContactForm): IContactForm {
    return {
        name: purify.sanitize(validator.escape(input.name)),
        email: purify.sanitize(validator.normalizeEmail(input.email) || ''),
        subject: purify.sanitize(validator.escape(input.subject)),
        message: purify.sanitize(validator.escape(input.message)),
    };
}

const recaptchaSecretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(req: Request) {
    try {
        const requestPayload: IContactForm = formDataToContactForm(
            await req.formData()
        );
        const sanitizedPayload = sanitizeForm(requestPayload);

        await contactFormSchema.validate(sanitizedPayload, {
            abortEarly: false,
        });

        const captchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${requestPayload.captcha}`,
            { method: 'POST' }
        );

        const captchaResponseJson = await captchaResponse.json();

        if (!captchaResponseJson.success) {
            return Response.json(
                { error: captchaResponseJson['error-codes'][0] },
                {
                    status: 500,
                }
            );
        }

        const dao: IContactRequestDao = {
            ...sanitizedPayload,
            createdAt: new Date().toISOString(),
        };

        const service = new MongoService();
        const collection = await service.getCollection<IContactRequestDao>();
        await collection.insertOne(dao);

        return Response.json({
            status: 200,
        });
    } catch (e: unknown) {
        const logger = new MongoLogger();
        if (e instanceof Yup.ValidationError) {
            await logger.log('error', JSON.stringify(e.errors));
            return Response.json({ errors: e.errors }, { status: 400 });
        }
        if (e instanceof Error) {
            console.log(e.message);
            await logger.log('error', e.message);
            return Response.json(`Something went wrong, try again}`, {
                status: 500,
            });
        } else {
            await logger.log('error', 'something went wrong');
            return Response.json('Something went wrong, try again.', {
                status: 500,
            });
        }
    }
}
