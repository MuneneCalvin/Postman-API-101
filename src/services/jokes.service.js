const { Joke } = require('../models');

const createJoke = async (jokeBody) => {
    return Joke.create(jokeBody);
};

const queryJokes = async () => {
    return Joke.find({ is_deleted: false });
};

const getJokeById = async (jokeId) => {
    const result = await Joke.findById(jokeId);
    return result
}

const updateJokeById = async (jokeId, jokeBody) => {
    return Joke.findByIdAndUpdate(jokeId, jokeBody, { new: true });
};

const deleteJokeById = async (jokeId) => {
    return Joke.findByIdAndUpdate(jokeId, { is_deleted: true }, { new: true });
};

module.exports = {
    createJoke,
    queryJokes,
    getJokeById,
    updateJokeById,
    deleteJokeById,
};