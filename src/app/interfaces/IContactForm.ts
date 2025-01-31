export interface IContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
    captcha?: string | null;
}
