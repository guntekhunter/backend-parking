const prisma = require("../db/index");

async function getAllPayment() {
  const payment = await prisma.payment.findMany();

  if (!payment) {
    throw Error("Payment Not Found");
  }
  return payment;
}
async function getOnePayment(payment_id) {
  const payment = await prisma.payment.findFirst({
    where: {
      id: payment_id,
    },
  });

  if (!payment) {
    throw Error("Payment Not Found");
  }
  return payment;
}
async function postPayment(newPayment) {
  const payment = await prisma.payment.create({
    data: {
      reservation_id: newPayment.reservation_id,
      amount: newPayment.amount,
      method: newPayment.method,
      date: newPayment.date,
    },
  });

  if (!payment) {
    throw Error("Payment Not Found");
  }
  return payment;
}

async function deletePayment(payment_id) {
  const payment = await prisma.payment.delete({
    where: {
      id: payment_id,
    },
  });

  if (!payment) {
    throw Error("payment Spots Not Found");
  }
  return payment;
}

module.exports = { getAllPayment, getOnePayment, postPayment, deletePayment };
