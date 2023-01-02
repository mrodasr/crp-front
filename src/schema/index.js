const schema = {}

const user = {
    username: '',
    password: '',
    enabled: true,
    admin: false,
    created: null
}

const pax = {
    name: '',
    docn: '',
    origin: '',
    accom: 1,
    status: 1,
    group: [],
    extras: [],
    location: [],
    checkin: null,
    checkout: null,
    created: null,
    user: null
}

const pay = {
    service: 1,
    method: 1,
    amount: null,
    notes: '',
    pax: null,
    created: null,
    user: null
}

const retire = {
    amount: 0,
    residue: 0,
    account: null,
    created: null,
    user: null
}

schema.user = JSON.stringify(user)
schema.pax = JSON.stringify(pax)
schema.pay = JSON.stringify(pay)
schema.retire = JSON.stringify(retire)

export default schema