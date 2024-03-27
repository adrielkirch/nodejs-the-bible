const { StatusCodes } = require("http-status-codes");
const userService = require("../services/service.user");
const { validationResult } = require("express-validator");

async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const { email, name, password } = req.body;
    const user = await userService.signup(email, name, password);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function getById(req, res) {
  try {
    const user = await userService.getById(req.user);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function deleteById(req, res) {
  try {
    await userService.deleteById(req.user);
    res.status(StatusCodes.NO_CONTENT).json({});
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}
async function update(req, res) {
  try {
    const { name } = req.body;

    const payload = {
      _id: req.user,
      name: name,
    };
    await userService.update(payload);
    res.status(StatusCodes.OK).json({});
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  update,
};
