const {Router}= require ("express")
const router = Router();
const chatsCtrl = require("../controller/chats.controller")


// router.get("/chats",chatsCtrl.getChatsAll)
router.get("/busquedaChat",chatsCtrl.getChat)
router.delete("/chatEliminado",chatsCtrl.deleteChat)


module.exports = router;