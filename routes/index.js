const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send({ greeting: 'Welcome to petty cash' }));

module.exports = router;
