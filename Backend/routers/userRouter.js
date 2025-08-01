const express=require("express");
const { registerUser, loginUser, allUser } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/",protect,allUser)

module.exports=router;