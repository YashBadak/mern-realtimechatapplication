const express=require("express");
const { accessChat, fetchChats, CreateGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatController");
const protect = require("../middlewares/authMiddleware");

const router=express.Router();

router.post("/",protect,accessChat)
router.get("/",protect,fetchChats)
router.post("/group",protect,CreateGroupChat)
router.put("/rename",protect,renameGroup)
router.put("/groupremove",protect,removeFromGroup)
router.put("/groupadd",protect,addToGroup)

module.exports=router;