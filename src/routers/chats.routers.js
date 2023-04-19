const {Router}= require ("express")
const router = Router();
const chatsCtrl = require("../controller/chats.controller")


router.get("/chats",chatsCtrl.getChats)
router.get("/chat",chatsCtrl.getChat)
router.delete("/chats",chatsCtrl.deleteChat)
router.post("/chat",chatsCtrl.postChat)


module.exports = router;