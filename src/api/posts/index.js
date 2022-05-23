const express = require('express')
const router = express.Router()
const utils = require('../../utils');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    if (!req.headers.authorization)
        return res.sendStatus(400)
    if(!await utils.isSessionValid(req.headers.authorization))
        return res.sendStatus(403)
    try {
        posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                authorId: true,
                tags: true,
                createdAt: true,
            }
        })
        return res.json(posts)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

module.exports = router