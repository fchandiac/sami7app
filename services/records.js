const server_url = process.env.API_URL


function create(user_id, action, table, description) {
    const record = new Promise((resolve, reject) => {
        fetch(server_url + 'records/create', {
            method: 'POST',
            body: JSON.stringify({ user_id, action, table, description }),
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
    return record
}

function findAll() {
    const record = new Promise((resolve, reject) => {
        fetch(server_url + 'records/findAll', {
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
    return record
}

export {
    create,
    findAll
}