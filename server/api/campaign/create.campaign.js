import { createCampaign } from '../../data/campaignTable'

export default defineEventHandler(async (event) => {
    try {
        const {channel, message, keyboardType, buttons} = await readBody(event);
        let campaign = createCampaign(channel, message, keyboardType, buttons)
        return campaign;
    } catch (error) {
        console.error('Ошибка при создании кампании:', error);
        throw error;
    }
})
