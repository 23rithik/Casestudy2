const mongoose= require('mongoose')


const employeeSchema = new mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})

const Blog = mongoose.model('employee',employeeSchema)

module.exports=Blog