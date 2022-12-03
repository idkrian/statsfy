import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../styles/Track.style.css'
import { Container } from '@mui/material'
import { useLocation } from 'react-router-dom'
import GridItem from '../components/GridItem';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import FeatureItems from '../components/FeatureItems';
import { Grid } from '@mui/material';

export default function Track() {
    let { id } = useParams();
    const location = useLocation()
    const { token, artistId } = location.state
    const [trackInfo, setTrackInfo] = useState(null)
    const [genre, setGenre] = useState(null)
    const [features, setFeatures] = useState('')

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setTrackInfo(res.data))

        axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setGenre(res.data.genres.map(x => <p>{x}</p>)))

        axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => setFeatures(res.data))
    }, [])


    return (
        <>
            {trackInfo &&
                <Container id='container'>
                    <div style={{
                        display: 'flex',
                    }}>
                        <div>
                            <img id='imageGradient2' src={trackInfo.album.images[0].url} alt="" />
                        </div>
                        <div>
                            <div id="titleDiv">
                                <p style={{ color: '#7F00FF' }}>Artist</p>
                            </div>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={3}
                                style={{ marginTop: '10px' }}
                            >
                                <GridItem title='Name' data={trackInfo.name} />
                                <GridItem title='Artist' data={trackInfo.artists[0].name} />
                                <GridItem title='Duration' data={new Date(trackInfo.duration_ms).toISOString().slice(14, 19)} />
                                <GridItem title='Release Date' data={new Date(trackInfo.album.release_date).toISOString().slice(0, 4)} />
                                <GridItem title='Genres' data={genre} />

                            </Grid>
                        </div >
                    </div>
                    <Grid2 container spacing={2} columns={{ xs: 10, sm: 10, md: 15 }} style={{ width: '100%' }}>
                        <FeatureItems title='Happines' description='Music that is happy and cheerful.' data={features.valence} />
                        <FeatureItems title='Acoustic' description='Music with no electric instruments.' data={features.acousticness} />
                        <FeatureItems title='Dance' description='Music that makes you want to move it' data={features.danceability} />
                        <FeatureItems title='Spoken' description='Music that contains mostly spoken words.' data={features.speechiness} />
                        <FeatureItems title='Instrumental' description='Music that contains no vocals.' data={features.instrumentalness} />
                        <FeatureItems title='Live' description='Music that is performed live.' data={features.liveness} />

                    </Grid2>
                </Container>
            }
        </>
    )
}
