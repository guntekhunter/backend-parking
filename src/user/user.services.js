const prisma = require("../db/index");
const bcrypt = require("bcrypt");

async function getAllUser() {
  const users = await prisma.user.findMany();

  if (!users) {
    throw Error("Users Not Found");
  }
  return users;
}

async function loginUser(userData) {
  const user = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });
  if (!user) {
    throw Error("user Not Found");
  }

  const passwordMatch = await bcrypt.compare(userData.password, user.password);

  if (!passwordMatch) {
    throw Error("Incorrect password");
  }
  return user;
}
async function postUser(newUserData) {
  const hashedPassword = await bcrypt.hash(newUserData.password, 10);
  const user = await prisma.user.create({
    data: {
      email: newUserData.email,
      name: newUserData.name,
      password: hashedPassword,
      phone_number: newUserData.phone_number,
      isOfficer: newUserData.isOfficer,
    },
  });

  if (!user) {
    throw Error("user Not Found");
  }
  return user;
}

async function deleteUser(user_id) {
  const user = await prisma.user.delete({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    throw Error("User Spots Not Found");
  }
  return user;
}

module.exports = { getAllUser, postUser, deleteUser, loginUser };
