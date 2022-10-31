const express = require('express');
const router = express.Router();
const usercontroller = require("../controller/usercontroller")
const middlewire=require("../middlewire/auth")

// ---=+=---------=+=----------=+=----------- [ Route APIs ] ---=+=---------=+=----------=+=-----------//

router.post("/url/shorten", usercontroller.loginUser)


router.get("/:urlCode",middlewire.admin,usercontroller.getUser)
