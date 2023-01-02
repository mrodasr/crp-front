import { ref, computed } from 'vue'

import { store as paxs } from '@/store/paxs'
import { store as pays } from '@/store/pays'
import { store as users } from '@/store/users'
import { store as retires } from '@/store/retires'
import { store as config } from '@/store/config'

const accom = ref(config.accoms[0])
const status = ref(config.statuses[0])
const keyword = ref('')

const filter = (pax) => pax.accom == accom.value.id && pax.status == status.value.id

const target = (pax) => [pax.name, pax.origin, pax.group.map((pax) => pax.name), pax.location.map((site) => site.id)].flatMap((w) => w)
const search = (pax) => target(pax).some((word) => word.toLowerCase().includes(keyword.value.toLowerCase()))

const paxsFilter = computed(() => paxs.paxs.filter(filter))
const paxsSearch = computed(() => paxsFilter.value.filter(search))

const paysPax = computed(() => pays.pays.filter((pay) => pay.pax == paxs.pax._id))

const lastRetire = computed(() => retires.retires.find((retire) => retire.account == users.user._id))

const paysUser = computed(() => {
    const lastDate = lastRetire.value ? lastRetire.value.created : 0
    const filter = (pay) => pay.user._id == users.user._id && pay.created > lastDate
    return pays.pays.filter(filter)
})

export { accom, status, keyword, paxsFilter, paxsSearch, paysPax, paysUser }