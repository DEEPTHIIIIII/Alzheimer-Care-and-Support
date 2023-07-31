const express=require("express")
const app=express()
const path=require('path')
const bodyparser=require("body-parser")
const credcollection=require('./mongodb')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('src'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.get("/",(req,res)=>res.render("frontpage"))
app.post("/login",async (req,res)=>{
                    try{
                                        const result=await credcollection.findOne(req.body.name).exec()
                                        if(result.password==req.body.password){
                                                            res.render("mainpage")
                                        }else{
                                                            res.render("signup")
                                        }
                    }catch{
                                        console.log("Error")
                    }
                    
})
app.get("/login",(req,res)=>res.render("login"))
app.get("/signup",(req,res)=>res.render("signup"))
app.post("/signup",(req,res)=>{
                    if(req.body.password!=req.body.confirmpassword){
                                        res.render("signup")
                    }/*else if(credcollection.findOne(req.body.username)!=null){
                                        //return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });  
                                        res.render("error404")
                    }*/
                    else{
                    const newCred=new credcollection({
                                        name:req.body.username,
                                        password:req.body.password
                    })
                    newCred.save().then((data)=>{console.log("NEW DATA SAVED SUCCESSFULLY");res.render("mainpage")}).catch((err)=>{
                         console.log(err);
                         res.render('error404')
                         /*if(err.code === 11000){
                              res.render('error404')
                         }else{
                              res.send('Errrrrrrrrrr')
                         }*/
                    })
                    
}
})
app.get("/knowmore",(req,res)=>res.render("knowmore"))
app.get('/care',(req,res)=>res.render('care'))
app.get('/contact',(req,res)=>res.render('contact'))
app.get('/privacypolicy',(req,res)=>res.render('privacypolicy'))
app.get('/termsofuse',(req,res)=>res.render('termsofuse'))
app.post('/mainpage',(req,res)=>res.render('mainpage'))
/*app.get('/error404',(req,res)=>res.render('error404'))*/
app.post('/checkprogress',async (req,res)=>{
                    /*const newPatient=new patientCollection({
                                        email:req.body.email,
                                        phno:req.body.phone,
                                        age:req.body.age,
                                        bloodgrp:req.body.bloodGroup,
                                        gender:req.body.gender,
                                        desc:req.body.medicalCondition,
                    })
                    newPatient.save().then((data)=>console.log("New data saved successfully")).catch((err)=>console.log(err))
                    res.render('checkprogress')*/
                    const filter={name:req.body.name}
                    const updateOperation={
                                        $set:{
                                                            email:req.body.email,
                                                            phno:req.body.phone,
                                                            age:req.body.age,
                                                            bloodgrp:req.body.bloodGroup,
                                                            gender:req.body.gender,
                                                            desc:req.body.medicalCondition,         
                                        }
                    }
                    try {
                         const result = await credcollection.findOneAndUpdate(filter, updateOperation);
                         console.log(`${result.modifiedCount} document(s) updated.`);
                         res.render('checkprogress');
                       } catch (error) {
                         console.error('Error updating document:', error);
                         // Handle the error or render an error page
                         res.send("Errorrrrrrrrrr")
                       }
               })
app.post('/checkprogresss',(req,res)=>res.render("checkprogress"))
app.listen(3000,(req,res)=>{
                    console.log("Running on port 3000");
})