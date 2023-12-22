import React,{ useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { BiCameraMovie } from "react-icons/bi";
import DisplayMovies from '../Pages/DisplayMovies.jsx';

const Home = () => {
        const navigate = useNavigate()
        const {userState} = useContext(AuthContext)
  return (
        <>
                {userState ? 
                <div className='my-home p-3'>
                        <div className=''>
                                <DisplayMovies/>
                        </div>
                </div>:
                <div className='my-container'>
                        <div className='bg-light p-4 rounded-3 shadow d-flex flex-column gap-1 align-items-center'>
                        <p className='fs-2'>Discover, Explore, Entertain: Watch, Rate, Enjoy!</p>
                        <p className='fs-3'><BiCameraMovie/>  The IMDB Clone  <BiCameraMovie/></p>
                        <div className='d-flex flex-row mb-3'>
                                <button className="btn btn-primary mx-2" onClick={()=>navigate("/signup")}>SignUp</button>
                                <button className="btn btn-success mx-2" onClick={()=>navigate("/signin")}>SignIn</button>
                        </div>
                        </div> 
                </div>}
        </>
  )}

export default Home