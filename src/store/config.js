const store = {}

// static content

store.accoms = [
    { id: 1, alias: 'Camping' },
    { id: 2, alias: 'Hostel' },
    { id: 3, alias: 'Domos' }
]

store.statuses = [
    { id: 1, alias: 'Activo' },
    { id: 0, alias: 'Inactivo' }
]

store.services = [
    { id: 1, alias: 'Estadía' },
    { id: 2, alias: 'Multa / Recargo' },
    { id: 3, alias: 'Descuento' },
    { id: 4, alias: 'Leña' },
    { id: 5, alias: 'Desayuno' },
    { id: 6, alias: 'Otros'},
    { id: 7, alias: 'Devolución'},
]

store.methods = [
    { id: 1, alias: 'Efectivo' },
    { id: 2, alias: 'T. Débito / Crédito'}
]

// database content

store.extras = [
    { id: 1, alias: 'Auto' },
    { id: 2, alias: 'Camper' },
]

store.rates = [
    { id: 1, alias: 'Camping',
    rates: {
        group: [
            { id: 1, alias: 'Adultos', rate: 2500 },
            { id: 2, alias: 'Niños', rate: 1250 }
        ],
        extras: [
            { id: 1, alias: 'Auto', rate: 1000 },
            { id: 2, alias: 'Camper', rate: 1500 },
        ],
        location: [
            { id: 0, alias: 'Carpas', rate: 0 },
        ]
    } },
    { id: 2, alias: 'Hostel',
    rates: {
        group: [
            { id: 1, alias: 'Adultos', rate: 5000 },
            { id: 2, alias: 'Niños', rate: 5000 }
        ],
        extras: [
            { id: 1, alias: 'Auto', rate: 0 },
            { id: 2, alias: 'Camper', rate: 0 },
        ],
        location: [
            { id: 0, alias: 'Habitaciones', rate: 0 },
        ]
    } },
    { id: 3, alias: 'Domos',
    rates: {
        group: [
            { id: 1, alias: 'Adultos', rate: 0 },
            { id: 2, alias: 'Niños', rate: 0 }
        ],
        extras: [
            { id: 1, alias: 'Auto', rate: 0 },
            { id: 2, alias: 'Camper', rate: 0 },
        ],
        location: [
            { id: 0, alias: 'Domos', rate: 16000 }
        ]
    } },
]

export { store }