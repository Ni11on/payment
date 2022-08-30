import { encode as base64_encode } from 'base-64'
import axios from "axios"


export const sessionKey = async () => {
    const token = await generateToken()
    const session = generateSesion(token)

    return session
}

const generateToken = async () => {

    const USER = 'integraciones@niubiz.com.pe'
    const PWD = '_7z3@8fF'
    const KEYS = `${USER + ':' + PWD}`

    let encoded = base64_encode(KEYS)

    const response = await axios(`https://apisandbox.vnforappstest.com/api.security/v1/security`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${encoded}`
        }
    })

    return response.data
}

const generateSesion = async (token) => {
    const options = {
        channel: "web",
        amount: 10.5,
        antifraud: {
            clienteIp: "192.168.1.1",
            merchantDefineData: {
                MDD4: "prueba@gmail.com",
                MDD21: "0",
                MDD32: "76467886578",
                MDD75: "invitado",
                MDD77: "1"
            }
        }

    }

    const res = await fetch(`https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/456879852`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(options)
    })

    const data = await res.json()

    return data

}

export const generateAuthorization = async (amount, purchaseNumber, transactionToken, token) => {
    const options = {
        antifraud: null,
        captureType: 'manual',
        channel: 'web',
        countable: true,
        order: {
            amount: amount,
            currency: 'PEN',
            purchaseNumber: purchaseNumber,
            tokenId: transactionToken
        },
        recurrence: null,
        sponsored: null
    }

    const session = await fetch(`https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/456879852`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(options)
    })

    const res = await session.json()

    return res
}