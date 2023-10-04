const Place = require("../../models/Place");

exports.getPlaceByOwner = async (ownerObject) => {
  const place = await Place.find(ownerObject);
  return place;
};

exports.createPlace = async (user, data) => {
  const {
    price,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = data;
  const newPlace = await Place.create({
    owner: user.id,
    price,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });
  return newPlace;
};
