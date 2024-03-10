const express = require('express');
const  bcrypt = require('bcrypt');

// require('dotenv').config();
const port = process.env.PORT || 3000;
const path=require('path');

// Data Base!--------------------------------------------------
const signDB =require('./DataBases/LoginDB');  // Login and SignUp DataBase!
const studentDB = require('./DataBases/StudentDetails');
const { TopologyDescription } = require('mongodb');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));



// Folders: 
app.use('/Styles',express.static('Styles'));
app.use('/images',express.static('images'));
app.use('/scripts',express.static('scripts'));

// View Engine SetUp: 
app.set('view engine','hbs');

//  CODE: 

app.get('/',(req,resp)=>{
    // resp.send('<h1>HOme page!</h1>');
    resp.render('home');
})


app.get('/StudentDetail',(req,resp)=>{
    resp.render('StudentDetail');
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




// Student Detail Form: 

app.post('/StudentDetails', async (req,resp)=>{
    const data = {
        rollNumber:req.body.rollNumber,
        studentName:req.body.studentName,
        fatherName:req.body.fatherName,
        motherName:req.body.motherName,
        dob:req.body.dob,
        mobileNumber:req.body.mobileNumber,
        adharNumber:req.body.adharNumber,
        email:req.body.email,
        branch:req.body.branch,
        year:req.body.year,
        gender:req.body.gender,
        category:req.body.category,
    }
    await studentDB.insertMany([data]);
    resp.send('<h1>print All Data!</h1>');
});


app.get('/showStudentDetails', async (req, resp) => {
    const items = await studentDB.find({});
    resp.render('showStudentDetails', { items });
});

app.get('/ProfileSearch',(req,reps)=>{
    reps.render('ProfileSearch');
});


app.post('/Profiles',async (req,resp)=>{
    // const items = await studentDB.find({branch:req.body.branch},{year:req.body.year},{$or:[{gender:req.body.gender},{category:req.body.category}]});
    const items = await studentDB.find({$and:[ {branch:req.body.branch},{year:req.body.year},{gender:req.body.gender},{category:req.body.category}]});
    // {$or:[{gender:req.body.gender},{category:req.body.category}]
    
    resp.render('showStudentDetails', { items });
})

// studentDB.find({branch:req.body.branch},{year:req.body.year},{$or:[{gender:req.body.gender},{category:req.body.category}]});

// studentDB.find({branch:req.body.branch},{year:req.body.year},{$or:[{gender:req.body.gender},{category:req.body.category}]});


app.use('/',(req,resp)=>{
    resp.status(404).send('Some Kind of server Error!');
})
app.listen(port,()=>{
    console.log(`working on port number ${port}`);
})
