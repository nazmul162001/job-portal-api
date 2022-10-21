const User = require("../Model/User")
const Candidate = require("../Model/Candidate")
const HiringManager = require("../Model/HiringManager")

exports.getAllCandidatesService = async () => {
    const candidates = await Candidate.find({}).populate('user')
    return candidates
}

exports.getCandidateService = async (id) => {
    const candidate = await Candidate.findById(id).populate('user')
    return candidate
}

exports.getHiringManagersService = async () => {
    const candidates = await HiringManager.find({}).populate('user')
    return candidates
}

exports.updateUserService = async (id, role) => {
    const candidates = await User.findByIdAndUpdate(id, role, { runValidators: true })
    return candidates
}