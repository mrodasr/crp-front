import { reactive } from 'vue'

import fetch2 from '@/helper/fetch'
import schema from '@/schema'

const store = reactive({
    user: JSON.parse(schema.user),
    users: [],
    async read() {
        const data = await fetch2('/api/users')
        this.users = data ? data : []
    },
    async create() {
        this.precreate()
        const data = await fetch2('/api/users', 2, this.user)
        return data
    },
    precreate() {
        this.user.created = Date.now()
    },
    reset() {
        this.user = JSON.parse(schema.user)
    },
    select(user) {
        this.user = user
    }
})

export { store }