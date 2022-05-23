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
        if (session.expirationDate > Date.now())
            return false
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

module.exports = {
    isSessionValid
}