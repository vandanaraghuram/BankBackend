//import jwt
const jwt=require('jsonwebtoken')


//import model

const client = require("../models/modelcollection")
//const users = require("../models/modelcollection")



//logic for register

const register=(req,res)=>{      //body={acno:123,uname:"anu",psw:"abc123"}
    //acess data from body
    const acno=req.body.acno
    const uname=req.body.uname
    const psw=req.body.psw
    // console.log(req)

    //check acno present in users collection 

    client.findOne({acno}).then(user=>{
        if(user){
            res.status(401).send("user already exist")
        }
        else{
            //register user-create new object for user
            let newUser=new client({
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]

            })

            //save this object in collection

            newUser.save()

            //response send //json()- convert js data into json type and send response

            res.status(200).json(newUser)
        }

    })
}

//logic for login

const login=(req,res)=>{    //body={acno:001.psw:qwe123}
 const {acno,psw}=req.body    //destructuring- instead of const acno=req.body.acno, const psw=req.body.psw
 client.findOne({acno,psw}).then(user=>{
    if(user){
        //generate token
        var token=jwt.sign({acno},"secretkey123")
        user["token"]=token
       res.status(200).json({
        acno:user.acno,
        uname:user.uname,
        token
       })
    }
    else{
      res.status(401).json("incorrect acno or password")
    }
 })
}

//logic to get profile data

const getProfile=(req,res)=>{
    //acess acno param from req url
    const{acno}=req.params
    client.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
            })
        }
        else{
            res.status(401).json("user does not exist")
        }
    })
}

//logic to get balance

const balanceDetail=(req,res)=>{
    //acess balance param from req url
    console.log(req);
    const{acno}=req.params
    client.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                balance:user.balance
            })
        }
        else{
            res.status(401).json("user does not exist")
        }
    })
}

//logic for money transfer

const moneyTransfer=(req,res)=>{
    //acess all datas from body
    const{fromAcno,toAcno,psw,amount,date}=req.body
    //convert amount from string to number
    var amnt=parseInt(amount)

    //check for user in db
    client.findOne({acno:fromAcno,psw}).then(fromUser=>{
        if(fromUser){
            //check toUser
            client.findOne({acno:toAcno}).then(toUser=>{
                if(toUser){
                    //from balance check
                    if(amnt<=fromUser.balance){
                        fromUser.balance-=amnt
                        fromUser.transactions.push({type:"DEBIT",amount:amnt,date,user:toUser.uname})
                        fromUser.save()

                        toUser.balance+=amnt
                        toUser.transactions.push({type:"CREDIT",amount:amnt,date,user:fromUser.uname})
                        toUser.save()

                        res.status(200).json({message:"Transaction successful"})
                    }
                    else{
                        res.status(401).json({message:"Insufficient balance"})
                    }

                }
                else{
                    res.status(401).json({message:"Invalid credit credentials"})
                }
            })
        }
        else{
            res.status(401).json({message:"Invalid debit credentials"})
        }

    })
}


//logic to transaction history
const history=(req,res)=>{
    const {acno}=req.params
    client.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json(user.transactions)
        }
        else{
            res.status(401).json("user does not exist")
        }
    })
}

//logic to delete account

const deleteAc=(req,res)=>{
    const {acno}=req.params
    client.deleteOne({acno}).then(user=>{
        if(user){
            res.status(200).json("Account deleted successfully")
        }
        else{
            res.status(401).json("user does not exist")
        }
    })
}

module.exports={
    register,login,getProfile,balanceDetail,moneyTransfer,history,deleteAc
}