import { useState } from 'react';
import { fetchSpotifyApi } from '../api/spotifyApi';
import {useNavigate} from 'react-router-dom';
import { authFLow, getDataAuth } from '../setup';      

const Register = () => {
    
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();


    const handlechange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value);
        
        const newValues = {
            ...form,
            [e.target.name]: e.target.value,
        }

        console.log(newValues);
        setForm(newValues);
    }

    
    const handleLogin = async () => {
        const codeChallengeProm = await getDataAuth();
        authFLow(codeChallengeProm);
    }

    /*const handleLogin = async() => {
        const url =  'https://accounts.spotify.com/api/token'
        const body = 'grant_type=client_credentials'
        const token = 'Basic ' + btoa(client_id + ':' + secret_id)
        const response  = await fetchSpotifyApi(url,
        'Post',
        body,
        'application/x-www-form-urlencoded',
        token,

        );
        console.log(response)

        localStorage.setItem('token', response.access_token);
        
        navigate('/dashboard');
        console.log(response);
    }; */


    return (
        // The outer div is made into a flex container and centers its children both vertically and horizontally.
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black to-gray-800">
            <div className="flex flex-col items-center justify-center p-10  rounded-lg m-4 bg-sky-500">
                <div className="">
                    <label className="text-white">Sign In</label>
                </div>
                <div className="mt-4 mr-36">
                    <label className="text-white">Username</label>
                </div>
                <div className="mb-4 ">
                    <input 
                        name="username"
                        placehorder="username"
                        value={form.username}
                        type="text" 
                        onChange={handlechange}
                        className="mr-2 bg-blue 100 rounded" 
                    />
                </div>
                <div className="mt-4 mr-36">
                    <label className="text-white">Password</label>
                </div>

                <div className="">
                    <input type="text" className="mr-2 bg-blue-100 rounded " />
                </div>
                <div className="m-4 ">
                    <button  
                    onClick={handleLogin} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Register;
