import React from "react";
const paymentsProviders = require("@/services/paymentsProviders");
// router.post('/paymentsProviders/create', async (req, res) => {
//     const { description, type, amount, balance, purchase_id, user_id, pay_date, payment_method_id, provider_id } = req.body
//     const paymentProvider = await paymentsProviders.create(description, type, amount, balance, purchase_id, user_id, pay_date, payment_method_id, provider_id)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllByProviderId', async (req, res) => {
//     const { provider_id } = req.body
//     const paymentProvider = await paymentsProviders.findAllByProviderId(provider_id)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findLastByProviderId', async (req, res) => {
//     const { provider_id } = req.body
//     const paymentProvider = await paymentsProviders.findLastByProviderId(provider_id)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllBetweenDates', async (req, res) => {
//     const { start, end } = req.body
//     const paymentProvider = await paymentsProviders.findAllBetweenDates(start, end)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllBetweenDatesZeroBalance', async (req, res) => {
//     const { start, end } = req.body
//     const paymentProvider = await paymentsProviders.findAllBetweenDatesZeroBalance(start, end)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/findAllBetweenDatesPositiveBalance', async (req, res) => {
//     const { start, end } = req.body
//     const paymentProvider = await paymentsProviders.findAllBetweenDatesPositiveBalance(start, end)
//     res.json(paymentProvider)
// })

// router.post('/paymentsProviders/voidById', async (req, res) => {
//     const { id } = req.body
//     const paymentProvider = await paymentsProviders.voidById(id)
//     res.json(paymentProvider)
// })
export default function usePaymentsProviders() {
  const create = async (
    description,
    type,
    amount,
    balance,
    purchase_id,
    user_id,
    pay_date,
    payment_method_id,
    provider_id
  ) => {
    const paymentProvider = await paymentsProviders.create(
      description,
      type,
      amount,
      balance,
      purchase_id,
      user_id,
      pay_date,
      payment_method_id,
      provider_id
    );
    return paymentProvider;
  };

  const findAllByProviderId = async (provider_id) => {
    const paymentProvider = await paymentsProviders.findAllByProviderId(
      provider_id
    );
    return paymentProvider;
  };

  const findLastByProviderId = async (provider_id) => {
    const paymentProvider = await paymentsProviders.findLastByProviderId(
      provider_id
    );
    return paymentProvider;
  };

  const findAllBetweenDates = async (start, end) => {
    const paymentProvider = await paymentsProviders.findAllBetweenDates(
      start,
      end
    );
    return paymentProvider;
  };

  const findAllBetweenDatesZeroBalance = async (start, end) => {
    const paymentProvider =
      await paymentsProviders.findAllBetweenDatesZeroBalance(start, end);
    return paymentProvider;
  };

  const findAllBetweenDatesPositiveBalance = async (start, end) => {
    const paymentProvider =
      await paymentsProviders.findAllBetweenDatesPositiveBalance(start, end);
    return paymentProvider;
  };

  const voidById = async (id) => {
    const paymentProvider = await paymentsProviders.voidById(id);
    return paymentProvider;
  };

  return {
    create,
    findAllByProviderId,
    findLastByProviderId,
    findAllBetweenDates,
    findAllBetweenDatesZeroBalance,
    findAllBetweenDatesPositiveBalance,
    voidById,
  };
}
