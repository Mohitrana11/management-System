const express = require('express');
const  bcrypt = require('bcrypt');

// require('dotenv').config();
const port = process.env.PORT || 3000;
const path=require('path');

// Data Base!--------------------------------------------------
const signDB =require('./DataBases/LoginDB');  // Login and SignUp DataBase!
const studentDB = require('./DataBases/StudentDetails');
const cousellingDB = require('./DataBases/CounsellingDB');
const { TopologyDescription } = require('mongodb');



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));




// Folders: 
app.use('/Styles',express.static('Styles'));
app.use('/images',express.static('images'));
app.use('/scripts',express.static('scripts'));
app.use('/fontFamilys',express.static('fontFamilys'));


// View Engine SetUp:
app.set('view engine','hbs');

//  CODE:

app.get('/',(req,resp)=>{
    // resp.send('<h1>home1 page!</h1>');
    resp.render('home1');
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
    resp.render('home1');
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
            resp.render('home1');
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
    resp.render('home1');
});

app.get('/showStudentDetails', async (req, resp) => {
    const items = await studentDB.find({});
    resp.render('showStudentDetails', { items });
});

app.get('/ProfileSearch',(req,reps)=>{
    reps.render('ProfileSearch');
});
app.get('/ProfileSearchGn',(req,reps)=>{
    reps.render('ProfileSearchGn');
});


app.post('/Profiles',async (req,resp)=>{
    // const items = await studentDB.find({branch:req.body.branch},{year:req.body.year},{$or:[{gender:req.body.gender},{category:req.body.category}]});
    const items = await studentDB.find({$and:[ {branch:req.body.branch},{year:req.body.year}]});
    resp.render('showStudentDetails', { items });
})

app.post('/ProfilesGn',async (req,resp)=>{
    // const items = await studentDB.find({branch:req.body.branch},{year:req.body.year},{$or:[{gender:req.body.gender},{category:req.body.category}]});
    const items = await studentDB.find({$and:[ {branch:req.body.branch},{year:req.body.year},{gender:req.body.gender},{category:req.body.category}]});
    resp.render('showStudentDetails', { items });
})


// Show Counselling :

app.get('/showCounselling', async (req, resp) => {
    const items = await cousellingDB.find({});
    resp.render('showCounselling', { items });
});


//  Counselling Form:
app.get('/counsellingForm',(req,resp)=>{
    resp.render('counsellingForm');
})


app.post('/Counselling',async (req,resp)=>{
    const data = {
        jeep:req.body.jeep,
        studentName:req.body.studentName,
        fatherName:req.body.fatherName,
        motherName:req.body.motherName,
        dob:req.body.dob,
        mobileNumber:req.body.mobileNumber,
        email:req.body.email,
        firstChoice:req.body.firstChoice,
        secondChoice:req.body.  secondChoice,
        thirdChoice:req.body.thirdChoice,
        fourthChoice:req.body. fourthChoice,
        year:req.body.year,
        gender:req.body.gender,
        category:req.body.category,
        state:req.body.state,
        district:req.body.district,
        pincode:req.body.pincode,
    }
    await cousellingDB.insertMany([data]);
    // resp.render('home1');
    resp.send('You Data is Submitted!');
})



app.use('/',(req,resp)=>{
    resp.status(404).send('Some Kind of server Error!');
})
app.listen(port,()=>{
    console.log(`working on port number ${port}`);
})
