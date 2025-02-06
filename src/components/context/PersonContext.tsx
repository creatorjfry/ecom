import * as React from 'react'
import PersonService from '../../service/PersonService';

interface PersonData {
    id:number;
    firstname: string;
    lastname: string;
    address: string;
    age:    number;
}


interface PersonContextType {
    personList: PersonData[];
    updateContextData: () => void;
    searchContextData: (search: any)=>void;
    sortContextData: () => void;
}
interface PersonProviderProps {
    children: React.ReactNode; 
  }
const PersonContext = React.createContext<PersonContextType | undefined>(undefined);

export const PersonProvider: React.FC<PersonProviderProps> = ({children}) => {
    const [personList, setPersonList] = React.useState<PersonData[]>([]);
    const fetchPersonList = async () => { 
        await PersonService.getAllPerson().then((response:any)=>{
            if(response.status === 200){
                setPersonList(response.data.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    };
    const searchAll = async (search: any) => {
        await PersonService.searchAll(search).then((response:any)=>{
            if(response.status === 200){
                setPersonList(response.data.data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    };
    React.useEffect(() => {
        fetchPersonList();
      }, []);

    const updateContextData = async () => {
        fetchPersonList();
      };
    const sortedPersonList = [...personList].sort((a, b) => {
        const firstNameComparison = a.firstname.localeCompare(b.firstname);
        return firstNameComparison !== 0 ? firstNameComparison : a.lastname.localeCompare(b.lastname);
    });
    const sortContextData = async ()=>{
        setPersonList(sortedPersonList)
    }
    
    const searchContextData = async(search:any) =>{
        searchAll(search)
    }
    return (
        <PersonContext.Provider value={{ personList, updateContextData,searchContextData,sortContextData}}>
          {children}
        </PersonContext.Provider>
      );
    };

    export const usePersonContext = () => {
        const context = React.useContext(PersonContext);
        if (!context) {
          throw new Error("useTaskContext must be used within a TaskProvider");
        }
      
        return context;
      };