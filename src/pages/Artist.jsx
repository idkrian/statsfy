import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../styles/Track.style.css'
import { Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import GridItem from '../components/GridItem';

export default function Artist() {
    let { id } = useParams();
    const location = useLocation()
    const { token, artistId } = location.state
    const [artistInfo, setArtistInfo] = useState(null)
    const [artistTopTracks, setArtistTopTracks] = useState(null)
    const [artistAlbum, setArtistAlbum] = useState(null)

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setArtistInfo(res.data))
        axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            params: {
                market: 'US',
                limit: 8
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setArtistTopTracks(res.data.tracks))

        axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
            params: {
                'include_groups': 'album'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setArtistAlbum(res.data.items))

    }, [])

    console.log(artistAlbum)

    return (
        <>
            {artistInfo &&
                <Container id='container'>
                    <div style={{
                        display: 'flex',
                    }}>
                        <div>
                            <img id='imageGradient2' src={artistInfo.images[0].url} alt="" />
                        </div>
                        <div>
                            <div id="titleDiv">
                                <p style={{ color: '#7F00FF', marginLeft: "0.3em" }}>Artist</p>
                            </div>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={4}
                                style={{ marginTop: '10px' }}
                            >
                                <GridItem title='Name' data={artistInfo.name} />
                                <GridItem title='Followers' data={artistInfo.followers.total} />
                                <GridItem title='Genres' data={artistInfo.genres.map(x => <p>{x}</p>)} />
                            </Grid>
                        </div >
                    </div>

                    <div style={{ marginTop: '2em' }}>
                        <div>
                            <h2 style={{ color: '#7F00FF' }}>Top Tracks</h2>
                        </div>
                        {artistTopTracks &&
                            <Grid container spacing={2} columns={{ xs: 10, sm: 10, md: 15 }} style={{ width: '100%', marginTop: '0.5em' }}>
                                {
                                    artistTopTracks.map(data => (
                                        <Grid item xs={5} style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <img style={{ height: '50px' }} src={data.album.images[0].url} alt="" />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    marginLeft: '0.5em'
                                                }}
                                            >
                                                <div style={{ color: '#ffffff', fontWeight: 'bold' }}>{data.name}</div>
                                                <div style={{ color: '#ffffff' }}>{data.album.name}</div>
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        }
                    </div>
                    <div style={{ marginTop: '2em' }}>
                        <div>
                            <h2 style={{ color: '#7F00FF' }}>Albums</h2>
                        </div>
                        {artistAlbum &&
                            <Grid container spacing={2} columns={{ xs: 10, sm: 10, md: 15 }} style={{ width: '100%', marginTop: '0.5em' }}>
                                {
                                    artistAlbum.map(data => (
                                        <Grid item xs={5} style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <img style={{ height: '50px' }} src={data.images[0].url} alt="" />
                                            </div>
                                            <div
                                                style={{
                                                    marginLeft: '0.5em'
                                                }}
                                            >
                                                <div style={{ color: '#ffffff', fontWeight: 'bold', textOverflow: 'ellipsis' }}>{data.name}</div>
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        }
                    </div>
                </Container >

            }

        </>

    )
}
