const mongoose=require('mongoose')

//creating model for collections
//schema filelds and values of collection


//users  name used in atlas
// const users=new mongoose.model("users",{
//     acno:Number,
//     uname:String,
//     psw:String,
//     balance:Number,
//     transactions:[]
// })

//collection2
const client=new mongoose.model("client",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})

module.exports=client