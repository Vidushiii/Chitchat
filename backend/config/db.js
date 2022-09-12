const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn =  await mongoose.connect("", {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        console.log('mongo db connected', conn.connection)
    }catch (error){ console.log('error', error.message);
    process.exit();
    }
};

module.exports = connectDB;