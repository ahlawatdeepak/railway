const mongoose = require("mongoose")
const connect = () => {
    return mongoose.connect("mongodb+srv://deepakahlawat10:deepakahlawat10@cluster0.qkndiwa.mongodb.net/?retryWrites=true&w=majority")
}
module.exports = connect