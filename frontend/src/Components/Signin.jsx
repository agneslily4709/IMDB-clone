import {React,useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/styles.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/AuthContext';
import { SERVER_URL } from '../Utils/globals';
import Cookies from 'js-cookie';

const Signin = () => {
        const {setUserState} = useContext(AuthContext)

        const navigate = useNavigate();
        const [user,setUser] = useState({email:"",password:""})
        const handleInputs = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
        }
        const dataValidation = () => {
                for (let data in user) {
                        if (user[data].trim() === ""){
                          toast.error(`${data} is required`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                          return false;
                        }
                      }
                      return true;
              };
 const handleSignIn =async (e)=>{
        e.preventDefault();
        if(!dataValidation())return
        try {
                const response =await  axios.post(`${SERVER_URL}/signin`,user,{withCredentials:true});
                const authToken = response.headers['x-auth-token'];
                if(response.status === 200 ){
                        toast.success("SignIn Successful",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        Cookies.set("jwtoken",authToken,{path:"/"})
                        setUserState(true)
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
    <h3 className='form-title'>Signin</h3>
        <input className='form-control' onChange={handleInputs}  placeholder="Enter Mail"  type="email"  value={user.email}  name="email"  required/> 
        <input className='form-control' onChange={handleInputs} placeholder="Enter Password" type="password" value={user.password} name="password" required/>
            <button className='my-button'  onClick={handleSignIn}>Signin</button>
    </form>
    </div>
    <ToastContainer/>
   </>
  )
}

export default Signin