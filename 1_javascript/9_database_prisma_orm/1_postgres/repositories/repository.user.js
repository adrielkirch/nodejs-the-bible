const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const securityUtil = require("../utils/util.security")



async function signup(email, name, password) {
  try {
    const newUser = await prisma.user.create({
      data: {
        id: securityUtil.generateUUID(), 
        email,
        name,
        password,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error occurred during signup:", error);
    throw error;
  }
}

async function deleteAllRows() {
  try {
    const collectionName = "User";
    await prisma[collectionName].deleteMany({});
    console.log(`All rows in ${collectionName} have been deleted.`);
  } catch (error) {
    console.error(`Error occurred while deleting rows from ${collectionName}:`, error);
    throw error;
  }
}


async function login(email, password) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    console.error("Error occurred during login:", error);
    return null;
  }
}

async function getById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error occurred while fetching user by ID:", error);
    return null;
  }
}

async function deleteById(id) {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error occurred while deleting user by ID:", error);
    return null;
  }
}

async function getByFieldValue(field, value) {
  try {
    const users = await prisma.user.findMany({
      where: {
        [field]: value,
      },
    });

    console.log("Query executed successfully.");
    return users;
  } catch (error) {
    console.error("Error occurred while fetching user by field value:", error);
    return null;
  }
}

async function update(user) {
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        password: user.password,
      },
    });
  } catch (error) {
    console.error("Error occurred while updating user:", error);
    return null;
  }
}

module.exports = {
  signup,
  login,
  getById,
  deleteById,
  getByFieldValue,
  update,
  deleteAllRows
};
