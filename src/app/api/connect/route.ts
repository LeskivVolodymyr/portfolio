import { IContactForm } from '@/app/interfaces/IContactForm';
import { formDataToContactForm } from '@/app/helpers/mapper';
import rateLimit from '@/app/helpers/rate-limit';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';
import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';
import * as Yup from 'yup';

// TODO: refactor all this to make look ok
const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 20, // Max 20 users per second, but here no unique identifier
});

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

export async function POST(req: Request) {
    try {
        const requestPayload: IContactForm = formDataToContactForm(
            await req.formData()
        );

        const sanitizedPayload = sanitizeForm(requestPayload);

        console.log(sanitizedPayload);

        await contactFormSchema.validate(sanitizedPayload, {
            abortEarly: false,
        });

        try {
            await limiter.check(20, 'CACHE_TOKEN');
        } catch {
            return Response.json(
                'You are sending too many requests. Try again later.',
                {
                    status: 429,
                }
            );
        }

        return Response.json(
            { m: '//_-)' },
            {
                status: 200,
            }
        );
    } catch (e: unknown) {
        // TODO: do not expose error data. add logging.
        if (e instanceof Yup.ValidationError) {
            return Response.json({ errors: e.errors }, { status: 400 });
        }
        if (e instanceof Error) {
            return Response.json(
                `Something went wrong, try again. Exception ${e.message}`,
                { status: 500 }
            );
        } else {
            return Response.json('Something went wrong, try again.', {
                status: 500,
            });
        }
    }
}
