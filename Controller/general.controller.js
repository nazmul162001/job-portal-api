const service = require("../Service/general.service")

exports.highestPaid = async (req, res) => {
    try {
        const jobs = await service.highestPaidService()
        res.status(200).json({ status: 'Success', data: jobs })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.mostApplied = async (req, res) => {
    try {
        const jobs = await service.mostAppliedService()
        res.status(200).json({ status: 'Success', data: jobs })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}