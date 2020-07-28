import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import Loading from '../../assets/Loading';
import Back from '../../assets/ArrowBack';
import './css/album_infos.css';

export default function AlbumInfo(props) {
    const url = "http://localhost:8000/";

    const [album, setAlbum] = useState([]);
    const [loading, setLoading] = useState(true);

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
            });
        return () => { };
    }, [albumId]);

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                        <Grid container
                            justify='center' direction='row'>
                            <Grid item xs={5} className='left-container'>
                                <Back />
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
                                    <Link to={`/track/add/${album.name}`}>
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
                    )
            }
        </>
    )
}