const jwt = require("jsonwebtoken");

//================================================= Authentication ==================================================//


const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"];
        if (!token) token = req.headers["x-api-key"];
        
        if (!token) return res.status(401).send({ status: false, msg: "token must be present", });

        let decodedToken = jwt.verify(token, "subrat543", (err, decoded)=>{
            if(err){
                res.status(400).send({status: false , Error : err.message})
            }else{
                return decoded
            }
        })
        if (!decodedToken) return res.status(403).send({ status: false, msg: "token is invalid", });
        req.userId= decodedToken.userId
        
        // req["bookId"]=decodedToken.bookId
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false,message:err.message})
    }
    next()
}


const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401); // not authorized
      throw new Error('Not Authorized. Only for admins.');
    }
  };


module.exports={authenticate,admin}