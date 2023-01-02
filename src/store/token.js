import { reactive } from 'vue'

import fetch2 from '@/helper/fetch'

const store = reactive({
    token: localStorage.getItem('token'),
    decode() {
        try {
            return this.token ? JSON.parse(window.atob(this.token.split('.')[1])) : null
        }
        catch {
            this.delete()
            return null
        }
    },
    async create(user) {
        const data = await fetch2('/api/token', 2, user)
        if (data) {
            this.token = data.token
            localStorage.setItem('token', this.token)
            return data.match
        }
        else {
            return false
        }
    },
    delete() {
        this.token = null
        localStorage.removeItem('token')
    }
})

export { store }