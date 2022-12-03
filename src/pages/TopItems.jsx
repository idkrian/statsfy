import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../styles/TopItems.style.css'
import { Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

export default function TopSongs(props) {
    const token = props.token
    const search = props.search
    const [info, setInfo] = useState([])
    const [timeRange, setTimeRange] = useState('long_term')

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/me/top/${search.toLowerCase()}`, {
            params: {
                time_range: timeRange,
                limit: 10
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setInfo(res.data.items))
    }, [timeRange])

    return (
        <>
            <Container
                style={{
                    marginTop: '2em',
                }}
            >
                <div id="titleDiv">
                    <p style={{ color: '#7F00FF' }} >Most played {search}</p>
                    <div style={{ display: 'flex' }}>
                        <button onClick={() => setTimeRange('short_term')} style={{ margin: '0 1em' }} id='titleButton'>
                            4 weeks
                        </button>
                        <button onClick={() => setTimeRange('medium_term')} style={{ margin: '0 1em' }} id='titleButton'>
                            6 months
                        </button>
                        <button onClick={() => setTimeRange('long_term')} style={{ margin: '0 1em' }} id='titleButton'>
                            All time
                        </button>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1em'
                }}>
                    <div id='songsDiv'>
                        {info.map((data, index) =>
                            <Grid key={data?.id} container spacing={-38} columns={16}>
                                <Grid style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }} item xs={8}>
                                    <p id='songIndex'>{index + 1}</p>
                                </Grid>
                                <Grid item xs={8}>
                                    {search === 'Tracks' && (
                                        <Link to={`/track/${data.id}`} state={{ token: token, artistId: data.artists[0].id }} id='songTitle' style={{ cursor: 'pointer' }}> {data?.name}</Link>
                                    )}
                                    {search === 'Artists' && (
                                        <Link to={`/artist/${data?.id}`} state={{ token: token }} id='songTitle' style={{ cursor: 'pointer' }}> {data?.name}</Link>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </div>

                    <div id='imageDiv'>
                        {search === 'Tracks' && (
                            <img style={{ height: '500px', borderRadius: '10px' }} id='imageGradient' src={info[0]?.album.images[0].url} alt="" />
                        )}
                        {search === 'Artists' && (
                            <img style={{ height: '500px', borderRadius: '10px' }} id='imageGradient' src={info[0]?.images[0].url} alt="" />
                        )}
                    </div>
                </div>
            </Container>
        </>
    )
}
