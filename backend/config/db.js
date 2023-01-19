const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn =  await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        console.log('mongo db connected')
    }catch (error){ console.log('error', error.message);
    process.exit();
    }
};

module.exports = connectDB;