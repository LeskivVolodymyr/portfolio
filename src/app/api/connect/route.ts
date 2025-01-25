import { IContactForm } from '@/app/interfaces/IContactForm';
import { formDataToContactForm } from '@/app/helpers/mapper';

export async function POST(req: Request) {
    try {
        const requestPayload: IContactForm = formDataToContactForm(
            await req.formData()
        );

        console.log(requestPayload);

        return Response.json(
            { m: '//_-)' },
            {
                status: 200,
            }
        );
    } catch (e: unknown) {
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
