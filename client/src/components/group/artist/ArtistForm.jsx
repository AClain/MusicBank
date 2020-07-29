import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Refresh from '../../assets/Refresh';
import Alert from '../../assets/Alert';
import Back from '../../assets/ArrowBack';
import './css/artist_form.css';

export default function ArtistForm() {
    const [artist, setArtist] = useState({
        name: '',
        bio: '',
        description: '',
        photo: ''
    });

    const [error, setError] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const url = "http://localhost:8000/";

    const handleInput = (e) => {
        setArtist({
            ...artist,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }

    const submitArtist = (e) => {
        const data = {
            name: artist['name'],
            bio: artist['bio'],
            description: artist['description'],
            photo: artist['photo'],
        };
        fetch(
            url + "artist/add",
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
            ) : null
            }
            <Grid item xs={4}>
                <Back to='/artists' />
                <h1 className='title txt-red'>Add an artist</h1>
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
                    {/* Artist image */}
                    <p className='form-title'>Artist image</p>
                    <input
                        onInput={e => { handleInput(e) }}
                        type='text' name='photo'
                        className='text-input' />
                    {errors['photo'] !== undefined ? (
                        <p className='form-error'>{errors['photo'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    {/* Bio */}
                    <p className='form-title'>Bio</p>
                    <textarea
                        id='artist-description'
                        onInput={e => { handleInput(e) }}
                        type='text' name='description'
                        className='text-input'></textarea>
                    {errors['description'] !== undefined ? (
                        <p className='form-error'>{errors['description'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    {/* Descrition */}
                    <p className='form-title'>Description</p>
                    <textarea
                        id='artist-bio'
                        onInput={e => { handleInput(e) }}
                        type='text' name='bio'
                        className='text-input'></textarea>
                    {errors['bio'] !== undefined ? (
                        <p className='form-error'>{errors['bio'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={(e) => { submitArtist(e) }}
                        variant="contained"
                        color="secondary"
                        className=''
                        startIcon={<AddIcon />}>
                        Add
                    </Button>
                </Grid>
            </Grid>


        </Grid >
    )
}