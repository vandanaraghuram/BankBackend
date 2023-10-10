const jwt = require('jsonwebtoken')

 const jwtMiddleware = (req,res,next) => {

    //acess token from request header
    try {
        const token = req.headers["access_token"]
        //validate token  verify()
        jwt.verify(token, "secretkey123")  //true/false

        //if token is verified, to continue the rqst
        next()
    }

    catch {
        res.status(404).json("please login")
    }
}
module.exports=jwtMiddleware