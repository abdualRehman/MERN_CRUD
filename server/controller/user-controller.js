import { request, response } from 'express';
import User from '../schema/user-schema.js'



export const addUser = async (request, response) => {
    const user = request.body;

    const newUser = new User(user);
    try {

        await newUser.save();

        response.status(201).json(newUser);

    } catch (error) {
        response.status(409).json({ message: error.message });
        console.log('Error while adding user, validation', error);
    }
};


export const getUsers = async (request, response) => {
    try {
        const users = await User.find({});
        response.status(200).json(users);
    } catch (error) {
        response.status(404).json({ message: error.message });
        console.log('Error while fetching data ', error);
    }
}
export const getUser = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findById({ _id: id });
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({ message: error.message });
        console.log('Error while fetching data ', error);
    }
}

export const editUser = async (request, response) => {
    let user = request.body;
    const editUser = new User(user);

    try {
        const id = request.params.id;
        const user = await User.updateOne({ _id: id }, editUser);
        response.status(201).json(user);
    } catch (error) {
        response.status(409).json({ message: error.message });
        console.log('Error while Update data ', error);
    }
}

export const deleteUser = async (request, response) => {
    const id = request.params.id;
    try {
        await User.deleteOne({ _id: id });
        response.status(200).json({message: 'User Deleted Successfully'});
    } catch (error) {
        response.status(409).json({ message: error.message });
        console.log('Error while delete data ', error);
    }
}
