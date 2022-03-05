const mongoose = require("mongoose");

mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>
{console.log("successfull");
}).catch((e) => {console.log("not successfull", e);});
