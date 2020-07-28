import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import './css/header.css';

export default function Header() {

    let location = useLocation();
    let current = location.pathname;

    return (
        <Grid
            container
            direction='row'
            justify='space-evenly'
            id='header'>
            <Link className={`header-link ${current.includes('artist') ? 'active' : ''}`} to='/artists'>Artists</Link>
            <Link className={`header-link ${current.includes('album') ? 'active' : ''}`} to='/albums'>Albums</Link>
            <Link className={`header-link ${current.includes('genre') ? 'active' : ''}`} to='/genres'>Genres</Link>
        </Grid >
    )
}
