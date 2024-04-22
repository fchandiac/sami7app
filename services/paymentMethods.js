const server_url = process.env.API_URL

function create(name, description, credit) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/create', {
            method: 'POST',
            body: JSON.stringify({ name, description, credit }),
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
    }
    )
    return paymentMethod
}

function findAll() {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/findAll', {
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
    }
    )
    return paymentMethod
}

function findOneById(id) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/findOneById', {
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
    }
    )
    return paymentMethod
}

function update(id, name, description, credit) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/update', {
            method: 'POST',
            body: JSON.stringify({ id, name, description, credit }),
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
    }
    )
    return paymentMethod
}

function destroy(id) {
    const paymentMethod = new Promise((resolve, reject) => {
        fetch(server_url + 'paymentMethods/destroy', {
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
    }
    )
    return paymentMethod
}

module.exports = {
    create,
    findAll,
    findOneById,
    update,
    destroy
}
