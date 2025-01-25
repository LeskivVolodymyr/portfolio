import { IContactForm } from '@/app/interfaces/IContactForm';

function contactFormToFormData(contactForm: IContactForm): FormData {
    const formData = new FormData();
    Object.entries(contactForm).forEach(([key, value]) => {
        formData.append(key, value ?? '');
    });
    return formData;
}

function formDataToContactForm(formData: FormData): IContactForm {
    return {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
    } as IContactForm;
}

export { contactFormToFormData, formDataToContactForm };
