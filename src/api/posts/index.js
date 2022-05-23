const express = require('express')
const router = express.Router()
const utils = require('../../utils');

router.get('/', async (req, res) => {
    if(!await utils.isSessionValid(req.headers.authorization))
        return res.sendStatus(403)
    return res.json({
        message: 'You have been successfully authenticated!'
    })
})

module.exports = router