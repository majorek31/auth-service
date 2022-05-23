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

router.get('/:post', async (req, res) => {
    if (!req.headers.authorization || !parseInt(req.params.post))
        return res.sendStatus(400)
    if(!await utils.isSessionValid(req.headers.authorization))
        return res.sendStatus(403)
    try {
        post = await prisma.post.findFirst({
            where: {
                id: parseInt(req.params.post)
            }
        })
        if (!post)
            return res.sendStatus(404)
        return res.json(post)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})
router.post('/', async (req, res) => {
    if(!await utils.isSessionValid(req.headers.authorization))
        return res.sendStatus(403)
    if (!req.body.title || !req.body.content || !req.body.tags)
        return res.sendStatus(400)
    try {
        post = await prisma.post.create({
            data: {
                authorId: await utils.getUserIdBySessionId(req.headers.authorization),
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags
            }
        })
        return res.json({
            id: post.id,
            url: `http://localhost/api/posts/${post.id}`
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

module.exports = router