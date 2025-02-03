import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';

describe('contactFormSchema', () => {
    it('should validate a valid form', async () => {
        const validForm = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Hello',
            message: 'This is a valid message.',
        };

        await expect(contactFormSchema.validate(validForm)).resolves.toBe(
            validForm
        );
    });

    describe('name', () => {
        it('should invalidate a form with a short name', async () => {
            const invalidForm = {
                name: 'J',
                email: 'john.doe@example.com',
                subject: 'Hello',
                message: 'This is a valid message.',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Name too short (min 2 chars).');
        });

        it('should invalidate a form with a long name', async () => {
            const invalidForm = {
                name: 'a'.repeat(256),
                email: 'john.doe@example.com',
                subject: 'Hello',
                message: 'This is a valid message.',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Name too long (max 255 chars).');
        });
    });

    describe('email', () => {
        it('should invalidate a form with an invalid email', async () => {
            const invalidForm = {
                name: 'John Doe',
                email: 'invalid-email',
                subject: 'Hello',
                message: 'This is a valid message.',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Invalid email address.');
        });

        it('should invalidate a form with an empty email', async () => {
            const invalidForm = {
                name: 'John Doe',
                email: '',
                subject: 'Hello',
                message: 'This is a valid message.',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Email is required.');
        });
    });

    describe('subject', () => {
        it('should invalidate a form with a short subject', async () => {
            const invalidForm = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                subject: 'S',
                message: 'This is a valid message.',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Subject too short (min 2 chars).');
        });

        it('should invalidate a form with a long subject', async () => {
            const invalidForm = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                subject: 'a'.repeat(501),
                message: 'This is a valid message.',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Subject too long (max 500 chars).');
        });

        it('should validate a form with an empty subject', async () => {
            const validForm = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                subject: '',
                message: 'This is a valid message.',
            };

            await expect(contactFormSchema.validate(validForm)).resolves.toBe(
                validForm
            );
        });
    });

    describe('message', () => {
        it('should invalidate a form with a short message', async () => {
            const invalidForm = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                subject: 'Hello',
                message: 'Short',
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Message too short (min 10 chars).');
        });

        it('should invalidate a form with a long message', async () => {
            const invalidForm = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                subject: 'Hello',
                message: 'a'.repeat(10001),
            };

            await expect(
                contactFormSchema.validate(invalidForm)
            ).rejects.toThrow('Message too long (max 10,000 chars).');
        });
    });
});
