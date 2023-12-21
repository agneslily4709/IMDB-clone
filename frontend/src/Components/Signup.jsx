import {React,useState} from 'react';
import '../Styles/styles.css'
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { SERVER_URL } from '../Utils/globals';

const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({fullName:"",email:"",password:"",role:"",agreedToTerms:true})
  const handleInputs = (e) =>{
      setUser({...user,[e.target.name]:e.target.value});
}
const dataValidation = () => {
        for (let data in user) {
                if ( (data !== "agreedToTerms" && user[data].trim() === "") || (data === "agreedToTerms" && user[data] === false)) {
                  toast.error(`${data} is required`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                  return false;
                }
              }
              return true;
      };
const PostData = async (e) => {
        e.preventDefault();
        if (!dataValidation()) return
        try {
          const response = await axios.post(`${SERVER_URL}/signup`, user);
          console.log(response);
          if (response.status === 201) {
                toast.success("Signup Successful", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                setTimeout(() => navigate("/signin"), 2000);
          } 
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      };
      
  return (
    <>
        <div className='my-container'>
        <form method="POST"  className='form-component'> 
        <h3 className='form-title'>Signup Form</h3>
            <input className='form-control' placeholder="Enter Full Name"    type="text"    value={user.fullName}    onChange={handleInputs}    name="fullName"/>
            <input className='form-control' onChange={handleInputs}  placeholder="Enter Mail" type="text" value={user.email} name="email"/>
            <input className='form-control' onChange={handleInputs}  placeholder="Enter Password" type="password" value={user.password} name="password"/>
            <select className='form-select' name='role' onChange={handleInputs} value={user.role || ""}>
            <option value="none"  selected  hidden>Select your account type</option>
            <option value="User">User</option>
            <option value="Contributor">Contributor</option>
          </select>
          <div className='d-flex flex-row gap-3'><input type='checkbox' className='form-check-input' defaultChecked={user.agreedToTerms} name='agreedToTerms'onChange={(e) =>setUser({...user,agreedToTerms: e.target.checked})}/><label>I accept the terms and conditions</label></div>
          <button className='my-button ' onClick={PostData}>Submit</button>
        </form>
    </div>
<ToastContainer/>
    </>
  )
}

export default Signup