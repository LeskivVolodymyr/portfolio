import { IContactForm } from '@/app/interfaces/IContactForm';
import { Document } from 'mongodb';

export interface IContactRequest extends IContactForm, Document {
    createdAt: string;
}
