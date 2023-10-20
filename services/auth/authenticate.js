import {PrismaClient} from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],

})


export const signUp = async (user)=>{
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(user.password, salt)

    const savedUser = await prisma.user.create({data:{...user, password:hash}})
    return savedUser
}

export const authenticate = async (email, password)=>{
    const user = await prisma.user.findUnique({where:{email}})
    if(!user){
        return undefined
    }
    try {
        const passwordCorrect = await bcryptjs.compare(password, user.password)
        if(!passwordCorrect) return undefined
        const token = jwt.sign(exclude(user, ['password']), process.env.NEXTAUTH_SECRET, {expiresIn:"1d"})
        return {token, user}
    } catch (error) {
        console.error(error)
        return undefined        
    }    
    
}



export function exclude(user, keys){
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    )
  }