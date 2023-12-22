import React, { useState, useEffect } from 'react';
import '../Styles/styles.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const WatchList = () => {
        const navigate = useNavigate()
    const [watchList, setWatchList] = useState([]);
    const token = Cookies.get('jwtoken');

    const getWatchList = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/getWatchList`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` },});
                console.log(response);
            if (response.status === 200) {
                const data = response.data;
                if(data) setWatchList(data.movies);
            }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
    };

    useEffect(() => {
        getWatchList();
    }, []);

    return (
        <>
        <div className='my-container'>
                {watchList && watchList.length > 0 ?
                <div className=''>
                {watchList && watchList.map((movie,idx) => (
                        <div key={idx} className='watch-list'>
                                <img className='watch-list-poster' src={movie.poster}/>
                                <div>
                                <p>Movie Name: {movie.name}</p>
                                <p>Year Of Release: {movie.yearOfRelease}</p>
                                <button className='btn btn-success btn-sm' onClick={() => navigate(`/displayMovie/${movie._id}`)}>View</button>
                                </div>
                        </div>
                ))}
                </div>
                :
                <div className=''>
                <p className='fs-2'>No Movies found. You can start adding.</p>
        </div>}
        </div>
        <ToastContainer/>
    </>
    );
};

export default WatchList;