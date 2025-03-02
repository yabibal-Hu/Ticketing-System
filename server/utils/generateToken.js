const jwt = require("jsonwebtoken");

const generateToken = (id, userName, profilePicture) => {
  console.log(
    "id",
    id,
    "username",
    userName,
    "profilePicture",
    profilePicture,
  );
  return jwt.sign(
    {
      id,
      userName,
      profilePicture,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
