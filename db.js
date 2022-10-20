const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    photoUrl:String
})

module.exports=mongoose.model('users',userSchema)