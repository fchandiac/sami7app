// router.post('/paymentsProviders/create', async (req, res) => {
//     const { description, type, amount, balance, purchase_id, user_id, pay_date, payment_method_id, provider_id } = req.body
//     const paymentProvider = await paymentsProviders.create(description, type, amount, balance, purchase_id, user_id, pay_date, payment_method_id, provider_id)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllByProviderId', async (req, res) => {
//     const { provider_id } = req.body
//     const paymentProvider = await paymentsProviders.findAllByProviderId(provider_id)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findLastByProviderId', async (req, res) => {
//     const { provider_id } = req.body
//     const paymentProvider = await paymentsProviders.findLastByProviderId(provider_id)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllBetweenDates', async (req, res) => {
//     const { start, end } = req.body
//     const paymentProvider = await paymentsProviders.findAllBetweenDates(start, end)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllBetweenDatesZeroBalance', async (req, res) => {
//     const { start, end } = req.body
//     const paymentProvider = await paymentsProviders.findAllBetweenDatesZeroBalance(start, end)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllBetweenDatesPositiveBalance', async (req, res) => {
//     const { start, end } = req.body
//     const paymentProvider = await paymentsProviders.findAllBetweenDatesPositiveBalance(start, end)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/voidById', async (req, res) => {
//     const { id } = req.body
//     const paymentProvider = await paymentsProviders.voidById(id)
//     res.json(paymentProvider)
// })

const server_url = process.env.API_URL

function create(description, type, amount, balance, purchase_id, user_id, pay_date, payment_method_id, provider_id) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/create', {
            method: 'POST',
            body: JSON.stringify({ description, type, amount, balance, purchase_id, user_id, pay_date, payment_method_id, provider_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

function findAllByProviderId(provider_id) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/findAllByProviderId', {
            method: 'POST',
            body: JSON.stringify({ provider_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

function findLastByProviderId(provider_id) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/findLastByProviderId', {
            method: 'POST',
            body: JSON.stringify({ provider_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

function findAllBetweenDates(start, end) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/findAllBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ start, end }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

function findAllBetweenDatesZeroBalance(start, end) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/findAllBetweenDatesZeroBalance', {
            method: 'POST',
            body: JSON.stringify({ start, end }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

function findAllBetweenDatesPositiveBalance(start, end) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/findAllBetweenDatesPositiveBalance', {
            method: 'POST',
            body: JSON.stringify({ start, end }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

function voidById(id) {
    const paymentProvider = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentsProviders/voidById', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return paymentProvider
}

export {
    create,
    findAllByProviderId,
    findLastByProviderId,
    findAllBetweenDates,
    findAllBetweenDatesZeroBalance,
    findAllBetweenDatesPositiveBalance,
    voidById
}