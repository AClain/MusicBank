import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { Link, useLocation } from 'react-router-dom';

import Loading from '../../assets/Loading';
import { paginate } from '../../../assets/js/paginate';

import './css/genres.css';

export default function Genres(props) {
    const location = useLocation();
    const [genres, setGenres] = useState([]);
    const [max, setMax] = useState(1);
    const [loading, setLoading] = useState(true);

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
            },
                (error) => {
                    console.log(error);
                    setLoading(false);
                });
        return () => {

        };
    }, [page]);

    return (
        <Grid container justify='center' alignItems='center'>
            {loading ? (
                <Loading />
            ) : (
                    <>
                        <Grid item xs={6} id='genres-container'>
                            {genres.map((genre, i) => (
                                <p key={i}>
                                    <a href={'/genre/' + genre.name} className='genre-link'>
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
                    </>
                )
            }
        </Grid>
    )
}
