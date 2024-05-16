import { useState } from 'react';
import { fetchSpotifyApi } from '../api/spotifyApi';

const Dashboard = () => {


    const getToken = async () => {
        // stored in the previous step
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        let codeVerifier = localStorage.getItem('code_verifier');
        console.log({ codeVerifier });
        const url = 'https://accounts.spotify.com/api/token';
        const clientId = 'your_client';
        const redirectUri = 'http://localhost:5173/';
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        };
        const body = await fetch(url, payload);
        const response = await body.json();
    
        localStorage.setItem('token', response.access_token);
    };

    // funcion para llamar al api de Spotify 
    const handleSearch = async () => {

        const params = new URLSearchParams();

        params.append('q', encodeURIComponent(`remaster track:${form.search} artist:${form.artist}`));
        params.append('type', option);

        const queryString = params.toString();
        const url = 'https://api.spotify.com/v1/search';

        const updateUrl = `${url}?${queryString}`;

        const token = `Bearer ${localStorage.getItem('token')}`

        const response = await fetchSpotifyApi(
            updateUrl,
            'GET',
            null,
            'application/json', 
            token,
        );
        console.log(response);

        setResults(response.tracks.items);
    }

    const getDeviceId = async () => {
        const token = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetchSpotifyApi(
            'https://api.spotify.com/v1/me/player/devices',
            'GET',
            null,
            'application/json',
            token
        );
        console.log(response)
        window.localStorage.setItem('idDevices',response.devices[0].id)
    }
    // hooks de react
    const [form , setForm] = useState({
       track:'',
       artist:''
    })

    const [option, setOption] = useState('')

    const [results, setResults] = useState([])

    // arreglo para el api
    const types = [
        "album", 
        "artist", 
        "playlist", 
        "track", 
        "show",
        "episode",
        "audiobook"
    ]

    const handleChange = (e)  =>{
        console.log(e.target.value)

        const newValues = {
            ...form,
            [e.target.name]: e.target.value,

        }
        setForm(newValues)

      //  handleSearch();
    }

    const handleSelectChange = (e) => {
        setOption(e.target.value)
    };

    const handlePlayMusic = async (song) => {
        const token = `Bearer ${localStorage.getItem('token')}`;
        const data = {
          uris: [song],
        };
    
        const id_device = `${localStorage.getItem('idDevices')}`;
    
        const playSong = await fetchSpotifyApi(
          `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
          'PUT',
          JSON.stringify(data),
          'application/json',
          token
        );
        console.log(playSong);
      };
    
    return (
        /* Title */
        /*  Parte de HTML */
        <div className="flex flex-col justify-center items-center m-4">  
            <label>DashBoard</label>
            <div className="m-16">
                <input 
                    name="Search Bar"
                    placeholder="Search Bar"
                    type="text"
                    onChange = {handleChange}
                    className=" 100 border"
                />
                <button
                    className = "25 border bg-blue-500"
                    onClick={handleSearch}>
                        Search
                </button>

            <select name="types" onChange={handleSelectChange}>
                {types.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <input
                name = "artist"
                type = "text"
                value = {form.artist}
                onChange = {handleChange}
                className ="100 border"
                placeholder = "Artist"

            />
            <button type="button" onClick={getToken}>GetToken</button>

            <button type="button" onClick={getDeviceId} className='20 border'>GetDeviceID</button>
            </div>

            {results.length > 0 &&  (
                    <div className="m-4">
                        {results.map((item, idx) => (
                            <div key={item.id} className="text-center">
                                {idx + 1 + '. ' + item.name}
                                <img src = {item.album.images[0].url} width='20%'/>
                                <button type="button" onClick={() => handlePlayMusic(item.uri)} className =" bg-green-600 rounded-xl w-16 h-8">Play</button>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default Dashboard