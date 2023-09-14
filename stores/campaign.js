// store/campaign.js
import { defineStore } from 'pinia';

export const useCampaignStore = defineStore({
    id: 'campaign',
    state: () => ({
        channelsData: [], // Здесь можно хранить данные для каждого канала
        errorMessage: null, // Состояние для сообщения об ошибке

    }),
    actions: {
        checkData({ channel, message, keyboardType, buttons }){
            if (channel === 'VK') {
                if (message.length === 0) {
                    this.errorMessage = 'Поле текста сообщения для VK не может быть пустым!';
                    throw new Error('Поле текста сообщения для VK не может быть пустым!');
                }
                if (message.length > 4096) {
                    this.errorMessage = 'Слишком длинное сообщение для VK (более 4096 символов).';
                    throw new Error('Слишком длинное сообщение для VK (более 4096 символов).');
                }
                for (let i = 0; i < buttons.length; i++) {
                    const button = buttons[i];
                    if (button[1].length === 0) {
                        this.errorMessage = `Текст кнопки № ${i+1} для VK не может быть пустым.`;
                        throw new Error(`Текст кнопки № ${i+1} для VK не может быть пустым.`);
                    }
                }
                if (keyboardType === 'standard') {
                    if (buttons.length > 40) {
                        this.errorMessage = 'Вы можете добавить не более 40 кнопок для стандартного отображения клавиатуры VK!';
                        throw new Error('Вы можете добавить не более 40 кнопок для стандартного отображения клавиатуры VK!');
                    }
                    }
                else if (keyboardType === 'inline') {
                    if (buttons.length > 10) {
                        this.errorMessage = 'Вы можете добавить не более 10 кнопок для inline отображения клавиатуры VK!';
                        throw new Error('Вы можете добавить не более 10 кнопок для inline отображения клавиатуры VK!');
                    }
                }

                }
            else if (channel === 'Whatsapp') {
                if (message.length === 0) {
                    this.errorMessage = 'Поле текста сообщения для Whatsapp не может быть пустым!';
                    throw new Error('Поле текста сообщения для Whatsapp не может быть пустым!');
                }
                if (message.length > 1000) {
                    this.errorMessage = 'Слишком длинное сообщение для Whatsapp (более 1000 символов).';
                    throw new Error('Слишком длинное сообщение для Whatsapp (более 1000 символов).');
                }
                for (let i = 0; i < buttons.length; i++) {
                    const button = buttons[i];
                    if (button[1].length === 0) {
                        this.errorMessage = `Текст кнопки № ${i+1} для Whatsapp не может быть пустым.`;
                        throw new Error(`Текст кнопки № ${i+1} для Whatsapp не может быть пустым.`);
                    }
                }
                if (keyboardType === 'standard') {
                    if (buttons.length > 10) {
                        this.errorMessage = 'Вы можете добавить не более 10 кнопок для стандартного отображения клавиатуры Whatsapp!';
                        throw new Error('Вы можете добавить не более 10 кнопок для стандартного отображения клавиатуры Whatsapp!');
                    }
                    for (let i = 0; i < buttons.length; i++) {
                        const button = buttons[i];
                        if (button[1].length > 20 && button[0] === 'quick_response') {
                            this.errorMessage = `Длина текста кнопки № ${i+1} для Whatsapp должна быть не больше 20 символов.`;
                            throw new Error(`Длина текста кнопки № ${i+1} для Whatsapp должна быть не больше 20 символов.`);
                        }
                    }
                }
                else if (keyboardType === 'inline') {
                    if (buttons.length > 3) {
                        this.errorMessage = 'Вы можете добавить не более 3 кнопок для inline отображения клавиатуры Whatsapp!';
                        throw new Error('Вы можете добавить не более 3 кнопок для inline отображения клавиатуры Whatsapp!');
                    }
                    for (let i = 0; i < buttons.length; i++) {
                        const button = buttons[i];
                        if (button[1].length > 20 && button[0] === 'quick_response') {
                            this.errorMessage = `Длина текста кнопки № ${i+1} для Whatsapp должна быть не больше 20 символов!`;
                            throw new Error(`Длина текста кнопки № ${i+1} для Whatsapp должна быть не больше 20 символов!`);
                        }
                    }
                    let linkButtonsWhatsapp = 0;
                    for (let i = 0; i < buttons.length; i++) {
                        const button = buttons[i];
                        if (button[0] === 'link') {
                            linkButtonsWhatsapp += 1;
                        }
                    }
                    if (linkButtonsWhatsapp > 1){
                        this.errorMessage = `Для inline отображения клавиатуры в Whatsapp может быть не больше 1 кнопки-ссылки!`;
                        throw new Error(`Для inline отображения клавиатуры в Whatsapp может быть не больше 1 кнопки-ссылки!`);
                    }
                }
            }
            else if (channel === 'Telegram') {
                if (message.length === 0) {
                    this.errorMessage = 'Поле текста сообщения для Telegram не может быть пустым!';
                    throw new Error('Поле текста сообщения для Telegram не может быть пустым!');
                }
                if (message.length > 4096) {
                    this.errorMessage = 'Слишком длинное сообщение для Telegram (более 4096 символов).';
                    throw new Error('Слишком длинное сообщение для Telegram (более 4096 символов).');
                }
                for (let i = 0; i < buttons.length; i++) {
                    const button = buttons[i];
                    if (button[1].length === 0) {
                        this.errorMessage = `Текст кнопки № ${i+1} для Telegram не может быть пустым.`;
                        throw new Error(`Текст кнопки № ${i+1} для Telegram не может быть пустым.`);
                    }
                }
                if (keyboardType === 'inline') {
                    for (let i = 0; i < buttons.length; i++) {
                        const button = buttons[i];
                        if (button[1].length > 64 && button[0] === 'quick_response') {
                            this.errorMessage = `Длина текста кнопки № ${i+1} для Telegram должна быть не больше 64 символов.`;
                            throw new Error(`Длина текста кнопки № ${i+1} для Telegram должна быть не больше 64 символов.`);
                        }
                    }
                }
            }
            else if (channel === 'СМС') {
                if (message.length === 0) {
                    this.errorMessage = 'Поле текста сообщения для СМС не может быть пустым!';
                    throw new Error('Поле текста сообщения для СМС не может быть пустым!');
                }
                if (buttons.length > 0) {
                    this.errorMessage = 'У СМС не может быть кнопок!';
                    throw new Error('У СМС не может быть кнопок!');
                }
            }
        },
        addChannelData({ channel, message, keyboardType, buttons }) {
            // Добавляем данные кампании в хранилище
            this.channelsData.push({ channel, message, keyboardType, buttons });
        },
        clearError() {
            // Метод для очистки сообщения об ошибке
            this.errorMessage = null;
        },
    },
});
