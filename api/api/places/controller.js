const { getUser, getUserByToken } = require("../auth/service");
const { createPlace, getPlaceByOwner } = require("./service");

exports.getPlaces = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is missing");
    }

    const user = await getUserByToken(token);
    const { id } = user;

    const places = await getPlaceByOwner({ owner: id });
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
exports.createNewPlace = async (req, res) => {
  const { token } = req.cookies;
  const user = await getUserByToken(token);
  const newPlace = await createPlace(user, req.body);
  res.json(newPlace);
};
// exports.getAccountPlaces = async (req, res) => {
//     const { token } = req.cookies;
//     const user = getUserByToken(token);
//     const {id} = user;
//     res.json(await Place.find({owner:id}));
// };
