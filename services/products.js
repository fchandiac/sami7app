const server_url = process.env.API_URL

function create(name, code, description, stock_control, ivaSubject, favorite, purchase_price_id, selling_price_id, subcategory_id) {
    let data = { name, code, description, stock_control, ivaSubject, favorite, purchase_price_id, selling_price_id, subcategory_id }
    const product = new Promise((resolve, reject) => {
        fetch(server_url + 'products/create', {
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
    return product
}

function findAll() {
    const product = new Promise((resolve, reject) => {
        fetch(server_url + 'products/findAll', {
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
    return product
}

function findOneById(id) {
    let data = { id }
    const product = new Promise((resolve, reject) => {
        fetch(server_url + 'products/findOneById', {
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
    return product
}

function generalUpdate(id, name, code, description, stock_control, ivaSubject, favorite, subcategory_id) {
    let data = { id, name, code, description, stock_control, ivaSubject, favorite, subcategory_id }
    const product = new Promise((resolve, reject) => {
        fetch(server_url + 'products/generalUpdate', {
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
    return product
}


function existByName(name) {
    let data = { name }
    const product = new Promise((resolve, reject) => {
        fetch(server_url + 'products/existByName', {
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
    return product
}

export { create, findAll, findOneById, generalUpdate, existByName }