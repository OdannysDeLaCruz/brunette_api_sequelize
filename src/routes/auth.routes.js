const { Router } = require('express')
const { check } = require('express-validator')
const { expressValidationResultMiddleware } = require('../middlewares/expressValidationResultMiddleware')
const { loginUser, registerNewUser } = require("../controllers/AuthController");

const router = Router();

// Ruta de registro
router.post(
    '/register', 
    [
        check('name', 'Nombre es obligario').isString().withMessage('Nombre debe ser un texto').not().isEmpty(),
        check('lastname', 'Apellido es obligatorio').isString().withMessage('Apellido debe ser un texto').not().isEmpty(),
        check('phone', 'Teléfono es obligatorio').not().isEmpty(),
        check('password', 'Contraseña es obligatoria').not().isEmpty(),
    ],
    expressValidationResultMiddleware,
    registerNewUser
);

// Ruta de inicio de sesión
router.post(
    '/login/phone', 
    [
        check('phone', 'Teléfono es obligatorio').not().isEmpty(),
        check('password', 'Contraseña es obligatoria').not().isEmpty(),
    ],
    expressValidationResultMiddleware,
    loginUser
);

module.exports = router;