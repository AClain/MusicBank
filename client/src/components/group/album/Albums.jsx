import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { paginate } from '../../../assets/js/paginate';

import Loading from '../../assets/Loading';
import AlbumCard from './AlbumCard';

import './css/albums.css';

export default function Albums(props) {

    const [albums, setAlbums] = useState([]);
    const [max, setMax] = useState(1);
    const [loading, setLoading] = useState(true);

    let url = window.location.href.replace(props.location.search, "");

    const queryString = require('query-string');

    const parsed = queryString.parse(props.location.search);

    const page = parsed.page > 0 ? parsed.page : 1;
    const limit = parsed.limit > 0 ? parsed.limit : 25;

    useEffect(() => {
        const url = "http://localhost:8000/";
        fetch(
            url + "albums?page=" + page + "&limit=" + limit,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                setAlbums(res.albums);
                setMax(res.max);
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
            ) : (
                    <>
                        <Grid container
                            justify='space-evenly'
                            alignItems='center'
                            className='album-container'>
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
                )
            }
        </>
    )
}
