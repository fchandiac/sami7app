const { default: SalePoint } = require("./components/salePoint/SalePoint");
const { default: purchases } = require("./pages/purchases");

const sale_point = {
  id: 0,
  name: "",
  description: "",
  address: "",
  phone: "",
  storage: { id: 1001, key: 1001, name: "SALA DE VENTAS" },
  status: false,
};

const cash_registers = {
  id: 0,
  status: false,
  open: 0,
  balance: 0,
  close: 0,
  open_user_id: null,
  close_user_id: null,
  sale_point_id: null,
};

const stock = {
  id: null,
  total: 0,
  available: 0,
  reserve: 0,
  critical: 0,
  storage_id: 0,
  product_id: 0,
};

const sale = {
  id: null,
  description: "",
  type: 0,
  discount: 0,
  utility: 0,
  net: 0,
  tax: 0,
  total: 0,
  user_id: null,
  customer_id: null,
  document_type: null,
  document_id: null,
  nulled: false,
  //ADD
  SalePoint_id: null,
  cash_register_id: null,
};

const purchases = {
  id: null,
  description: "",
  type: 0,
  utility: 0,
  net: 0,
  tax: 0,
  total: 0,
  user_id: null,
  provider_id: null,
  document_type: null,
  document_id: null,
  nulled: false,
  //ADD
}

const purchase_detail = {
  id: null,
  quanty: 0,
  price: 0,
  utility: 0,
  net: 0,
  tax: 0,
  total: 0,
  purchase_id: null,
  product_id: null,
}

const reception = {
  id: null,
  description: "",
  type: 0,
  status: false,
  user_id: null,
  purchase_id: null,
  document_type: null,
  document_id: null,
  nulled: false,
}

const productCard = {
  id: null,
  product_id: null,
  puchase_net: 0,
  purchase_gross: 0,
  purchase_tax: 0,
  sale_net: 0,
  sale_gross: 0,
  sale_tax: 0,
  utility: 0,
  sale_price_list_id: null,
  sale_id: null,
  sale_detail_id: null,
  purchase_id: null,
  purchase_detail_id: null,
  storage_id: null,
  reception_id: null,
  status: 0,
}



const sale_detail = {
  id: null,
  quanty: 0,
  price: 0,
  discount: 0,
  utility: 0,
  net: 0,
  tax: 0,
  total: 0,
  sale_id: null,
  product_id: null,
};

const credit_notes = {
  id: null,
  description: "",
  type: 0,
  amount: 0,
  reference_id_id: null,
  user_id: null,
  customer_id: null,
};

const debit_notes = {
  id: null,
  description: "",
  type: 0,
  amount: 0,
  user_id: null,
  customer_id: null,
  reference_id_id: null,
};

const paymentMethod = {
  id: null,
  name: "",
  description: "",
  credit: false,
};

const cash_register_movements = {
  id: null,
  cash: true,
  description: "",
  type: 0,
  previous_balance: 0,
  debit: 0,
  credit: 0,
  balance: 0,
  user_id: null,
  reference_id: null,
  paymentMethod_id: null,
  user_id: null,
  nulled: false,
};

const payments = {
  id: null,
  description: "",
  type: null,
  amount: 0,
  balance: 0,
  sale_id: null,
  user_id: null,
  pay_date: null,
  payment_method_id: null,
  customer_id: null,
  cash_register_movement_id: null,
  nulled: false,
};

const customer_account_movements = {
  id: null,
  description: "",
  type: 0,
  previous_balance: 0,
  debit: 0,
  credit: 0,
  balance: 0,
  reference_id: null,
  customer_id: null,
  user_id: null,
  nulled: false,
};
