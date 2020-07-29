import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Loading from '../../assets/Loading';
import Alert from '../../assets/Alert';
import Refresh from '../../assets/Refresh';
import ArrowBack from '../../assets/ArrowBack';
import './css/artist_infos.css';

export default function ArtistInfo(props) {
    const url = "http://localhost:8000/";

    const [artist, setArtist] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const artistName = props.match.params.name;

    useEffect(() => {
        fetch(url + 'artist/name/' + artistName)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'OK') {
                    setArtist(res.artist);
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
    }, [artistName]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (null)}
            {artist !== '' ? (
                <Grid container
                    justify='center'
                    direction='row'>
                    <Grid item xs={5}>
                        <ArrowBack />
                        <div className='artist-infos-container'>
                            <h1 className='title txt-red'>{artist.name}</h1>
                            <p className='artist-description'>
                                {artist.description}
                            </p>
                            <h6 className='artist-albums'>Album(s)</h6>
                            {artist.albums.length > 0 ? (
                                artist.albums.map((album, i) =>
                                    <Link key={i} className='artist-album-link' to={'/album/' + album.id}>
                                        <p className='artist-album-link-text'>
                                            {album.name}
                                        </p>
                                    </Link>
                                )
                            ) : (
                                    <p className='no-album'>No album registered.</p>
                                )
                            }
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <img src={artist.photo}
                            alt={artist.name}
                            title={artist.name}
                            className='artist-photo' />
                        <p className='artist-bio'>
                            <span className='first-letter'>{artist.bio.charAt(0)}</span>{artist.bio.slice(1)}
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
                            <h1 className='title not-found'>{artistName} was not found.</h1>
                        </Grid>
                        <ArrowBack />
                    </Grid>
                )
            }
        </>
    )
}