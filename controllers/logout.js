const User = require("../model/User");
const { cookieWithoutTimeOptions } = require("../config/cookieSettings");

const handleLogout = async (req, res) => {
  // On client(frontend) delete the accessToken;
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", cookieWithoutTimeOptions);
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", cookieWithoutTimeOptions);

  return res.sendStatus(204);
};

module.exports = { handleLogout };
