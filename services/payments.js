// async function create(
//     description,
//     type,
//     amount,
//     balance,
//     sale_id,
//     user_id,
//     pay_date,
//     payment_method_id,
//     customer_id,
//     cash_register_movement_id
//   ) {
//     const payment = await Payments.create({
//       description: description,
//       type: type,
//       amount: amount,
//       balance: balance,
//       sale_id: sale_id,
//       user_id: user_id,
//       pay_date: pay_date,
//       payment_method_id: payment_method_id,
//       customer_id: customer_id,
//       cash_register_movement_id: cash_register_movement_id,
//     })
//       .then((data) => {
//         return { code: 1, data: data };
//       })
//       .catch((err) => {
//         return { code: 0, data: err };
//       });
//     return payment;
//   }

//   async function findAllByCustomerId(customer_id) {
//     const payment = await Payments.findAll({
//       where: { customer_id: customer_id },
//       include: [Users, Customers],
//       order: [["created_at", "DESC"]],
//     })
//       .then((data) => {
//         return { code: 1, data: data };
//       })
//       .catch((err) => {
//         return { code: 0, data: err };
//       });
//     return payment;
//   }

const server_url = process.env.API_URL;

function create(
  description,
  type,
  amount,
  balance,
  sale_id,
  user_id,
  pay_date,
  payment_method_id,
  customer_id,
  cash_register_movement_id
) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/create", {
      method: "POST",
      body: JSON.stringify({
        description,
        type,
        amount,
        balance,
        sale_id,
        user_id,
        pay_date,
        payment_method_id,
        customer_id,
        cash_register_movement_id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

function findAllByCustomerId(customer_id) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/findAllByCustomerId", {
      method: "POST",
      body: JSON.stringify({ customer_id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

function findLastByCustomerId(customer_id) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/findLastByCustomerId", {
      method: "POST",
      body: JSON.stringify({ customer_id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

// router.post('/payments/findAllBetweenDates', async (req, res) => {
//     const { start_date, end_date } = req.body
//     const payment = await payments.findAllBetweenDates(start_date, end_date)
//     res.json(payment)
// })

// router.post('/payments/findAllBetweenDatesZeroBalance', async (req, res) => {
//     const { start_date, end_date } = req.body
//     const payment = await payments.findAllBetweenDatesZeroBalance(start_date, end_date)
//     res.json(payment)
// })

// router.post('/payments/findAllBetweenDatesPositiveBalance', async (req, res) => {
//     const { start_date, end_date } = req.body
//     const payment = await payments.findAllBetweenDatesPositiveBalance(start_date, end_date)
//     res.json(payment)
// })

function findAllBetweenDates(start_date, end_date) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/findAllBetweenDates", {
      method: "POST",
      body: JSON.stringify({ start_date, end_date }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

function findAllBetweenDatesZeroBalance(start_date, end_date) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/findAllBetweenDatesZeroBalance", {
      method: "POST",
      body: JSON.stringify({ start_date, end_date }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

function findAllBetweenDatesPositiveBalance(start_date, end_date) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/findAllBetweenDatesPositiveBalance", {
      method: "POST",
      body: JSON.stringify({ start_date, end_date }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

// function voidById(id)

function voidById(id) {
  const payment = new Promise((resolve, reject) => {
    fetch(server_url + "payments/voidById", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return payment;
}

export {
  create,
  findAllByCustomerId,
  findLastByCustomerId,
  findAllBetweenDates,
  findAllBetweenDatesZeroBalance,
  findAllBetweenDatesPositiveBalance,
  voidById,
};
