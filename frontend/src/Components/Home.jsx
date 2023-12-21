import React,{ useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { BiCameraMovie } from "react-icons/bi";

const Home = () => {
        const navigate = useNavigate()
        const {userState} = useContext(AuthContext)
  return (
        <>
                {userState ? 
                <div className='my-home p-3'>
                        <div className=''>
                                <button className='btn btn-success'>Discover Films</button>
                        </div>
                </div>:
                <div className='my-container'>
                        <div className='bg-light p-4 rounded-3 shadow d-flex flex-column align-items-center'>
                        <h2 className='welcome-text mb-3'>Discover, Explore, Entertain: Watch, Rate, Enjoy!</h2>
                        <h1><BiCameraMovie/>  The IMDB Clone  <BiCameraMovie/></h1>
                        <div className='d-flex flex-row mb-3'>
                                <button className="btn btn-primary mx-2" onClick={()=>navigate("/signup")}>SignUp</button>
                                <button className="btn btn-success mx-2" onClick={()=>navigate("/signin")}>SignIn</button>
                        </div>
                        </div> 
                </div>}
        </>
  )}

export default Home