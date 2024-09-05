const router = require('express').Router();
const singersController = require('../controllers/singersController');

router.get('/', (req, res) => {
    singersController.listar(req, res);
});

router.get('/:id', (req, res) => {
    singersController.buscar(req, res);
});

module.exports = router;