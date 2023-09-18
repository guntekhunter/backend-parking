const prisma = require("../db/index");

async function getAllParking(parking_id) {
  try {
    const place = await prisma.parking_places.findFirst({
      where: {
        id: parking_id,
      },
    });

    if (!place) {
      throw new Error("Parking Place Not Found");
    }

    const parkingSpots = await prisma.parking_spots.findMany({
      where: {
        id_parking_place: parking_id,
      },
    });

    return {
      place,
      spots: parkingSpots,
    };
  } catch (error) {
    throw new Error("Error fetching parking spots and place: " + error.message);
  }
}
async function getOneParking(parking_id) {
  const parking = await prisma.parking_spots.findFirst({
    where: {
      id: parking_id,
    },
  });

  if (!parking) {
    throw Error("Parking Spots Not Found");
  }
  const parkingPlace = await prisma.parking_places.findFirst({
    where: {
      id: parking.id_parking_place,
    },
  });
  return {
    parking,
    parkingPlace,
  };
}
async function postParkingSpots(newParkingSpots) {
  const parking = await prisma.parking_spots.create({
    data: {
      name: newParkingSpots.name,
      location: newParkingSpots.location,
      capacity: newParkingSpots.capacity,
      isAvailable: newParkingSpots.isAvailable,
    },
  });

  if (!parking) {
    throw Error("Parking Spots Not Found");
  }
  return parking;
}
async function deleteParking(parking_id) {
  const parking = await prisma.parking_spots.delete({
    where: {
      id: parking_id,
    },
  });

  if (!parking) {
    throw Error("Parking Spots Not Found");
  }
  return parking;
}

async function putParking(spot_id, newSpotData) {
  const reservation = await prisma.parking_spots.update({
    where: {
      id: spot_id,
    },
    data: {
      isAvailable: newSpotData.isAvailable,
    },
  });
  const data = await prisma.parking_spots.findMany();

  if (!reservation) {
    throw Error("reservation Not Found");
  }
  return data;
}

module.exports = {
  getAllParking,
  getOneParking,
  postParkingSpots,
  deleteParking,
  putParking,
};
