import { http } from "./httpService";
import { toast } from "react-toastify";


export const add = async (newData) => {
	try {
		http.post(`/addMedia`, newData);
		console.log(newData)
	} catch (error) {
		toast.error(`Failed to add mediapack : ${error.message}`);
	}
};


export const remove = (mediapackid) => {
	try {
		http.delete(`/deleteMedia?id=${mediapackid}`);
	} catch (error) {
		toast.error(`Failed to delete mediapack : ${error.message}`);
	}
};

export const getAll = async () => {
	try {
		const result = await http.get(`/getMedia`);
		return result.data;
	} catch (error) {
		toast.error(`Failed to get mediapack : ${error.message}`);
	}
};







