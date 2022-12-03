import React from 'react'
import { Grid } from '@mui/material'
import '../styles/GridItem.style.css'

export default function GridItem(props) {
    return (
        <Grid item xs={6} style={{ marginLeft: '0.5em' }}>
            <h4 style={{ color: '#7F00FF' }}>{props.title}</h4>
            <div>
                <div style={{ color: '#ffffff' }}>{props.data}</div>
            </div>
        </Grid>
    )
}
