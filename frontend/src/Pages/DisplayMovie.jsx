import React,{useState,useEffect} from 'react'
import '../Styles/styles.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayMovie = () => {
        const params = useParams()
        const navigate = useNavigate()
        const [loading,setLoading] = useState(true)
        const [movie,setMovie] = useState({})
        const token = Cookies.get("jwtoken")
        const getMovieDetails = async () =>{
                try{
                  const response =await axios.get(`${SERVER_URL}/getMovieDetails/${params.id}`,{withCredentials:true,headers: { Authorization: `Bearer ${token}`}});
                  if(response.status === 200 ){
                            const data =  response.data;
                            setMovie(data);
                            setLoading(false)
                    }
                    } catch (error) {
                            const errorMessage = error.response ? error.response.data.message : "An error occurred";
                            toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
                    }
              }
            useEffect(() => {
                getMovieDetails();
            }, [token])
  return (
    <div className='my-container'>
        {!loading?
        
        <div className='movie-detail'>
                 <img className='movie-poster h-100 border border-dark mx-2' src={movie.poster} alt={`${movie.poster} Poster`}/>
                 <div className='mx-auto'>
                 <div className='d-flex align-items-end flex-column'>
        <button className='btn btn-secondary d-inline' onClick={()=>navigate("/")}>Back</button>
        </div>
                 <p className='fs-3'>{movie.name}</p>
                                <p className='movie-text'>{movie.yearOfRelease}</p>
                                <p className='text-wrap movie-text'>{movie.plot}</p>
                         <p className='fs-5'>Actors</p>
                         <div className='d-flex flex-row gap-3'>
                         {movie.actors.map((actor,idx) => (
                                        <div key={idx}>
                                                <img className='profile-picture' src={actor.profile}/>
                                        <p className='movie-text'>{actor.name}</p>
                                        </div>
                                ))}
                        </div>
                        <p className='fs-5'>Producer</p>
                                <img className='profile-picture' src={movie.producer.profile}/>
                         <p className='movie-text'>{movie.producer.name}</p>
                </div>
        </div>:<>Loading</>
}
    </div>
  )
}

export default DisplayMovie