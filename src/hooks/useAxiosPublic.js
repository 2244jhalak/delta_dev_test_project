import axios from "axios";


const axiosPublic=axios.create({
       baseURL:'https://delta-dev-stdjhalakgmailcoms-projects.vercel.app',
       
})

const useAxiosPublic = () => {
    
    return axiosPublic;
};

export default useAxiosPublic;