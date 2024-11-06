import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

type payloadType = {
    _id: mongoose.Types.ObjectId
}

export const generateToken = ({ _id }: payloadType) => {

    const secretKey = process.env.PRIVATEKEY

    if (!secretKey) throw new Error('privete key is not defined')

    try {

        const token = jwt.sign({ _id }, secretKey, {
            expiresIn: '168h'
        })
        return token

    } catch (err) {
        console.error('token generation error. error => ', err)
    }
}