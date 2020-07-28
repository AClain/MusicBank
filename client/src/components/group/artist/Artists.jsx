import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


import ArtistCard from './ArtistCard';

import Alert from '../../assets/Alert'
import Refresh from '../../assets/Refresh';
import Loading from '../../assets/Loading';

import './css/artists.css';

import { paginate } from '../../../assets/js/paginate';

export default function Artists(props) {
    const [artists, setArtists] = useState([]);
    const [max, setMax] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    let url = window.location.href.replace(props.location.search, "");

    const queryString = require('query-string');

    const parsed = queryString.parse(props.location.search);

    const page = parsed.page > 0 ? parsed.page : 1;
    const limit = parsed.limit > 0 ? parsed.limit : 25;

    useEffect(() => {
        const url = "http://localhost:8000/";
        fetch(
            url + "artists?page=" + page + "&limit=" + limit,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((res) => {
                if (res.status === 'OK') {
                    setArtists(res.artists);
                    setMax(res.max);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
                setLoading(false);
            }, (err) => {
                console.log(err);
                setError('Error: can\'t connect to the server.');
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
        return () => {

        };
    }, [limit, page]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (null)}
            {artists.length > 0 ? (
                <>
                    <Grid container
                        justify='space-evenly'
                        alignItems='center'
                        className='artist-container'>
                        {artists.map((artist, i) =>
                            <Grid key={i} item xs={2} style={{ margin: '0px 15px' }}>
                                <ArtistCard artist={artist} />
                            </Grid>
                        )}

                    </Grid>
                    <Grid container
                        justify='center'
                        alignItems='center'>
                        <Link to='/artist/add'>
                            <Button
                                id='add-artist-button'
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}>
                                Add an artist
                                </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} className='paginate-container'>
                        {paginate(url, page, max)}
                    </Grid>
                </>
            ) : (
                    <Grid container
                        justify='space-around'
                        alignItems='center'>
                        {error !== '' ? (
                            <Alert type='danger' clickAction={setError}>
                                {error}
                                <Refresh />
                            </Alert>
                        ) : null}
                        <Grid item xs={12}>
                            <h1 className='not-found'>Result : 0</h1>
                        </Grid>
                        <Link to='/artist/add'>
                            <Button
                                id='add-artist-button'
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}>
                                Add an artist
                            </Button>
                        </Link>
                    </Grid>
                )}
        </>
    )
}
