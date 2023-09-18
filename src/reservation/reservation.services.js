const prisma = require("../db/index");

async function getAllReservation() {
  const reservations = await prisma.reservation.findMany({
    include: {
      // Include related data based on IDs from the reservation table
      user: {
        select: { email: true }, // Select the user's name
      },
      parking_places: {
        select: { location: true }, // Select the parking place's location
      },
      parking_spots: {
        select: { name: true }, // Select the parking spot's name
      },
    },
  });
  if (!reservations) {
    throw Error("reservation Not Found");
  }
  return reservations;
}

async function confirmReservation(reservation_id) {
  const reservation = await prisma.reservation.update({
    where: {
      id: reservation_id,
    },
    data: {
      payment_status: true,
    },
  });
  if (!reservation) {
    throw Error("Reservation Not Found");
  }
  return reservation;
}

async function getOneReservation(id) {
  const reservation = await prisma.reservation.findFirst({
    where: { id: id },
  });

  if (!reservation) {
    throw Error("Reservation Not Found");
  }
  return reservation;
}
async function postReservation(newReservationData) {
  const reservation = await prisma.reservation.create({
    data: {
      user_id: newReservationData.user_id,
      parking_spot_id: newReservationData.parking_spot_id,
      parking_place_id: newReservationData.parking_place_id,
      payment_status: newReservationData.payment_status,
      time: newReservationData.time,
    },
  });
  const editSpot = await prisma.parking_spots.update({
    where: {
      id: newReservationData.parking_spot_id,
    },
    data: {
      isAvailable: false,
    },
  });

  if (!reservation) {
    throw Error("Failed to make reservation");
  }

  return reservation;
}

async function putReservation(reservation_id, newReservationData) {
  const reservation = await prisma.reservation.update({
    where: {
      id: reservation_id,
    },
    data: {
      user_id: newReservationData.user_id,
      parking_spot_id: newReservationData.parking_spot_id,
      parking_place_id: newReservationData.parking_spot_id,
      payment_status: newReservationData.payment_status,
    },
  });

  if (!reservation) {
    throw Error("reservation Not Found");
  }
  return reservation;
}

async function deleteReservation(reservation_id, newParking) {
  const reservation = await prisma.reservation.delete({
    where: {
      id: reservation_id,
    },
  });
  const editSpot = await prisma.parking_spots.update({
    where: {
      id: newParking.parking_spot_id,
    },
    data: {
      isAvailable: true,
    },
  });

  if (!reservation) {
    throw Error("reservation Not Found");
  }
  return reservation;
}

module.exports = {
  getAllReservation,
  getOneReservation,
  postReservation,
  putReservation,
  deleteReservation,
  confirmReservation,
};
