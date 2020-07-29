import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import Loading from '../../assets/Loading';
import Alert from '../../assets/Alert';
import Refresh from '../../assets/Refresh';
import ArrowBack from '../../assets/ArrowBack';
import './css/album_infos.css';

export default function AlbumInfo(props) {
    const url = "http://localhost:8000/";

    const [album, setAlbum] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const albumId = props.match.params.id;

    useEffect(() => {
        fetch(url + 'album/' + albumId)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'OK') {
                    setAlbum(res.album);
                    setTimeout(() => {
                        setLoading(false);
                    }, 300);
                    return true;
                }
                setLoading(false);
                return false;
            }, (err) => {
                console.log(err);
                setError('Error: can\'t connect to the server.');
                setTimeout(() => {
                    setLoading(false);
                }, 500);
                return false;
            });
        return () => { };
    }, [albumId]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (null)}
            {album !== '' ? (
                <Grid container
                    justify='center' direction='row'>
                    <Grid item xs={5} className='left-container'>
                        <ArrowBack />
                        <div className='album-infos-container'>
                            <h1 className='title txt-red'>{album.name}</h1>
                            <Link className='link' to={'/artist/' + album.artist}>
                                <h4 className='sub-title txt-white artist-link'>
                                    {album.artist}
                                </h4>
                            </Link>
                            <h6 className='album-genres'>Genre(s)</h6>
                            {album.genres.map((genre, i) =>
                                <p
                                    className='album-genre'
                                    key={i}>
                                    {genre}
                                </p>
                            )}
                            <h6 className='album-tracks'>Track(s)</h6>
                            {album.tracks.map((track, i) =>
                                <p
                                    className='album-track'
                                    key={i}>
                                    {track.track_no + ' • ' + track.name}
                                </p>
                            )}
                            <Link to={`/track/add/${album.id}`}>
                                <Button
                                    id='add-album-button'
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<AddIcon />}>
                                    Add a track
                                        </Button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <img src={album.cover}
                            alt={album.name + ' cover'}
                            title={album.name + ' cover'}
                            className='album-cover' />
                        <p className='album-description'>
                            <span className='first-letter'>{album.description.charAt(0)}</span>{album.description.slice(1)}
                        </p>
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
                            <h1 className='title not-found'>Album was not found.</h1>
                        </Grid>
                        <ArrowBack />
                    </Grid>
                )
            }
        </>
    )
}