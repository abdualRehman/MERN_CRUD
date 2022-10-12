import { request, response } from 'express';
import User from '../schema/user-schema.js'
import UserAuth from '../schema/user-auth-schema.js';


export const addUser = async (request, response) => {

    request.body.created_by = request.user.id;
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
        const users = await User.find({ created_by: request.user.id });
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

        // check for user autheriza
        const authUser = await UserAuth.findById(response.user.id);
        if (!authUser) {
            response.status(401);
            throw new Error('User not found');
        }
        // make sure the logged in user matches the goal user
        if (user.created_by.toString() !== authUser.id) {
            response.status(401);
            throw new Error('User not autherize');
        }

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

        const user = await User.findById(request.params.id);
        if (!user) {
            response.status(400);
            throw new Error('User not Found');
        }

        // check for user autheriza
        const authUser = await UserAuth.findById(request.user.id);
        if (!authUser) {
            response.status(401);
            throw new Error('User not found');
        }
        // make sure the logged in user matches the goal user
        if (user.created_by.toString() !== authUser.id) {
            response.status(401);
            throw new Error('User not autherize');
        }


        // await User.deleteOne({ _id: id });
        await user.remove();
        response.status(200).json({ message: 'User Deleted Successfully' });
    } catch (error) {
        response.status(409).json({ message: error.message });
        console.log('Error while delete data ', error);
    }
}
