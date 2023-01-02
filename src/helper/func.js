import { eachDayOfInterval, getHours } from 'date-fns'

import { store as paxs } from '@/store/paxs'
import { store as pays } from '@/store/pays'
import { store as retires } from '@/store/retires'
import { store as config } from '@/store/config'

const names = (pax) => pax.group.length ? concat(pax) : pax.name
const concat = (pax, str = ', ') => pax.name + str + pax.group.map((pax) => pax.name).join(str)

const count = (pax) => pax.group.length + 1

const pax = (paxs) => paxs.map((pax) => count(pax)).reduce((n, m) => n + m, 0)

const sites = (pax, str = '; ') => pax.location.map((site) => site.id).join(str)

const locs = (pax, str = '; ') => pax.location.map((site) => site.id + str + site.ref).join(str)

const options = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
}
const date = (date) => new Date(date).toLocaleString([], options).replace(',', '')

const checkinLimit = 7
const checkoutLimit = 11

const days = (start, end = Date.now()) => {
    const days = eachDayOfInterval({ start: start, end: end }).length

    const early = getHours(start) < checkinLimit ? 1 : 0
    const today = getHours(end) < checkoutLimit ? -1 : 0

    const stay = days + early > 1 ? days + early + today : days
    return stay
}

const summarize = (pax) => {
    const rates = config.rates.find((accom) => accom.id == pax.accom).rates
    const summary = { ...rates }

    summary.group.forEach((cat) => cat.qty = pax.group.filter((pax) => pax.id == cat.id).length)
    summary.extras.forEach((cat) => cat.qty = pax.extras.filter((veh) => veh.id == cat.id).length)
    summary.location.forEach((cat) => cat.qty = pax.location.filter((site) => site).length)

    summary.group.find((cat) => cat.id == 1).qty++

    let rate = 0
    Object.keys(summary).forEach((key) => {
        rate += summary[key].map((cat) => cat.total = cat.rate * cat.qty).reduce((n, m) => n + m, 0)
    })
    return { summary, rate }
}

const paysPax = (pax) => pays.pays.filter((pay) => pay.pax == pax._id)

const debt = (pax) => {
    const stay = days(pax.checkin)
    const { rate } = summarize(pax)

    const owed = stay * rate

    const payments = paysPax(pax).filter((pay) => pay.service < 4)
    const paid = payments.map((pay) => pay.amount).reduce((n, m) => n + m, 0)

    const balance = owed - paid

    const inAmount = balance < 0 ? 0 : balance
    const inDays = balance <= 0 ? ( Math.ceil(balance / rate) == 0 ? 'Pago' : `Pago +${-Math.ceil(balance / rate)}`) : `${-Math.ceil(balance / rate)} días`
    
    return { inAmount, inDays }
}

const service = (pay) => config.services.find((service) => service.id == pay.service).alias
const method = (pay) => config.methods.find((method) => method.id == pay.method).alias

const lastRetire = (user) => retires.retires.find((retire) => retire.account == user._id)
const residue = (user) => lastRetire(user) ? lastRetire(user).residue : 0

const paysUser = (user) => {
    const lastDate = lastRetire(user) ? lastRetire(user).created : 0
    const filter = (pay) => pay.user._id == user._id && pay.created > lastDate
    return pays.pays.filter(filter)
}

const cash = (user, method = 0) => {
    const payments = method ? paysUser(user).filter((pay) => pay.method == method) : paysUser(user)

    const incomes = payments.filter((pay) => pay.service != 3 && pay.service != 7)
    const outcomes = payments.filter((pay) => pay.service == 7)

    const income = incomes.map((pay) => pay.amount).reduce((n, m) => n + m, 0)
    const outcome = outcomes.map((pay) => pay.amount).reduce((n, m) => n + m, 0)
    
    const balance = income - outcome
    return balance
}

const available = (user) => cash(user, 1) + residue(user)

const report = async () => {
    await paxs.read()
    await pays.read()

    const debtors = paxs.paxs.filter((pax) => pax.status && pax.accom == 1 && debt(pax).inAmount)
    return debtors
}

export { names, count, pax, sites, locs, date, days, summarize, debt, service, method, cash, residue, available, report }