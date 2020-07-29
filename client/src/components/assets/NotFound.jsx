import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import './css/not_found.css';

const useStyles = makeStyles({
    icon: {
        fontSize: 65
    }
})

export default function NotFound() {

    const classes = useStyles();

    return (
        <Grid
            container
            justify='center'
            alignContent='center'
            id='not-found'>
            <AnnouncementIcon id='not-found-icon' className={classes.icon} htmlColor='#ff2244' />
            <h1 id='not-found-txt'>404: Not Found</h1>
        </Grid>
    )
}