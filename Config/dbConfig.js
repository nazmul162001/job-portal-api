const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database connect successfully'.bold.cyan)
    })
    .catch(err => {
        console.log(err);
    })