import { IContactForm } from '@/app/interfaces/IContactForm';
import { formDataToContactForm } from '@/app/utils/mapper';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';
import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';
import * as Yup from 'yup';
import { IContactRequestDao } from '@/app/interfaces/dao/IContactRequestDao';
import MongoService from '@/app/_lib/mongo-service';
import LoggerFactory from '@/app/utils/logger/LoggerFactory';
import Logger from '@/app/utils/logger/Logger';
import sendTelegramMessage from '@/app/_lib/telegram-client';

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

async function isCaptchaValid(
    logger: Logger,
    captcha?: string | null
): Promise<boolean> {
    const captchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${captcha}`,
        { method: 'POST' }
    );

    const captchaResponseJson = await captchaResponse.json();
    const isValid = captchaResponseJson.success;

    if (!isValid)
        await logger.logAsync(
            'error',
            `Captcha validation failed. Error codes: ${JSON.stringify(captchaResponseJson['error-codes'])}`
        );

    return isValid;
}

const recaptchaSecretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(req: Request) {
    const logger = LoggerFactory.createMongoLogger();

    try {
        const requestPayload: IContactForm = formDataToContactForm(
            await req.formData()
        );
        const sanitizedPayload = sanitizeForm(requestPayload);

        await contactFormSchema.validate(sanitizedPayload, {
            abortEarly: false,
        });

        const isValid = await isCaptchaValid(logger, requestPayload.captcha);

        if (!isValid) {
            return Response.json(
                'Captcha validation failed. Please try again.',
                {
                    status: 500,
                }
            );
        }

        const dao: IContactRequestDao = {
            ...sanitizedPayload,
            createdAt: new Date().toISOString(),
        };

        await sendTelegramMessage(dao, logger);

        const service = new MongoService();
        const collection = await service.getCollection<IContactRequestDao>();
        await collection.insertOne(dao);

        return Response.json({
            status: 200,
        });
    } catch (e: unknown) {
        if (e instanceof Yup.ValidationError) {
            await logger.logAsync('error', JSON.stringify(e.errors));
            return Response.json({ errors: e.errors }, { status: 400 });
        }
        if (e instanceof Error) {
            await logger.logAsync('error', String(e));
            return Response.json(`Something went wrong, try again`, {
                status: 500,
            });
        } else {
            await logger.logAsync('error', 'something went wrong');
            return Response.json('Something went wrong, try again.', {
                status: 500,
            });
        }
    }
}
