const mongo  = require('mongoose');
mongo.connect('mongodb://0.0.0.0:27017/CollegeDB')
.then((e)=>{
    console.log('Connected with DataBase!');
})
.catch((e)=>{
    console.log('Not connecting!.....');
})

const LogInSchema = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const collection = mongo.model('Login',LogInSchema);
module.exports =collection;