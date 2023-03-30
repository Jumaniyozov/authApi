const cookieOptions = {
  httpOnly: true,
  //  1 day
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "None",
  // secure: true,
};

const cookieWithoutTimeOptions = {
  httpOnly: true,
  //  1 day
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "None",
  // secure: true,
};

module.exports = {
  cookieWithoutTimeOptions,
  cookieOptions,
};
