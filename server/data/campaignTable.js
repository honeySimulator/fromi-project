// ~/server/api/campaignTable.js
import prisma from './prisma';


export async function createCampaign(channel, message, keyboardType, buttons) {
    const data = {channel, message, keyboardType, buttons}
    if (keyboardType !== null) {
        data.keyboardType = keyboardType;
    }
    try {
        const campaign = await prisma.campaign.create({
            data,
        });

        return campaign;
    } catch (error) {
        throw new Error(`Error creating campaign: ${error.message}`);
    }
}

export async function getCampaigns() {
    const campaign = await prisma.user.findMany({
        include: {
            campaign: {

            },
        },
    })
    return campaign
}
