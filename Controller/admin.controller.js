const service = require("../Service/admin.service")

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await service.getAllCandidatesService()
        res.status(200).json({ status: 'Success', data: candidates })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.getCandidate = async (req, res) => {
    const { id } = req.params
    try {
        const candidate = await service.getCandidateService(id)
        res.status(200).json({ status: 'Success', data: candidate })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.getHiringManagers = async (req, res) => {
    try {
        const hiringManagers = await service.getHiringManagersService()
        res.status(200).json({ status: 'Success', data: hiringManagers })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.updateUser = async (req, res) => {
    const {id} = req.params
    const role = {role: 'hiring-manager'}
    try {
        const candidates = await service.updateUserService(id, role)
        console.log(candidates)
        res.status(200).json({ status: 'Success', message: 'User updated to Hiring Manager role successfully', data: candidates })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}