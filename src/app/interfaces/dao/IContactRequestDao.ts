import { IContactForm } from '@/app/interfaces/IContactForm';
import { Document } from 'mongodb';

export interface IContactRequestDao
    extends Omit<IContactForm, 'captcha'>,
        Document {
    createdAt: string;
    _id?: string;
}
