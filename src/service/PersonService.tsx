import axios from "axios";

const BASE_URL = "http://localhost:8000/api"
const WIKI_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/"
const headers = {
    "Content-Type": "application/json",
  };
const PersonService = {
   
    createPerson: async (person:any) => axios.post( BASE_URL + "/createPerson",person,{headers}),
    getAllPerson: async () =>  axios.get( BASE_URL + "/getAllPerson",{headers}),
    updatePerson: async (id:any,person:any) =>  axios.put( BASE_URL + "/updatePerson/"+id,person,{headers}),
    deletePerson: async (id:any) =>  axios.delete( BASE_URL + "/deletePerson/"+id,{headers}),
    searchAll:    async (search:any) =>  axios.get( BASE_URL + "/search/"+search,{headers}),
    learnMore:    async (firstName:any,lastName:any) =>   axios.get(WIKI_URL+firstName+'%20'+lastName)
}
export default PersonService