
var UserService = require("../services/user.service");

module.exports = {
  createUser: createUser,
  getInfoUser: getInfoUser,
  uploadAvatar: uploadAvatar,
};

async function getInfoUser(userId, req, res) {
  try {
    const user = await UserService.getInfoUser(userId);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(400);
  }
}

async function createUser(data, account) {
  try {
    const user = await UserService.createUser(data, account);

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function uploadAvatar(userId, file, req, res) {
  try {
    await UserService.uploadAvatar(userId, file)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Upload avatar successful",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
      });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}
