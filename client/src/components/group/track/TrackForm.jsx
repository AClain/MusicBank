import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Back from '../../assets/ArrowBack';

export default function AlbumForm(props) {
    const albumName = props.match.params.name;

    const [track, setTrack] = useState({
        album: albumName,
        name: '',
        track_no: ''
    });

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const url = "http://localhost:8000/";

    const handleInput = (e) => {
        setTrack({
            ...track,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }

    const submitTrack = (e) => {
        const data = {
            album: track['album'],
            name: track['name'],
            track_no: track['track_no']
        };
        console.log(data);
        fetch(
            url + "track/add",
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
                setErrors([]);
                setSuccess(res.message);
                setTimeout(() => {
                    if (typeof document.getElementById('alert-success') !== null) {
                        document.getElementById('alert-success').classList.remove('fadeInTop');
                        document.getElementById('alert-success').classList.add('fadeOutTop');
                    }
                }, 3500)
                setTimeout(() => {
                    setSuccess('');
                }, 4500)
                return true;
            });
    }

    return (
        <Grid container
            justify='center' direction='row'
            alignContent='center'>
            {success !== "" ? (
                <span
                    id='alert-success'
                    className='alert-success fadeInTop'>
                    {success}
                </span>
            ) : null}
            <Grid item xs={4}>
                <Back />
                <h1 className='title txt-red'>Add a track</h1>
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
                    {/* Track number */}
                    <p className='form-title'>Track number</p>
                    <input
                        onChange={e => { handleInput(e) }}
                        type='text' name='track_no'
                        className='text-input' />
                    {errors['track_no'] !== undefined ? (
                        <p className='form-error'>{errors['track_no'][0]}</p>
                    ) : null}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={(e) => { submitTrack(e) }}
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