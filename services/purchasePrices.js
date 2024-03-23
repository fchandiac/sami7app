const server_url = process.env.API_URL

function create(net, gross, provider_id, taxes) {
    const purchasePrice = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasePrices/create', {
            method: 'POST',
            body: JSON.stringify({ net, gross, provider_id, taxes }),
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
    return purchasePrice
}

function findAll() {
    const purchasePrice = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasePrices/findAll', {
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
    return purchasePrice
}

function findOneById(id) {
    const purchasePrice = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasePrices/findOneById', {
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
    return purchasePrice
}

function update(id, net, gross, provider_id) {
    const purchasePrice = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasePrices/update', {
            method: 'POST',
            body: JSON.stringify({ id, net, gross, provider_id }),
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
    return purchasePrice
}

function destroy(id) {
    const purchasePrice = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasePrices/destroy', {
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
    return purchasePrice
}

// function createTaxPurchasePrices(tax_id, purchase_price_id) {
//     const taxPurchasePrices = new Promise((resolve, reject) => {
//         fetch(server_url + 'purchasePrices/createTaxPurchasePrices', {
//             method: 'POST',
//             body: JSON.stringify({ tax_id, purchase_price_id }),
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
//     return taxPurchasePrices
// }

module.exports = {
    create,
    findAll,
    findOneById,
    update,
    destroy,
}
