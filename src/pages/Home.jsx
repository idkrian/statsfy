// import '../styles/Home.style.css'
import { useState, useEffect } from 'react';
import TopItems from './TopItems';
import { Link } from '@mui/material';

//Url Settings
const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID
const AUTH_ENDPOINT = import.meta.env.VITE_REACT_APP_AUTH_ENDPOINT
const REDIRECT_URI = import.meta.env.VITE_REACT_APP_REDIRECT_URI
const RESPONSE_TYPE = import.meta.env.VITE_REACT_APP_RESPONSE_TYPE
const SCOPE = import.meta.env.VITE_REACT_APP_SCOPE
const url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

export default function Home() {

    const [token, setToken] = useState('')

    const logout = () => {
        setToken('')
        window.localStorage.removeItem('token')
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem('token')

        if (!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]

            window.location.hash = ''
            window.localStorage.setItem('token', token)
        }
        setToken(token)

    }, [])

    return (
        <div className='App'>
            <h1 style={{ color: '#7F00FF' }}>
                Statsfy
            </h1>
            <div style={{ width: '100%' }}>
                {!token ?
                    <Link href={url}>
                        <button id="loginButton">
                            <p id="loginButtonTop">
                                Login
                            </p>
                        </button>
                    </Link>
                    :
                    <button onClick={logout} id="loginButton">
                        <span id="loginButtonTop">
                            Logout
                        </span>
                    </button>
                }
                {token &&
                    <>
                        <TopItems token={token} search='Tracks' />
                        <TopItems token={token} search='Artists' />
                    </>
                }
            </div>
        </div >
    );
}
