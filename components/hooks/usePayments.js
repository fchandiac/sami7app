import React from "react";
const payments = require("@/services/payments");

export default function usePayments() {
  const create = async (
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
  ) => {
    const payment = await payments.create(
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
    );
    return payment;
  };

  const findAllByCustomerId = async (customer_id) => {
    const payment = await payments.findAllByCustomerId(customer_id);
    return payment;
  };

  const findLastByCustomerId = async (customer_id) => {
    const payment = await payments.findLastByCustomerId(customer_id);
    return payment;
  };

  // findAllBetweenDates, findAllBetweenDatesZeroBalance, findAllBetweenDatesPositiveBalance

  const findAllBetweenDates = async (start, end) => {
    const payment = await payments.findAllBetweenDates(start, end);
    return payment;
  };

  const findAllBetweenDatesZeroBalance = async (start, end) => {
    const payment = await payments.findAllBetweenDatesZeroBalance(start, end);
    return payment;
  };

  const findAllBetweenDatesPositiveBalance = async (start, end) => {
    const payment = await payments.findAllBetweenDatesPositiveBalance(
      start,
      end
    );
    return payment;
  };

  // function voidById(id)
  const voidById = async (id) => {
    const payment = await payments.voidById(id);
    return payment;
  };

  return {
    create,
    findAllByCustomerId,
    findLastByCustomerId,
    findAllBetweenDates,
    findAllBetweenDatesZeroBalance,
    findAllBetweenDatesPositiveBalance,
    voidById,
  };
}
