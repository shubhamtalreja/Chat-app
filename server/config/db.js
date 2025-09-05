const mongoose = require('mongoose');


const connetDb = async () => {

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('database connected');
    } catch {
        console.log('database connection error');
        process.exit(1);
    }

}

module.exports = connetDb;