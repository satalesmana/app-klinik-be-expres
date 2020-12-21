var mongoose = require("mongoose");

const uri = "mongodb+srv://public:Welcome123@cluster0.oe59k.mongodb.net/gebrak_app?retryWrites=true&w=majority";
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
});
