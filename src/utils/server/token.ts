import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

type payloadType = {
    _id: mongoose.Types.ObjectId
}
const secretKey = process.env.PRIVATEKEY
if (!secretKey) throw new Error('privete key is not defined')

export const generateToken = ({ _id }: payloadType) => {
    try {

        const token = jwt.sign({ _id }, secretKey, {
            expiresIn: '168h'
        })
        return token

    } catch (err) {
        console.error('token generation error. error => ', err)
    }
}

export const verifyToken = (token: string): JwtPayload | false => {

    try {
        const payload = jwt.verify(token, secretKey)
        if (typeof payload == 'object') {
            return payload
        }
        return false
    } catch {
        return false
    }
}