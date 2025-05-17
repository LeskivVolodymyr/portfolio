import { IContactRequestDao } from '@/app/interfaces/dao/IContactRequestDao';
import Logger from '@/app/utils/logger/Logger';

const sendTelegramMessage = async (
    connectModel: IContactRequestDao,
    logger: Logger
): Promise<void> => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    try {
        const message = `
            New contact request from ${connectModel.name}
            Email: ${connectModel.email}
            Subject: ${connectModel.subject}
            Message: ${connectModel.message}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });
    } catch (e: unknown) {
        await logger.logAsync(
            'error',
            `Failed to send message to Telegram ${String(e)}`
        );
    }
};

export default sendTelegramMessage;
