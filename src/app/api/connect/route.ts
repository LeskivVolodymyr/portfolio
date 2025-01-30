import { IContactForm } from '@/app/interfaces/IContactForm';
import { formDataToContactForm } from '@/app/utils/mapper';
import rateLimit from '@/app/utils/rate-limit';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';
import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';
import * as Yup from 'yup';
import { IContactRequest } from '@/app/interfaces/dao/IContactReuest';
import MongoService from '@/app/_lib/mongo-service';
import MongoLogger from '@/app/utils/mongoLogger';

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

        const dao: IContactRequest = {
            ...sanitizedPayload,
            createdAt: new Date().toISOString(),
        };

        const collection =
            await new MongoService().getCollection<IContactRequest>();

        await collection.insertOne(dao);

        return Response.json(
            { m: '//_-)' },
            {
                status: 200,
            }
        );
    } catch (e: unknown) {
        // TODO: do not expose error data. add logging.
        // TODO: fix repetitions & make more readable structure
        if (e instanceof Yup.ValidationError) {
            const logger = new MongoLogger();
            await logger.log('error', JSON.stringify(e.errors));
            return Response.json({ errors: e.errors }, { status: 400 });
        }
        if (e instanceof Error) {
            const logger = new MongoLogger();
            await logger.log('error', e.message);

            return Response.json(`Something went wrong, try again}`, {
                status: 500,
            });
        } else {
            const logger = new MongoLogger();
            await logger.log('error', String(e));
            return Response.json('Something went wrong, try again.', {
                status: 500,
            });
        }
    }
}
