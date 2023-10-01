const { getUser, getUserByToken } = require("../auth/service");
const { createPlace } = require("./service");


exports.createNewPlace = async (req, res) => {
    const { token } = req.cookies;
    const user = getUserByToken(token);
    const newPlace = await createPlace(user, req.body);
    res.json(newPlace);
};