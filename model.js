const mongoose=require("mongoose")


const MovieName=mongoose.Schema({
    moviename:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now
    }

})

module.exports=mongoose.model("moviename",MovieName)