import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import AlbumCard from './AlbumCard';

import Loading from '../../assets/Loading';
import Alert from '../../assets/Alert';
import Refresh from '../../assets/Refresh';

import './css/albums.css';

import { paginate } from '../../../assets/js/paginate';

export default function Albums(props) {

    const [albums, setAlbums] = useState([]);
    const [max, setMax] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    let url = window.location.href.replace(props.location.search, "");

    const queryString = require('query-string');

    const parsed = queryString.parse(props.location.search);

    const page = parsed.page > 0 ? parsed.page : 1;
    const limit = parsed.limit > 0 ? parsed.limit : 25;
    const genre = parsed.genre !== '' ? parsed.genre : '';

    useEffect(() => {
        const url = "http://localhost:8000/albums";

        let parameters = "?page=" + page + "&limit=" + limit

        if (genre !== undefined) {
            parameters += "&genre=" + genre;
        }

        console.log(parameters);

        fetch(
            url + parameters,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((res) => {
                setAlbums(res.albums);
                setMax(res.max);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }, (err) => {
                console.log(err);
                setError('Error: can\'t connect to the server.');
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
        return () => { };
    }, [limit, page]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (null)}
            {albums.length > 0 ? (
                <>
                    <Grid container
                        justify='space-evenly'
                        alignItems='center'
                        className='album-container'>
                        {genre !== undefined ? (
                            <Grid item xs={12} id='genre-name'>
                                <h1 className='title'>Genre: {genre}</h1>
                            </Grid>
                        ) : (null)}
                        {albums.map((album, i) =>
                            <Grid key={i} item xs={2} style={{ margin: '0px 15px' }}>
                                <AlbumCard album={album} />
                            </Grid>
                        )}

                    </Grid>
                    <Grid container
                        justify='center'
                        alignItems='center'>
                        <Link to='/album/add'>
                            <Button
                                id='add-album-button'
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}>
                                Add an album
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
                        {genre !== undefined ? (
                            <Grid item xs={12} id='genre-name'>
                                <h1 className='title'>Genre: {genre}</h1>
                            </Grid>
                        ) : (null)}
                        <Grid item xs={12}>
                            <h1 className='title not-found'>Result : 0</h1>
                        </Grid>
                        <Link to='/album/add'>
                            <Button
                                id='add-album-button'
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}>
                                Add an album
                            </Button>
                        </Link>
                    </Grid>
                )

            }

        </>
    )
}
