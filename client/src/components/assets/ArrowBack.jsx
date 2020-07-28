import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    arrow: {
        color: '#f6f6f6',
        fontSize: 40
    },
});

export default function Back(props) {
    const classes = useStyles();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <span onClick={() => goBack()} title='Back'>
            <IconButton>
                <ArrowBack className={classes.arrow} />
            </IconButton>
        </span>
    )
}