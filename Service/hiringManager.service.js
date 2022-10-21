const Job = require("../Model/Job")

exports.createJobService = async jobInfo => {
    const job = await Job.create(jobInfo)
    return job
}

exports.getJobsService = async () => {
    const jobs = await Job.find()
    return jobs
}

exports.getJobService = async (jobId, managerId) => {
    const jobs = await Job.findOne({_id: jobId, 'postedBy.id': managerId}).populate('appliedCandidate.applicantId')
    return jobs
}

exports.updateJobService = async (jobId, managerId, jobInfo) => {
    const result = await Job.findOneAndUpdate({_id: jobId, 'postedBy.id': managerId}, jobInfo, {runValidators: true, new: true})
    return result
}