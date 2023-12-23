import React,  {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Cookies from 'js-cookie';
import { actorsData } from '../objects/imdb-clone-actors';

const AddMovie = () => {
        const navigate = useNavigate()
        const token = Cookies.get("jwtoken")
        const [newMovie, setNewMovie] = useState({title:"",description:"",priority:"",status:""})
        
        const handleInputs = (e) =>{
            setNewMovie({...newMovie,[e.target.name]:e.target.value});
      }
      
      const dataValidation = () => {
        for (let property in newMovie) {
          const value = newMovie[property];
            if (value.trim() === "") {
              toast.error(`${property} is required`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
              return false;
            }
        }
        return true;
      };
      
      const AddMovie = async (e) =>{
        e.preventDefault();
        if(!dataValidation())return
        try {
                const response = await axios.post(`${SERVER_URL}/addMovie`, newMovie,{withCredentials:true,headers: { Authorization: `Bearer ${token}`}})
                if(response.status === 200 ){
                        toast.success("Movie Added to Watchlist",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        setTimeout(()=>navigate("/"),2000)
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      }
  return (
    <>
                    <div className='my-container'>
                <form method='POST' className='form-component'>
                <h3 className='form-title'>Add Movie Form</h3>
                        <input className='form-control' placeholder="Enter Name"  type="text"   name="name" onChange={handleInputs} value={newMovie.name}/> 
                        <input className='form-control' placeholder="Enter Year Of Release" type="text" name="yearOfRelease" onChange={handleInputs} value={newMovie.yearOfRelease}/>
                        <input className='form-control' placeholder="Enter plot" type="text" name="plot" onChange={handleInputs} value={newMovie.plot}/>
                        <input className='form-control' placeholder="Enter Poster Url" type="text" name="poster" onChange={handleInputs} value={newMovie.poster}/>


                        <div className='row'>
                                <select className='form-select col mx-3' name='producer' onChange={handleInputs} value={newMovie.producer}>
                                <option value="none"  hidden>Select todo Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                                </select>
                                <select className='form-select col mx-3' name='actors' onChange={handleInputs} value={newMovie.actors}>
                                <option value="none"  hidden>Select the Producer</option>
                                        {actorsData.map((actor,idx)=><option>{actor.name}</option>)}
                                </select>
                        </div>                
                        <button className='my-button' onClick={AddMovie}>Add Movie</button>
                </form>
                <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Click on Me
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
      <li><a href="#">Item</a></li>
    </ul>
  </div>
                </div>
                <ToastContainer/>
    </>
  )
}

export default AddMovie