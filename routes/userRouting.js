const express=require('express')

const logic=require('../controllers/logic')

const jwtMiddleware = require('../middlewares/routerMiddlewares')



//creating an object for router class inside express

const router=new express.Router()


router.post('/bankuser/userRegister',logic.register)

//login router

router.post('/bankuser/userLogin',logic.login)

//user profile 
router.get('/bankuser/userProfile/:acno',jwtMiddleware,logic.getProfile)

//balance details 
router.get('/bankuser/userBalance/:acno',jwtMiddleware,logic.balanceDetail)

//money transfer

router.post('/bankuser/moneyTransfer',jwtMiddleware,logic.moneyTransfer)

//transaction history
router.get('/bankuser/userHistory/:acno',jwtMiddleware,logic.history)

//delete account
router.delete('/bankuser/userDelate/:acno',jwtMiddleware,logic.deleteAc)



//export router

module.exports=router