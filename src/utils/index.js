const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

isSessionValid = async (sessionId) => {
    try {
        session = await prisma.session.findFirst({
            where: { 
                sessionId: sessionId
            }
        })
        if (!session) 
            return false
        if (session.expirationDate < Date.now())
            return false
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

getUserIdBySessionId = async (sessionId) => {
    try {
        session = await prisma.session.findFirst({
            where: {
                sessionId: sessionId
            }
        })
        if (!session)
            return 0
        user = await prisma.user.findFirst({
            where: {
                id: session.userId
            },
            select: {
                id: true
            }
        })
        return user.id
    } catch (err) {
        console.error(err)
        return 0
    }
}

module.exports = {
    isSessionValid,
    getUserIdBySessionId
}