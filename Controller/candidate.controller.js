const service = require("../Service/candidte.service")

exports.getAllJobs = async (req, res) => {

    const { sort, salary, ...filterOption } = req.query

    // For filter properly________
    let filter = filterOption;
    if (salary) {
        let numSalary = salary.split('-')
        numSalary = numSalary.map(function (x) {
            return parseInt(x, 10);
        });
        numSalary = { salary: { $gte: numSalary[0], $lte: numSalary[1] } }
        filter = { ...filterOption, ...numSalary }
    }

    try {
        const jobs = await service.getAllJobsService(filter, sort)
        if (!jobs) {
            return res.status(401).json({ status: 'Failed', error: "No job data found" })
        }

        res.status(200).json({ status: 'Success', data: jobs })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.getJob = async (req, res) => {
    const { id } = req.params
    try {
        const job = await service.getJobService(id)
        if (!job) {
            return res.status(401).json({ status: 'Failed', error: "No job data found" })
        }

        res.status(200).json({ status: 'Success', data: job })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.applyJob = async (req, res) => {

    const { jobId } = req.params
    const applicantId = req.user._id
    try {
        const job = await service.findJobById(jobId)
        if (!job) {
            return res.status(500).json({ status: 'Failed', error: "No job found" })
        }

        if (job.appliedCandidate.includes(applicantId)) {
            return res.status(500).json({ status: 'Failed', error: "You'vd already applied for this job." })
        }

        const expired = new Date() > job.deadLine
        if (expired) {
            return res.status(500).json({ status: 'Failed', error: "Deadline for apply is expired" })
        }
        
        const result = await service.applyJobService(jobId, applicantId, req?.file?.filename)
        if (!result) {
            return res.status(401).json({ status: 'Failed', error: "Sorry, couldn't apply for the job." })
        }
        res.status(200).json({ status: 'Success', message: "Applied for the job successfully", data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.uploadPhoto = (req, res) => {
    res.send(req.file)
}