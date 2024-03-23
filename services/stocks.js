const server_url = process.env.API_URL

function create(total, available, reserve, critical, storage_id, product_id) {
    let data = { total, available, reserve, critical, storage_id, product_id }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/create', {
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
    return stock
}

function findAll() {
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/findAll', {
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
    return stock
}

function findOneById(id) {
    let data = { id }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/findOneById', {
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
    return stock
}

function findAllByStorage(storage_id) {
    let data = { storage_id }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/findAllByStorage', {
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
    return stock
}

function findOneByStorageAndProduct(storage_id, product_id) {
    let data = { storage_id, product_id }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/findOneByStorageAndProduct', {
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
    return stock
}

function addStock(id, quanty) {
    let data = { id, quanty }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/addStock', {
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
    return stock
}

function decrementStock(id, quanty) {
    let data = { id, quanty }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/decrementStock', {
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
    return stock
}

function updateAvailable(id) {
    let data = { id }
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/updateAvailable', {
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
    return stock
}

function findAllGroupByProduct() {
    const stock = new Promise((resolve, reject) => {
        fetch(server_url + 'stocks/findAllGroupByProduct', {
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
    return stock
}

export {
    create,
    findAll,
    findOneById,
    findAllByStorage,
    findOneByStorageAndProduct,
    addStock,
    decrementStock,
    updateAvailable,
    findAllGroupByProduct
}