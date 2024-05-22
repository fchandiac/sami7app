// router.post('/customerAccountMovements/create', async (req, res) => {
//     const { description, type, previous_balance, debit, credit, balance, reference_id, customer_id, user_id } = req.body
//     const customerAccountMovement = await customerAccountMovements.create(description, type, previous_balance, debit, credit, balance, reference_id, customer_id, user_id)
//     res.json(customerAccountMovement)
// })

// router.post('/customerAccountMovements/findAllByCustomerId', async (req, res) => {
//     const { customer_id } = req.body
//     const customerAccountMovement = await customerAccountMovements.findAllByCustomerId(customer_id)
//     res.json(customerAccountMovement)
// })

// router.post('/customerAccountMovements/findLastByCustomerId', async (req, res) => {
//     const { customer_id } = req.body
//     const customerAccountMovement = await customerAccountMovements.findLastByCustomerId(customer_id)
//     res.json(customerAccountMovement)
// })

const server_url = process.env.API_URL

function create(description, type, previous_balance, debit, credit, balance, reference_id, customer_id, user_id) {
    let data = { description, type, previous_balance, debit, credit, balance, reference_id, customer_id, user_id }
    const customerAccountMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'customerAccountMovements/create', {
            method: 'POST',
            body: JSON.stringify(data),
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
    return customerAccountMovement
}

function findAllByCustomerId(customer_id) {
    let data = { customer_id }
    const customerAccountMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'customerAccountMovements/findAllByCustomerId', {
            method: 'POST',
            body: JSON.stringify(data),
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
    return customerAccountMovement
}

function findLastByCustomerId(customer_id) {
    let data = { customer_id }
    const customerAccountMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'customerAccountMovements/findLastByCustomerId', {
            method: 'POST',
            body: JSON.stringify(data),
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
    return customerAccountMovement
}

// function voidById(id)

function voidById(id) {
    const customerAccountMovement = new Promise((resolve, reject) => {
        fetch(server_url + 'customerAccountMovements/voidById', {
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
    return customerAccountMovement
}

export {
    create,
    findAllByCustomerId,
    findLastByCustomerId,
    voidById
}