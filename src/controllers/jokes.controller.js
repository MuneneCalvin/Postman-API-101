const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jokesService } = require('../services');

const getJokes = catchAsync(async (req, res) => {
    try {
        const result = await jokesService.queryJokes();
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get Jokes!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get Jokes.', error: error.message });
    }
});

const getJokeById = catchAsync(async (req, res) => {
    try {
        const result = await jokesService.getJokeById(req.params.jokeId);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get Joke!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to get Joke.', error: error.message });
    }
});

const createJoke = catchAsync(async (req, res) => {
    try {
        const result = await jokesService.createJoke(req.body);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Creation Failed!', data: {} });
        res.status(httpStatus.CREATED).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to Create the Joke.', error: error.message });
    }
});

const updateJokeById = catchAsync(async (req, res) => {
    try {
        const result = await jokesService.updateJokeById(req.params.jokeId, req.body);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to update Joke!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to update Joke.', error: error.message });
    }
});

const deleteJokeById = catchAsync(async (req, res) => {
    try {
        const result = await jokesService.deleteJokeById(req.params.jokeId);
        if (!result) return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to delete Joke!', data: {} });
        res.status(httpStatus.OK).json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.log("ERROR - ", error)
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Failed to delete Joke.', error: error.message });
    }
});

module.exports = {
    getJokes,
    getJokeById,
    createJoke,
    updateJokeById,
    deleteJokeById
};