import { IContactForm } from '@/app/interfaces/IContactForm';
import { Document } from 'mongodb';

export interface IContactRequest
    extends Omit<IContactForm, 'captcha'>,
        Document {
    createdAt: string;
}
