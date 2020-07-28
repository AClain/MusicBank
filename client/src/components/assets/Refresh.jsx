import React from 'react';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles({
    reload: {
        color: '#f6f6f6',
        fontSize: 30
    },
});

export default function Refresh() {
    const classes = useStyles();

    const refresh = () => {
        window.location.reload(false);
    }

    return (
        <span onClick={() => refresh()} title='Refresh'>
            <IconButton>
                <ReplayIcon className={classes.reload} />
            </IconButton>
        </span>
    )
}