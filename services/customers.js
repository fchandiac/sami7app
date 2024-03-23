const server_url = process.env.API_URL

function create(rut, name, address, phone, mail) {
    const customer = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/create', {
            method: 'POST',
            body: JSON.stringify({ rut, name, address, phone, mail }),
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
    return customer
}

function findAll() {
    const customer = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/findAll', {
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
    return customer
}

function findOneById(id) {
    const customer = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/findOneById', {
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
    return customer
}

function findByRut(rut) {
    const customer = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/findByRut', {
            method: 'POST',
            body: JSON.stringify({ rut }),
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
    return customer
}

function update(id, rut, name, address, phone, mail) {
    const customer = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/update', {
            method: 'POST',
            body: JSON.stringify({ id, rut, name, address, phone, mail }),
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
    return customer
}

function destroy(id) {
    const customer = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/destroy', {
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
    return customer
}

export {
    create,
    findAll,
    findOneById,
    findByRut,
    update,
    destroy
}