import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import userPassvalidate from '../middleware/passwdHandler.js'


const router = Router();

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

router.use(userHandler.validateUserEmail);

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

router.route('/register')
    //validar passwd
    .post(userPassvalidate.validateUserPasswd)
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(userController.register)

router.route('/grants')
    //añadir,eliminar,actualizar privilegios user
    .post(userController.addGrant)
    .delete(userController.deleteGrant)
    .put(userController.updateGrant)
    

router.route('/login')
    .post(userController.login);

//devolver usuario previamente registrado pasando user como param
router.route('/:username')
    .get(userController.userReturn);

export default router;