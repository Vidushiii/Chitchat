const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn =  await mongoose.connect("mongodb+srv://vidushiTomar:vidushi%4018%24@cluster0.j2mflrr.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        console.log('mongo db connected', conn.connection)
    }catch (error){ console.log('error', error.message);
    process.exit();
    }
};

module.exports = connectDB;