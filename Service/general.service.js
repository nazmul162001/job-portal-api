const Job = require("../Model/Job")

exports.highestPaidService = async () => {
    const jobs = await Job.find().sort({ salary: -1 }).limit(10)
    return jobs
}

exports.mostAppliedService = async () => {
    let jobs = await Job.find().sort({applyCount: -1}).limit(5)
    return jobs
}