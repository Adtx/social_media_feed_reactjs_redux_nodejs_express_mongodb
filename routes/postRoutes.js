const express = require('express');
const postController = require('../controllers/postController');
const bodyParser = require('body-parser')


const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

router.get('/', postController.post_index);
router.post('/', jsonParser, postController.post_create_post);
router.post('/update', jsonParser, postController.post_update);
router.delete('/:id', postController.post_delete);

module.exports = router;