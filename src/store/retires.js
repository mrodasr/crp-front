import { reactive } from 'vue'

import fetch2 from '@/helper/fetch'
import schema from '@/schema'
import state from '@/state'
import { store as users } from '@/store/users'

const store = reactive({
    retire: JSON.parse(schema.retire),
    retires: [],
    async read() {
        const data = await fetch2('/api/retires')
        this.retires = data ? data : []
    },
    async create() {
        this.precreate()
        const data = await fetch2('/api/retires', 2, this.retire)
        return data
    },
    precreate() {
        this.retire.account = users.user._id
        this.retire.created = Date.now()
        this.retire.user = state.user
    },
    reset() {
        this.retire = JSON.parse(schema.retire)
    }
})

export { store }