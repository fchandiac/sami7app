// creditNotes.create = create
// creditNotes.findAll = findAll
// creditNotes.findOneById = findOneById
// creditNotes.findAllByCustomerId = findAllByCustomerId

// router.post('/creditNotes/create', async (req, res) => {
//     const { description, type, discount, utility, net, tax, total, user_id, customer_id, document_type, document_id } = req.body
//     const creditNote = await creditNotes.create(description, type, discount, utility, net, tax, total, user_id, customer_id, document_type, document_id)
//     res.json(creditNote)
// })

// router.get('/creditNotes/findAll', async (req, res) => {
//     const creditNote = await creditNotes.findAll()
//     res.json(creditNote)
// })

// router.post('/creditNotes/findOneById', async (req, res) => {
//     const { id } = req.body
//     const creditNote = await creditNotes.findOneById(id)
//     res.json(creditNote)
// })

// router.post('/creditNotes/findAllByCustomer', async (req, res) => {
//     const { customer_id } = req.body
//     const creditNote = await creditNotes.findAllByCustomerId(customer_id)
//     res.json(creditNote)
// })




//create(description, type, amount, reference_id, user_id, customer_id) 

const server_url = process.env.API_URL

function create(description, type, discount, utility, net, tax, total, user_id, customer_id, document_type, document_id) {
    let data = { description, type, discount, utility, net, tax, total, user_id, customer_id, document_type, document_id }
    const creditNote = new Promise((resolve, reject) => {
        fetch(server_url + 'creditNotes/create', {
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
    return creditNote
}

function findAll() {
    const creditNote = new Promise((resolve, reject) => {
        fetch(server_url + 'creditNotes/findAll', {
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
    return creditNote
}

function findOneById(id) {
    let data = { id }
    const creditNote = new Promise((resolve, reject) => {
        fetch(server_url + 'creditNotes/findOneById', {
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
    return creditNote
}

function findAllByCustomerId(customer_id) {
    let data = { customer_id }
    const creditNote = new Promise((resolve, reject) => {
        fetch(server_url + 'creditNotes/findAllByCustomer', {
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
    return creditNote
}

export {
    create,
    findAll,
    findOneById,
    findAllByCustomerId
}

