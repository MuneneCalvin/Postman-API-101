const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const registerUser = catchAsync(async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Creation Failed!', data: {} });
        res.status(httpStatus.CREATED).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to Create the User.', error: error.message});
    }
});

const loginUser = catchAsync(async (req, res) => {
    try {
        const result = await userService.loginUser(req.body.email, req.body.password);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Login Failed!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to Login.', error: error.message });
    }
});

const getUsers = catchAsync(async (req, res) => {
    try {
        const result = await userService.getUsers();
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get Users!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get Users.', error: error.message });
    }
});

const getUserById = catchAsync(async (req, res) => {
    try {
        const result = await userService.getUserById(req.params.userId);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get User!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get User.', error: error.message });
    }
});

const updateUserById = catchAsync(async (req, res) => {
    try {
        const result = await userService.updateUserById(req.params.userId, req.body);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to update User!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to update User.', error: error.messageror });
    }
});

const deleteUserById = catchAsync(async (req, res) => {
    try {
        const result = await userService.deleteUserById(req.params.userId);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to delete User!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to delete User.', error: error.message });
    }
});

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};