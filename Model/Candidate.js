const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be more than 3 characters'],
        trim: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    appliedFor: [{
        jobId: { type: ObjectId, ref: 'Job' },
        resume: String
    }]
})

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate