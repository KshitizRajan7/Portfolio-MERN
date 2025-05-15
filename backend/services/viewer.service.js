import viewerModel from "../models/viewer.model.js";

export const createViewer = async({
    firstName,
    lastName,
    email,
    password,
}) => {
    if(!firstName || !email || !password) {
        throw new Error("Please provide all required fields: firstName, emailsss, password");
    }
    const viewer = await viewerModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
    });
    return viewer;
};