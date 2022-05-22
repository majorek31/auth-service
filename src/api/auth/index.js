const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/login', async (req, res) => {
    if (!req.query.username || !req.query.password) 
        return res.sendStatus(400)
    try {
        user = prisma.user.findFirst({
            where: {
                name: req.query.username
            }
        })
        if (!user)
            res.sendStatus(404)
        result = await bcrypt.compare(req.query.password, user.password)
        console.log(result)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

module.exports = router