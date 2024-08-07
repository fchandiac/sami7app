// router.post('/purchases/create', async (req, res) => {
//     const { description, type, utility, net, tax, total, user_id, provider_id, document_type, document_id, nulled } = req.body
//     const purchase = await purchases.create(description, type, utility, net, tax, total, user_id, provider_id, document_type, document_id, nulled)
//     res.json(purchase)
// })

// router.get('/purchases/findAll', async (req, res) => {
//     const purchase = await purchases.findAll()
//     res.json(purchase)
// })

// function create(rut, name, activity, district, city, address, phone, mail) {
//     const customer = new Promise((resolve, reject) => {
//         fetch(server_url + 'customers/create', {
//             method: 'POST',
//             body: JSON.stringify({rut, name, activity, district, city, address, phone, mail}),
//             headers: { 'Content-Type': 'application/json' }
//         }).then(res => {
//             res.json().then(res => {
//                 if (res.code === 0) {
//                     reject(res.data)
//                 } else {
//                     resolve(res.data)
//                 }
//             })
//         }).catch(err => {
//             reject(err)
//         })
//     })
//     return customer
// }

const server_url = process.env.API_URL

function create(description, type, utility, net, tax, total, user_id, provider_id, document_type, document_id, nulled) {
    const purchase = new Promise((resolve, reject) => {
        fetch(server_url + 'purchases/create', {
            method: 'POST',
            body: JSON.stringify({ description, type, utility, net, tax, total, user_id, provider_id, document_type, document_id, nulled }),
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
    return purchase
}

function findAll() {
    const purchase = new Promise((resolve, reject) => {
        fetch(server_url + 'purchases/findAll', {
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
    return purchase
}


//function findById(id)
//function findAllBetweenDates(start, end)

function findById(id){
    const purchase = new Promise((resolve, reject) => {
        fetch(server_url + 'purchases/findById', {
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
    return purchase

}
//function findAllBetweenDates(start, end)

function findAllBetweenDates(start, end){
    const purchase = new Promise((resolve, reject) => {
        fetch(server_url + 'purchases/findAllBetweenDates', {
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
    return purchase

}

//findAllByProvider(provider_id)

function findAllByProvider(provider_id){
    const purchase = new Promise((resolve, reject) => {
        fetch(server_url + 'purchases/findAllByProvider', {
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
    return purchase

}

export {
    create,
    findAll,
    findById,
    findAllBetweenDates,
    findAllByProvider
}