import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Refresh from '../../assets/Refresh';
import Alert from '../../assets/Alert';
import Back from '../../assets/ArrowBack';

import './css/album_form.css';

export default function AlbumForm() {
    const [album, setAlbum] = useState({
        name: '',
        description: '',
        artist: '',
        release_date: '',
        cover: '',
        cover_small: '',
        genre_1: '',
        genre_2: ''
    });

    const [error, setError] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);

    const url = "http://localhost:8000/";

    const handleArtists = (e) => {
        fetch(url + 'artist/search/' + e.target.value)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'OK') {
                    setArtists(res.artists);
                    return true;
                }
                setArtists([]);
                return false;
            })
    }

    const handleGenres = (e) => {
        fetch(url + 'genre/search/' + e.target.value)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'OK') {
                    setGenres(res.genres);
                    return true;
                }
                setGenres([]);
                return false;
            })
    }

    const handleInput = (e) => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }

    const submitAlbum = (e) => {
        const genres = [album['genre_1'], album['genre_2']];
        const data = {
            artist: album['artist'],
            name: album['name'],
            description: album['description'],
            cover: album['cover'],
            cover_small: album['cover_small'],
            release_date: album['release_date'],
            genres: genres
        };
        console.log(data);
        fetch(
            url + "album/add",
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === "ERROR") {
                    setErrors(res.errors);
                    return false;
                }
                setSuccess(res.message);
                return true;
            }, (err) => {
                console.log(err);
                setError('Error: can\'t connect to the server.');
            });
    }

    return (
        <Grid container
            justify='center' direction='row'
            alignContent='center'>
            {error !== '' ? (
                <Alert type='danger' clickAction={setError}>
                    {error}
                    <Refresh />
                </Alert>
            ) : null}
            {success !== "" ? (
                <Alert clickAction={setSuccess} type='success' >
                    {success}
                </Alert>
            ) : null}
            <Grid item xs={4}>
                <Back to='/albums' />
                <h1 className='title txt-red'>Add an album</h1>
            </Grid>
            <Grid item container xs={7}>
                <Grid item xs={6}>
                    {/* Name */}
                    <p className='form-title'>Name</p>
                    <input
                        onInput={e => { handleInput(e) }}
                        type='text' name='name'
                        className='text-input' />
                    {errors['name'] !== undefined ? (
                        <p className='form-error'>{errors['name'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={6}>
                    {/* Artist */}
                    <p className='form-title'>Artist</p>
                    <input
                        onChange={e => { handleInput(e); handleArtists(e) }}
                        type='text' name='artist'
                        list='artist-list'
                        className='text-input' />
                    {errors['artist'] !== undefined ? (
                        <p className='form-error'>{errors['artist'][0]}</p>
                    ) : null}
                    <datalist id='artist-list'>
                        {artists.map((artist, i) =>
                            <option key={i} value={artist} />
                        )}
                    </datalist>
                </Grid>
                <Grid item xs={6}>
                    {/* Release date */}
                    <p className='form-title'>Release date</p>
                    <input
                        onInput={e => { handleInput(e) }}
                        type='date' name='release_date'
                        className='text-input' />
                    {errors['release_date'] !== undefined ? (
                        <p className='form-error'>{errors['release_date'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={6}>
                    {/* Cover link */}
                    <p className='form-title'>Large cover image</p>
                    <input
                        onInput={e => { handleInput(e) }}
                        type='text' name='cover'
                        className='text-input' />
                    {errors['cover'] !== undefined ? (
                        <p className='form-error'>{errors['cover'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={6}>
                    {/* Cover small link */}
                    <p className='form-title'>Small cover image</p>
                    <input
                        onInput={e => { handleInput(e) }}
                        type='text' name='cover_small'
                        className='text-input' />
                    {errors['cover_small'] !== undefined ? (
                        <p className='form-error'>{errors['cover_small'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                    {/* Genre principal */}
                    <p className='form-title'>Genre principal</p>
                    <input
                        onChange={e => { handleInput(e); handleGenres(e) }}
                        type='text' name='genre_1'
                        list='genre-list'
                        className='text-input' />
                </Grid>
                <Grid item xs={6}>
                    {/* Genre secondaire */}
                    <p className='form-title'>Genre secondaire</p>
                    <input
                        onChange={e => { handleInput(e); handleGenres(e) }}
                        type='text' name='genre_2'
                        list='genre-list'
                        className='text-input' />
                    {errors['genres'] !== undefined ? (
                        <p className='form-error'>{errors['genres'][0]}</p>
                    ) : null}
                    <datalist id='genre-list'>
                        {genres.map((genre, i) =>
                            <option key={i} value={genre} />
                        )}
                    </datalist>
                </Grid>
                <Grid item xs={12}>
                    {/* Descrition */}
                    <p className='form-title'>Description</p>
                    <textarea
                        id='album-description'
                        onInput={e => { handleInput(e) }}
                        type='text' name='description'
                        className='text-input'></textarea>
                    {errors['description'] !== undefined ? (
                        <p className='form-error'>{errors['description'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={(e) => { submitAlbum(e) }}
                        variant="contained"
                        color="secondary"
                        className=''
                        startIcon={<AddIcon />}>
                        Add
                    </Button>
                </Grid>
            </Grid>


        </Grid>
    )
}