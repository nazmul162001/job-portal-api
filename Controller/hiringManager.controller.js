const service = require("../Service/hiringManager.service")

exports.createJob = async (req, res) => {
    let { openingDay, ...jobInfo } = req.body
    let date = new Date();
    date.setDate(date.getDate() + openingDay);

    try {
        jobInfo = { ...jobInfo, postedBy: { name: req.user.name, id: req.user._id },  deadLine: date}
        const job = await service.createJobService(jobInfo)

        res.status(201).json({ status: 'Success', message: "Job created successfully", data: job})
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.getAllJobs = async (req, res) => {

    try {
        const jobs = await service.getJobsService()
        res.status(201).json({ status: 'Success', message: "Get Job data successfully", data: jobs })

    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.getJob = async (req, res) => {
    const { id } = req.params

    try {
        const job = await service.getJobService(id, req.user._id)

        if (!job) {
            return res.status(400).json({ status: 'Fail', message: "No Job Data found!" })
        }

        res.status(500).json({ status: 'Success', data: job })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}

exports.updateJob = async (req, res) => {
    const { id } = req.params
    const jobInfo = req.body

    try {
        const job = await service.updateJobService(id, req.user._id, jobInfo)
        if (!job) {
            return res.status(400).json({ status: 'Fail', message: "With this manager, No Job Data found!" })
        }

        res.status(500).json({ status: 'Success', data: job })
    } catch (error) {
        res.status(500).json({ status: 'Failed', error: error.message })
    }
}