import { reactive } from 'vue'

import fetch2 from '@/helper/fetch'
import schema from '@/schema'
import state from '@/state'
import { store as paxs } from '@/store/paxs'

const store = reactive({
    pay: JSON.parse(schema.pay),
    pays: [],
    async read() {
        const data = await fetch2('/api/pays')
        this.pays = data ? data : []
    },
    async create() {
        this.precreate()
        const data = await fetch2('/api/pays', 2, this.pay)
        return data
    },
    precreate() {
        this.pay.pax = paxs.pax._id
        this.pay.created = Date.now()
        this.pay.user = state.user
    },
    reset() {
        this.pay = JSON.parse(schema.pay)
    },
    select(pay) {
        this.pay = pay
    }
})

export { store }