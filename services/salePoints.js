
const server_url = process.env.API_URL;

function create(name, description, address, phone, status, storage_id){
    let data = {name, description, address, phone, status, storage_id}
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/create', {
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
    
}

function findAll() {
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/findAll', {
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
    return salepoint
}

function findOneById(id) {
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/findOneById', {
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
    return salepoint
}

function findOneByName(name) {
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/findOneByName', {
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
    return salepoint
}       

function update(id, name, description, address, phone, status, storage_id) {
    let data = {id, name, description, address, phone, status, storage_id}
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/update', {
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
}

function destroy(id) {
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/destroy', {
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
}


function findAllOpen(){
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/findAllOpen', {
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
    return salepoint
}

function updateStatus(id, status){
    let data = {id, status}
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/updateStatus', {
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
}

function findAllClosed(){
    const salepoint = new Promise((resolve, reject) => {
        fetch(server_url + 'salePoints/findAllClosed', {
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
    return salepoint

}

export {
    create,
    findAll,
    findOneById,
    findOneByName,
    update,
    destroy,
    findAllOpen,
    updateStatus,
    findAllClosed
}