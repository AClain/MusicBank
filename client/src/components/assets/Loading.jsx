import React from 'react';

import { makeStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    loadingContainer: {
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#222831',
        textAlign: 'center',
        paddingTop: '200px'
    },
    loading: {
        color: '#ff2244'
    }
})

export default function Loading() {
    const classes = useStyles();

    return (
        <Grid
            container
            justify='center'
            alignContent='center'>
            <Grid item xs={12} className={classes.loadingContainer}>
                <CircularProgress
                    className={classes.loading}
                    size={100}
                    thickness={2} />
            </Grid>
        </Grid>
    )
}