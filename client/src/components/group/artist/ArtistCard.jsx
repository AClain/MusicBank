import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';

import './css/artist_card.css';

const useStyles = makeStyles({
    card: {
        backgroundColor: 'transparent',
        transition: 'all 0.3s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
});

export default function ArtistCard(props) {
    const classes = useStyles();

    return (
        <>
            <Link className='artist-card-link' to={`/artist/${props.artist.name}`}>
                <Card className={classes.card + ' card-hover'}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className='artist-img'
                            image={props.artist.photo}
                            title={props.artist.name}
                        />
                        <CardContent>
                            <h3 className='artist-name'>
                                {props.artist.name}
                            </h3>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </>
    )
}