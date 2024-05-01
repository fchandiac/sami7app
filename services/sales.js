const server_url = process.env.API_URL

function create(description, type, discount, utility, net, tax, total, balance, pay_date, user_id, customer_id, document_type, document_id) {
    let data = { description, type, discount, utility, net, tax, total, balance, pay_date, user_id, customer_id, document_type, document_id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/create', {
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
    return sale
}

function findAll() {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAll', {
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
    return sale
}

function findOneById(id) {
    let data = { id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findOneById', {
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
    return sale
}

function findAllByCustomer(customer_id) {
    let data = { customer_id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByCustomer', {
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
    return sale
}

function findOneByDocument(document_type, document_id) {
    let data = { document_type, document_id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findOneByDocument', {
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
    return sale
}

function findAllByDocumentType(document_type) {
    let data = { document_type }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByDocumentType', {
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
    return sale
}

function findAllByDocumentId(document_id) {
    let data = { document_id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByDocumentId', {
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
    return sale
}

function findAllByType(type) {
    let data = { type }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByType', {
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
    return sale
}

export {
    create,
    findAll,
    findOneById,
    findAllByCustomer,
    findOneByDocument,
    findAllByDocumentType,
    findAllByDocumentId,
    findAllByType
}

