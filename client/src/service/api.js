import axios from 'axios';

const URL = 'http://localhost:8000/form';
export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data);
    } catch (error) {
        console.log('Error while calling add user', error);
    }
};

export const getUsers = async () => {
    try {
        return await axios.get(`${URL}/all`)
    } catch (error) {
        console.log("Error while fetch data ", error);
    }
}
export const getUser = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`)
    } catch (error) {
        console.log("Error while fetch user ", error);
    }
}
export const editUser = async (data , id) => {
    try {
        return await axios.put(`${URL}/${id}` , data)
    } catch (error) {
        console.log("Error while fetch user ", error);
    }
}
export const removeUser = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.log("Error while remove user ", error);
    }
}