import { useState } from 'react'
import { usePersonContext } from "../components/context/PersonContext";
import '../App.css'
import PersonService from '../service/PersonService';

function Person() { 
  const {personList,updateContextData,searchContextData,sortContextData} = usePersonContext();

  const [modal,setModal] = useState<Boolean>(false);
  const [updateModal,setUpdateModal] = useState<Boolean>(false);
  const [additionInfoModal,setAdditionInfoModal] = useState<Boolean>(false);
  const [hasData,setHasData] = useState<Boolean>(false);
  const [search,setSearch] = useState('');
  const [person,setPerson] = useState({
    id:"",
    firstname:"",
    lastname:"",
    address:"",
    age:""
    });
   const [additionInfo,setAdditionInfo] = useState({
        title:"",
        description:"",
        img:"",
        });

  const handleSubmit =  (e:any)=>{
    e.preventDefault();
    PersonService.createPerson(person).then((response:any)=>{
        if(response.status === 200){
            setPerson({
                id:"",
                firstname: "",
                lastname: "",
                address: "",
                age: "",
              });
            setModal(false)
            updateContextData();
        }
    }).catch((error)=>{
        console.log(error)
    })
    
  }
  const learnMore =  (person:any)=>{
    const firstName = person.firstname.charAt(0).toUpperCase() + person.firstname.slice(1);
    const lastName = person.lastname.charAt(0).toUpperCase() + person.lastname.slice(1);
    PersonService.learnMore(firstName,lastName).then((response:any)=>{
        if(response.status === 200){
            setAdditionInfo({
                title: response.data.title,
                description: response.data.extract,
                img: response.data.originalimage.source,
              });
              setHasData(true)
              setAdditionInfoModal(true);
        }
       

    })
    .catch((error: any) => {
        console.error("Error fetching additional info:", error);
        setHasData(false); 
        setAdditionInfoModal(true); 
      })
  }
  const displayPopUp =  (person:any)=>{
    setPerson(person)
    setUpdateModal(true);

  }
  const updatePerson = (e:any)=>{
    e.preventDefault();
    PersonService.updatePerson(person.id,person).then((response:any)=>{
        if(response.status === 200){
            setUpdateModal(false)
            updateContextData();
        }
    })
  }
  const deletePerson = (id:any) => {
    PersonService.deletePerson(id).then((response:any)=>{
        if(response.status === 200){
            updateContextData();
        }
    })

  }
  const sortedPersonList = (e:any)=>{
    e.preventDefault();
    sortContextData();
  }
  const searchAll = (e:any) =>{
    e.preventDefault();
    if(search != ''){
        searchContextData(search);
    }
    else{
        updateContextData();
    }
  }
  const onChangePerson  = (e:any) =>{
    const value = e.target.value;
    setPerson(({
        ...person,
        [e.target.name]: value
    }))
 }
 const onChangeSearch = (e:any) =>{
    const value = e.target.value;
    setSearch(value);
   
 }
const renderPersonList = (person:any) =>{
    const {id,firstname,lastname,address,age} = person
    return (
            <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {firstname}
                </th>
                <td className="px-6 py-4">
                    {lastname}
                </td>
                <td className="px-6 py-4">
                    {address}
                </td>
                <td className="px-6 py-4">
                    {age}
                </td>
                <td className='px-6 py-4'>
                <button onClick={()=> displayPopUp(person) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                <button onClick={()=>learnMore(person)} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-30 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3">Read More</button>
                <button onClick={()=>deletePerson(person.id)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center ml-3 ">Delete</button>
                
                </td>
            </tr>
    )
}

  return (
    <>
        <div className='max-w-7xl mx-auto mt-10'>
            <div className='flex justify-between align-middle items-center w-4/5 mx-auto mb-5'>
                <div>
                <h2>List Of Persons</h2>
                </div>
                <div>
                <button onClick={sortedPersonList} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SortByFirstNameAndLastName</button>
                </div>
                <div>
               
                <form className="flex items-center max-w-sm mx-auto" onSubmit={searchAll}>   
                    <label  className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                            </svg>
                        </div>
                        <input type="text" id="simple-search" value={search} onChange={onChangeSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search a name..." />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>

                </div>
                <div>
                <button onClick={()=>setModal(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                </div>
            </div>
            
            

        <div className="relative overflow-x-auto drop-shadow-2xl ">
            <table className="w-4/5 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" className="px-10 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {personList.map(renderPersonList)}
                   
                    
                  
                </tbody>
            </table>
        </div>


            </div>
            { modal && (
            <div className='relative max-w-modalMaxWidth mx-auto'>

        
            <div className='fixed w-modalWidth top-[0px] '>
                <div className='overlay'>

                </div>

                <div className='bg-white drop-shadow-2xl rounded-md max-w-md mx-auto mt-5 modal-content'>
                    <div className='flex justify-between'>
                    <div className='p-5'>
                        <h2>Create New Person</h2>
                    </div>
                    <div className='p-5'>
                    <button onClick={()=>setModal(false)} className="text-white bg-gray-400 px-3 rounded-sm">X</button>
                    </div>
                    </div>
                    
                    <form className="p-5" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName:</label>
                        <input type="text" id="small-input" name="firstname" value={person.firstname} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName:</label>
                        <input type="text" id="small-input" name="lastname" value={person.lastname} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                        <input type="text" id="small-input" name="address" value={person.address} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age:</label>
                        <input type="text" id="small-input" name="age" value={person.age} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            )
            
            }

            { updateModal && (
            <div className='relative max-w-modalMaxWidth mx-auto'>

        
            <div className='fixed w-modalWidth top-[0px] '>
                <div className='overlay'>

                </div>

                <div className='bg-white drop-shadow-2xl rounded-md max-w-md mx-auto mt-5 modal-content'>
                    <div className='flex justify-between'>
                    <div className='p-5'>
                        <h2>Update a Person</h2>
                    </div>
                    <div className='p-5'>
                    <button onClick={()=>setUpdateModal(false)} className="text-white bg-gray-400 px-3 rounded-sm">X</button>
                    </div>
                    </div>
                    
                    <form className="p-5" onSubmit={updatePerson}>
                    <div className="mb-5">
                       
                        <input type="hidden" id="small-input" name="id" value={person.id} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName:</label>
                        <input type="text" id="small-input" name="firstname" value={person.firstname} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName:</label>
                        <input type="text" id="small-input" name="lastname" value={person.lastname} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                        <input type="text" id="small-input" name="address" value={person.address} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age:</label>
                        <input type="text" id="small-input" name="age" value={person.age} onChange={onChangePerson} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            )
            
            }
            { additionInfoModal && (
            <div className='relative max-w-modalMaxWidth mx-auto'>

        
            <div className='fixed w-modalWidth top-[0px] '>
                <div className='overlay'>

                </div>

                <div className='bg-white drop-shadow-2xl rounded-md max-w-md mx-auto mt-5 modal-content'>
                    <div className='flex justify-between'>
                    <div className='p-5'>
                        <h2>Additional Information</h2>
                    </div>
                    <div className='p-5'>
                    <button onClick={()=>setAdditionInfoModal(false)} className="text-white bg-gray-400 px-3 rounded-sm">X</button>
                    </div>
                    </div>
                    {hasData ? (
                        <>
                        <div className="mb-5 px-5 ">
                            <h1>{additionInfo.title}</h1>
                        </div>
                        <div className="mb-5 px-5 pb-10">
                            <p>{additionInfo.description}</p>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="mb-5 px-5 pb-10 text-center">
                            <h1>No Data</h1>
                        </div>
                        
                        </>
                    )}
                    
                   
                </div>
                </div>
            </div>
            )
            
            }
    
    </>
    
    

  )
}

export default Person
