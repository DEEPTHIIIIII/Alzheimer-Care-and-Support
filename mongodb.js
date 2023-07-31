const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/Credentials")
.then(()=>console.log("Successfully connected to mongoDB"))
.catch(()=>console.log("Some error in connection"))
// For just storing the username and the password
const credSchema=new mongoose.Schema({
                    name:{
                                        type:String,
                                        required:true,
                                        unique:true
                    },
                    password:{
                                        type:String,
                                        required:true
                    },
                    email:{
                                        type:String
                    },
                    phno:{
                                        type:String
                    },
                    age:{
                                        type:String
                    },
                    bloodgrp:{
                                        type:String
                    },
                    gender:{
                                        type:String
                    },
                    desc:{
                                        type:String
                    }
                    
})
const credcollection=new mongoose.model("credcollection",credSchema)



module.exports=credcollection