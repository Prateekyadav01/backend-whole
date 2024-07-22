    // import { Timestamp } from 'mongodb';
    import mongoose from 'mongoose'

    const jobSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        experience:{
            type: String,
            required: true
        }
    },{
        Timestamp:true
    })


    export const JobPost = mongoose.model('JobPost',jobSchema);