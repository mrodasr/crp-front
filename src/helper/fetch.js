import app from '@/app'
import { store as token } from '@/store/token'

const methods = {
    1: 'GET',
    2: 'POST',
    3: 'PATCH'
}

const fetch2 = async(url, index = 1, body = null) => {

    const headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token.token)

    try {
        const res = await fetch(url, {
            method: methods[index],
            headers: headers,
            body: body ? JSON.stringify(body) : body
        })
        const data = res.ok ? await res.json() : null
        index != 1 && url != '/api/token' ? app.flash(data ? 1 : 2) : null
        return data
        
    }
    catch {
        return null
    }
}

export default fetch2