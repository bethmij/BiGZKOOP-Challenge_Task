import {FieldValues} from "react-hook-form";
import axios from "axios";

export const getAllUserData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const getUserData = async (userId:string) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const createUser = async (data: FieldValues) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', {data}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('User created:', response.data);
    } catch (error) {
        console.error('Error creating user:',error);
    }
};

export const updateUser = async (data: FieldValues, userId:string) => {
    try {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/users/${userId}`, {data}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('User updated:', response.data);
    } catch (error) {
        console.error('Error creating user:',error);
    }
};

export const deleteUserData = async (userId: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (response.status === 200) {
            alert('User deleted successfully');
            return true;
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
    return false;
};