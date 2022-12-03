import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { LinearProgress } from '@mui/material'

export default function FeatureItems(props) {
    return (
        <Grid2 xs={5}>
            <h4 style={{ color: '#ffffff' }}>{props.title}</h4>
            <LinearProgress
                variant="determinate"
                value={String(props.data).slice(2, 4)}
                sx={{
                    height: 10,
                    width: '50%',
                    borderRadius: 5,
                    backgroundColor: '#3d4554',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#7F00FF'
                    },
                }}
            />
            <h4 style={{ color: '#3d4554' }}>{props.description}</h4>
        </Grid2 >
    )
}
