import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { Link, useLocation } from 'react-router-dom';

import Alert from '../../assets/Alert';
import Refresh from '../../assets/Refresh';
import Loading from '../../assets/Loading';

import './css/genres.css';

import { paginate } from '../../../assets/js/paginate';

export default function Genres() {
    const location = useLocation();
    const [genres, setGenres] = useState([]);
    const [max, setMax] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    let url = window.location.href.replace(location.search, "");

    const queryString = require('query-string');

    const parsed = queryString.parse(location.search);

    const page = parsed.page > 0 ? parsed.page : 1;

    useEffect(() => {
        const url = "http://localhost:8000/";
        fetch(
            url + "genres?page=" + page,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((res) => {
                setGenres(res.genres);
                setMax(res.max);
                setTimeout(() => {
                    setLoading(false);
                }, 500)
            }, (err) => {
                console.log(err);
                setError('Error: can\'t connect to the server.');
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
        return () => {

        };
    }, [page]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (null)}
            {genres.length > 0 ? (
                <Grid container justify='center' alignItems='center'>
                    <Grid item xs={6} id='genres-container'>
                        {genres.map((genre, i) => (
                            <p key={i}>
                                <a href={'/albums/?genre=' + genre.name} className='genre-link'>
                                    {genre.name}
                                </a>
                            </p>
                        ))}
                        <p>
                            <Link to='/genre/add'>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className=''
                                    startIcon={<AddIcon />}>
                                    Add a genre
                                    </Button>
                            </Link>
                        </p>
                    </Grid>
                    <Grid xs={12} className='paginate-container'>
                        {paginate(url, page, max)}
                    </Grid>
                </Grid>
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
                            <h1 className='title not-found'>Result : 0</h1>
                        </Grid>
                        <Link to='/genre/add'>
                            <Button
                                id='add-genre-button'
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}>
                                Add an genre
                            </Button>
                        </Link>
                    </Grid>
                )}
        </>
    )
}
