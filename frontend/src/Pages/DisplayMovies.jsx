import React,{useState,useEffect} from 'react'
import '../Styles/styles.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DisplayMovies = () => {
        const navigate = useNavigate()
        const [movies,setMovies] = useState([]);
        let userRole = "user"
        
        const token = Cookies.get("jwtoken")

        const handleEdit = () => {
                console.log(`Editing`);
        };

        const handleDelete = () => {
                console.log(`Deleting`);
        };
const addToWatchlist = async (movieId) => {
        try {
                const response = await axios.post(`${SERVER_URL}/addToWatchList`, {movieId:movieId},{withCredentials:true,headers: { Authorization: `Bearer ${token}`}})
                if(response.status === 200 ){
                        toast.success("Movie Added",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        setTimeout(()=>navigate("/"),2000)
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      };
      
        const getAllMovies = async () =>{
          try{
            const response =await axios.get(`${SERVER_URL}/getAllMovies`,{withCredentials:true,headers: { Authorization: `Bearer ${token}`}});
            if(response.status === 200 ){
                      const data =  response.data;
                      setMovies(data);
              }
              } catch (error) {
                      const errorMessage = error.response ? error.response.data.message : "An error occurred";
                      toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
              }
        }
      useEffect(() => {
        getAllMovies();
      }, [])
  return (
    <>
    <div className='movies-container'>
        {movies && movies.map((movie,id) => {
                return(
                        <div className="movie-card" key={id}>
                        <p className="movie-title fs-4">{movie.name}</p>
                        <img className='movie-poster' src={movie.poster} alt={`${movie.poster}Poster`} />
                        {userRole === 'contributor' ? (
                          <div className="role-buttons">
                            <button className='btn btn-primary' onClick={handleEdit}>Edit</button>
                            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                          </div>
                        ):<div className='role-buttons'>
                                <button className='btn btn-success mx-2' onClick={() => navigate(`/displayMovie/${movie._id}`)}>View</button>
                                <button className='btn btn-warning mx-2' onClick={()=>addToWatchlist(movie._id)}>WatchList +</button>
                                </div>}
                      </div>
                )
        })}
    </div>
    <ToastContainer/>
    </>
  )
}

export default DisplayMovies