const lirorenToken = process.env.LIOREN_TOKEN

function states() {
    const state = new Promise((resolve, reject) => {
        fetch('http://www.lioren.cl/api/regiones', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + lirorenToken
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return state
}

function district() {
    const d = new Promise((resolve, reject) => {
        fetch('/lioren/comunas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + lirorenToken
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return d
}

function cities() {
    const c = new Promise((resolve, reject) => {
        fetch('/lioren/ciudades', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + lirorenToken
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return c
}



function boleta(data){
    const boleta = new Promise((resolve, reject) => {
        fetch('/lioren/boletas', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + lirorenToken
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return boleta
}

function factura(data) {
    const dte = new Promise((resolve, reject) => {
        fetch('/lioren/facturas', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + lirorenToken
            }
        }).then(res => {
            res.json().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    })
    return dte
}


export {
    states,
    district,
    cities,
    boleta,
    factura

}