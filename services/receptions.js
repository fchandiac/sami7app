
// router.post('/receptions/create', async (req, res) => {
//     const { description, type, status, date, user_id, reception_id, document_type, document_id, nulled } = req.body
//     const reception = await receptions.create(description, type, status, date, user_id, reception_id, document_type, document_id, nulled)
//     res.json(reception)
// })

// router.get('/receptions/findAll', async (req, res) => {
//     const reception = await receptions.findAll()
//     res.json(reception)
// })

// router.post('/receptions/findAllBetweenDates', async (req, res) => {
//     const { start, end } = req.body
//     const reception = await receptions.findAllBetweenDates(start, end)
//     res.json(reception)
// })

// router.post('/receptions/finAllByPurchase', async (req, res) => {
//     const { purchase_id } = req.body
//     const reception = await receptions.finAllByPurchase(purchase_id)
//     res.json(reception)
// })


const server_url = process.env.API_URL


function create(description, type, status, date, user_id, reception_id, document_type, document_id, nulled) {
    const reception = new Promise((resolve, reject) => {
        fetch(server_url + 'receptions/create', {
            method: 'POST',
            body: JSON.stringify({ description, type, status, date, user_id, reception_id, document_type, document_id, nulled }),
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
    return reception
}

function findAll() {
    const reception = new Promise((resolve, reject) => {
        fetch(server_url + 'receptions/findAll', {
            method: 'GET',
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
    return reception
}

function findAllBetweenDates(start, end) {
    const reception = new Promise((resolve, reject) => {
        fetch(server_url + 'receptions/findAllBetweenDates', {
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
    return reception
}

function finAllByPurchase(purchase_id) {
    const reception = new Promise((resolve, reject) => {
        fetch(server_url + 'receptions/finAllByPurchase', {
            method: 'POST',
            body: JSON.stringify({ purchase_id }),
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
    return reception
}

export {
    create,
    findAll,
    findAllBetweenDates,
    finAllByPurchase
}