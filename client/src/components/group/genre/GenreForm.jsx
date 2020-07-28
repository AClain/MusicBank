import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Back from '../../assets/ArrowBack';

export default function GenreForm() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const handleInput = (e) => {
        setName(e.target.value);
        setErrors([]);
    }

    const submitGenre = (e) => {
        const url = "http://localhost:8000/";
        const data = {
            name: name
        };
        fetch(
            url + "genre/add",
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === "ERROR") {
                    setErrors(res.errors);
                    return false;
                }
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
            justify='center'
            alignContent='center'>
            {success !== "" ? (
                <span
                    id='alert-success'
                    className='alert-success fadeInTop'>
                    {success}
                </span>
            ) : null}
            <Back to='/genres' />
            <Grid item xs={6} className='form-container'>
                <p className='form-title'>Name</p>
                <input
                    onInput={(e) => { handleInput(e) }}
                    type='text'
                    className='text-input'></input>
                {errors['name'] !== undefined ? (
                    <p className='form-error'>{errors['name'][0]}</p>
                ) : null}
                <Button
                    onClick={(e) => { submitGenre(e) }}
                    variant="contained"
                    color="secondary"
                    className=''
                    startIcon={<AddIcon />}>
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}