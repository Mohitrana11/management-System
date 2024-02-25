const express = require('express');
const  bcrypt = require('bcrypt');

// require('dotenv').config();
const port = process.env.PORT ||4500;
const path=require('path');

// Data Base!--------------------------------------------------
const signDB =require('./DataBases/LoginDB');  // Login and SignUp DataBase!
const { TopologyDescription } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));



// Folders: 
app.use('/Styles',express.static('Styles'));
app.use('/images',express.static('images'));


// View Engine SetUp: 
app.set('view engine','hbs');

//  CODE: 
app.get('/mr',(req,resp)=>{
    resp.render('StudentDetail');
})

app.get('/',(req,resp)=>{
    resp.send('<h1>HOme page!</h1>');
})


app.get('/SignIn',(req,resp)=>{
    resp.render('SignIn');
})

app.get('/LogIn',(req,resp)=>{
    resp.render('LogIn');
})

// SignUp Post request!-----------------------
app.post('/SingData',async (req,resp)=>{
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    const userName = await signDB.find({name:req.body.name});
    if(userName==req.body.name){
        resp.send('<h1>This User name is already  exist!  </h1>')

    }else{
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = hashPassword;
        await signDB.insertMany([data]);
    }
    resp.render('home');
})


// Login Post requires!--------------------------
app.post('/login',async (req,resp)=>{
    try{
        const check = await signDB.findOne({name:req.body.name});
        if(!check){
            resp.send('User name Cannot Found!');
        }
        const isPassword = await bcrypt.compare(req.body.password,check.password);
        if(isPassword){
            resp.render('home');
        }else{
            resp.send('wrong Password!');
        }
    }catch{
        resp.send('Wrong Details');
    }
})


app.use('/',(req,resp)=>{
    resp.status(404).send('Some Kind of server Error!');
})
app.listen(port,()=>{
    console.log(`working on port number ${port}`);
})
