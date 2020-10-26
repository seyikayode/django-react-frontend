import axiosInstance from "../http-common";

class TutorialDataService {
    getAll(){
        return axiosInstance.get(`/tutorials`)
    }
    get(id){
        return axiosInstance.get(`/tutorials/${id}`)
    }
    create(data){
        return axiosInstance.post(`/tutorials`, data)
    }
    update(id, data){
        return axiosInstance.put(`/tutorials/${id}`, data)
    }
    delete(id){
        return axiosInstance.delete(`/tutorials/${id}`)
    }
    deleteAll(){
        return axiosInstance.delete(`/tutorials`)
    }
    findByTitle(title){
        return axiosInstance.get(`/tutorials?title=${title}`)
    }
};
export default new TutorialDataService();