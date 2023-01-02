import { reactive } from 'vue'
import { subDays, getTime } from 'date-fns'

import fetch2 from '@/helper/fetch'
import schema from '@/schema'
import state from '@/state'

const store = reactive({
    pax: JSON.parse(schema.pax),
    paxs: [],
    async read() {
        const data = await fetch2('/api/paxs')
        this.paxs = data ? data : []
    },
    async create(subdays) {
        this.precreate(subdays)
        const data = await fetch2('/api/paxs', 2, this.pax)
        return data
    },
    async update(update) {
        const data = await fetch2('/api/paxs/' + this.pax._id, 3, update)
        return data
    },
    precreate(subdays) {
        this.pax.checkin = getTime(subDays(Date.now(), subdays))
        this.pax.created = Date.now()
        this.pax.user = state.user
    },
    reset() {
        this.pax = JSON.parse(schema.pax)
    },
    select(pax) {
        this.pax = pax
    }
})

export { store }