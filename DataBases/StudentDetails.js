const mongo = require('mongoose');
mongo.connect('mongodb://0.0.0.0:27017/CollegeDB')
.then((e)=>{
    console.log('Connected with  student dataBase !');
})
.catch((e)=>{
    console.log('Not connecting!.....');
})

const StudentSchema = new mongo.Schema({
    studentName:{
        type:String,
        required:true
    },
    rollNumber:{
        type:Number,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    adharNumber:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }

});


const collection = mongo.model('StudentDetails',StudentSchema);
module.exports = collection;