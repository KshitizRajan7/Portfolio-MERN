import ownerModel from "../models/owner.model.js";

export const createOwner = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "Please provide all required fields: firstName, lastName, email, password"
    );
  }
  const owner = await ownerModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });
  return owner;
};
