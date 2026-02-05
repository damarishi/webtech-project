const loyaltyService = require('../services/loyalty.service');

exports.getLoyaltyDiscount = async (req, res) => {
    try {
        const discount = await loyaltyService.calculateLoyaltyDiscount(req.user.user_id);
        res.json(discount);
    } catch (error) {
        console.error('Error while calculating loyalty discount: ' + error.message);
        res.status(500).json({ error: 'Failed to calculate loyalty discount' });
    }
}

exports.getProgress = async (req, res) => {
    try {
        const progress =
            await loyaltyService.getFullProgress(req.user.user_id);
        res.json(progress);
    } catch (error) {
        console.error('Error while calculating loyalty progress: ' + error.message);
        res.status(500).json({ error: 'Failed to calculate loyalty progress' });
    }
}