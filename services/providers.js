const server_url = process.env.API_URL

function create(rut, name, address, phone, mail) {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/create', {
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
    return provider
}

function findAll() {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/findAll', {
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
    return provider
}

function findOneById(id) {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/findOneById', {
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
    return provider
}

function findOneByRut(rut) {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/findOneByRut', {
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
    return provider
}

function findOneByName(name) {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/findOneByName', {
            method: 'POST',
            body: JSON.stringify({ name }),
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
    return provider
}

function update(id, rut, name, address, phone, mail) {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/update', {
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
    return provider
}

function destroy(id) {
    const provider = new Promise((resolve, reject) => {
        fetch(server_url + 'providers/destroy', {
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
    return provider
}

export {
    create,
    findAll,
    findOneById,
    findOneByRut,
    findOneByName,
    update,
    destroy
}
