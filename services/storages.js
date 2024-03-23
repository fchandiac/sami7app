const server_url = process.env.API_URL

function create(name, description, sales_room) {
    let data = {name, description, sales_room}
    const storage = new Promise((resolve, reject) => {
        fetch(server_url + 'storages/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
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
    return storage
}

function findAll() {
    const storage = new Promise((resolve, reject) => {
        fetch(server_url + 'storages/findAll', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
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
    return storage
}

function findOneById(id) {
    let data = {id}
    const storage = new Promise((resolve, reject) => {
        fetch(server_url + 'storages/findOneById', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
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
    return storage
}

function findAllSalesRoom() {
    const storage = new Promise((resolve, reject) => {
        fetch(server_url + 'storages/findAllSalesRoom', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
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
    return storage
}

function update(id, name, description, sales_room) {
    let data = {id, name, description, sales_room}
    const storage = new Promise((resolve, reject) => {
        fetch(server_url + 'storages/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
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
    return storage
}

function destroy(id) {
    let data = {id}
    const storage = new Promise((resolve, reject) => {
        fetch(server_url + 'storages/destroy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
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
    return storage
}

export {
    create,
    findAll,
    findOneById,
    findAllSalesRoom,
    update,
    destroy
}