const server_url = process.env.API_URL

function create(description, type, discount, utility, net, tax, total, user_id, customer_id, document_type, document_id) {
    let data = { description, type, discount, utility, net, tax, total, user_id, customer_id, document_type, document_id }
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



function createSaleDetail(quanty, price, discount, utility, net, tax, total, sale_id, product_id) {
    let data = { quanty, price, discount, utility, net, tax, total, sale_id, product_id }
    const saleDetail = new Promise((resolve, reject) => {
        fetch(server_url + 'saleDetails/create', {
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
    return saleDetail
}


function findAllBetweenDates(start_date, end_date) {
    let data = { start_date, end_date }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllBetweenDates', {
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

function findAllBetweenDatesByCustomer(start_date, end_date, customer_id) {
    let data = { start_date, end_date, customer_id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllBetweenDatesByCustomer', {
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

function findAllBetweenDatesByUser(start_date, end_date, user_id) {
    let data = { start_date, end_date, user_id }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllBetweenDatesByUser', {
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


//findAllSaleDetailBySaleId(sale_id)

function findAllSaleDetailBySaleId(sale_id) {
    let data = { sale_id }
    const saleDetail = new Promise((resolve, reject) => {
        fetch(server_url + 'saleDetails/findAllBySaleId', {
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
    return saleDetail
}

// function voidById(id)

function voidById(id) {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/voidById', {
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
    return sale
}



function updateDocumentId(id, document_id) {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/updatedocumentId', {
            method: 'POST',
            body: JSON.stringify({ id, document_id }),
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

//function updateutility(id, utility)

function updateutility(id, utility) {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/updateutility', {
            method: 'POST',
            body: JSON.stringify({ id, utility }),
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

//totalSalesBetweenDates(start_date, end_date)

function totalSalesBetweenDates(start_date, end_date) {
    let data = { start_date, end_date }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalSalesBetweenDates', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data[0].total)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale
}


// function updateSaleTax(id, tax) 

function updateSaleTax(id, tax) {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/updateSaleTax', {
            method: 'POST',
            body: JSON.stringify({ id, tax }),
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

//function updateSaleNet(id, net)

function updateSaleNet(id, net) {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/updateSaleNet', {
            method: 'POST',
            body: JSON.stringify({ id, net }),
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

//function updateSaleDocumentType(id, document_type)

function updateSaleDocumentType(id, document_type) {
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/updateSaleDocumentType', {
            method: 'POST',
            body: JSON.stringify({ id, document_type }),
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

// findAllNulledBetweenDates(start_date, end_date)

function findAllNulledBetweenDates(start_date, end_date) {
    let data = { start_date, end_date }
    const sale = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllNulledBetweenDates', {
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
    findAllByType,
    createSaleDetail,
    findAllSaleDetailBySaleId,
    findAllBetweenDates,
    findAllBetweenDatesByCustomer,
    findAllBetweenDatesByUser,
    voidById,
    updateDocumentId,
    updateutility,
    totalSalesBetweenDates,
    updateSaleTax,
    updateSaleNet,
    updateSaleDocumentType,
    findAllNulledBetweenDates
}


