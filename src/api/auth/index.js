const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const config = require('../../../config.json')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/login', async (req, res) => {
    if (!req.query.username || !req.query.password) 
        return res.sendStatus(400)
    try {
        user = await prisma.user.findFirst({
            where: {
                name: req.query.username
            }
        })
        if (!user)
            return res.sendStatus(404)
        if (!await bcrypt.compare(req.query.password, user.password))
            return res.sendStatus(404)
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

router.post('/register', async (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.email)
        return res.sendStatus(400)
    try {
        if (await prisma.user.findFirst({
            where: {
                name: req.body.name
            }
        }))
            return res.json({
                ECODE: "UEXISTS"
            })
        user = await prisma.user.create({
            data: {
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
                email: req.body.email
            }
        })
        expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + config.sessionLength)
        session = await prisma.session.create({
            data: {
                userId: user.id,
                sessionId: crypto.randomUUID(),
                expirationDate: expirationDate
            }
        })
        return res.json({
            sessionId: session.sessionId,
            id: user.id,
            name: user.name,
            email: user.email
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)        
    }
})

module.exports = router