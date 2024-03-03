require('dotenv').config();
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');


const registerUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await User.create(userBody);
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email, password });
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, Name: user.first_name }, process.env.JWT_SECRET, { expiresIn: '3h' });
    return { user, token };
}

const getUsers = async () => {
    return User.find();
};

const getUserById = async (userId) => {
    return User.findById(userId);
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
