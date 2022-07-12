const router = require('express').Router()
const quotesRoutes = require('./quotesRouter');

router.use('/quotes',quotesRoutes);


module.exports = router