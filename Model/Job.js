const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    location: {
        type: String,
        trim: true,
        enum: {
            values: ['Asia', 'Africa', 'America', 'Europe'],
            message: '{VALUE} is not accepted as location. Chose from Asia/Africa/America/Europe '
        },
        required: [true, 'Job location is required']
    },
    jobType: {
        type: String,
        enum: {
            values: ['On-site', 'Remote', 'Hybrid'],
            message: '{VALUE} is not accepted as location. Chose from On-site/Remote/Hybrid '
        },
        required: [true, 'Job type is required']
    },
    salary: {
        type: Number,
        required: [true, 'Job salary is required'],
        min: [0, 'Job salary can\'t be negative']
    },
    postedBy: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    },
    deadLine: {
        type: Date,
        required: true
    },
    appliedCandidate: [{
        applicantId: {
            type: ObjectId,
            ref: 'Candidate'
        },
        resume: String
    }],
    status: {
        type: String,
        default: 'inactive',
        enum: {
            values: ['active', 'inactive', 'removed'],
            message: "{VALUE} is not accepted."
        }
    },
    applyCount: {
        type: Number,
        default: 0
    }

}, { timestamp: true })

const Job = mongoose.model("Job", jobSchema)
module.exports = Job