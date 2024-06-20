const Router = require('express').Router;
const authMiddleware = require('../middlewares/authMiddleware');
const invitationController = require('../controllers/invitationController');
const router = new Router();


router.post('/', authMiddleware, invitationController.create);
router.get('/user-ingoing', authMiddleware, invitationController.getIngoingInvitation);
router.get('/user-outgoing', authMiddleware, invitationController.getOutgoingInvitation);
router.post('/accept', authMiddleware, invitationController.accept);
router.post('/decline', authMiddleware, invitationController.decline);
router.delete('/:id', authMiddleware, invitationController.delete);

module.exports = router;