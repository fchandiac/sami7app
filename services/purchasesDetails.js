// router.post('/purchasesDetails/create', async (req, res) => {
//     const { quanty, price, utility, net, tax, total, purchase_id, product_id } = req.body
//     const purchaseDetail = await purchasesDetails.create(quanty, price, utility, net, tax, total, purchase_id, product_id)
//     res.json(purchaseDetail)
// })

// router.get('/purchasesDetails/findAll', async (req, res) => {
//     const purchaseDetail = await purchasesDetails.findAll()
//     res.json(purchaseDetail)
// })

const server_url = process.env.API_URL

function create(quanty, price, utility, net, tax, total, purchase_id, product_id) {
    const purchaseDetail = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasesDetails/create', {
            method: 'POST',
            body: JSON.stringify({ quanty, price, utility, net, tax, total, purchase_id, product_id }),
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
    return purchaseDetail
}

function findAll() {
    const purchaseDetail = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasesDetails/findAll', {
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
    return purchaseDetail
}

//function findByPurchase(purchase_id)


function findByPurchase(purchase_id) {
    const purchaseDetail = new Promise((resolve, reject) => {
        fetch(server_url + 'purchasesDetails/findByPurchase', {
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
    return purchaseDetail
}

export {
    create,
    findAll,
    findByPurchase
}