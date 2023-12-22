import {React,useState,useEffect} from 'react'
import '../Styles/styles.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import Cookies from 'js-cookie';

const Profile = () => {
  const [userData,setUserData] = useState({});
  const token = Cookies.get("jwtoken")

  const callProfilePage = async () =>{
    try{
      const response =await axios.get(`${SERVER_URL}/getUserData`,{withCredentials:true,headers: { Authorization: `Bearer ${token}`}});
      if(response.status === 200 ){
                const data =  response.data;
                setUserData(data);
        }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
  }
useEffect(() => {
  callProfilePage();
}, [])
  return (
   <>
   <div className="my-container">
        <div className='profile-details'>
            <p className='profile-title fs-3'>Profile</p>
            <p className='profile-item'>Name : {userData.fullName}</p>
            <p className='profile-item'>Email : {userData.email}</p>
            <p className='profile-item'>Role : {userData.role}</p>
        </div>
   </div>
   <ToastContainer/>
   </>
  )
}

export default Profile;