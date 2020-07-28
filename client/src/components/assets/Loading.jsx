import React from 'react';

import { makeStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    loading: {
        marginTop: '200px',
        color: '#ff2244'
    }
})

export default function Loading() {
    const classes = useStyles();

    return (
        <Grid container justify='center' alignItems='center'>
            <CircularProgress
                className={classes.loading}
                size={100}
                thickness={2} />
        </Grid>
    )
}