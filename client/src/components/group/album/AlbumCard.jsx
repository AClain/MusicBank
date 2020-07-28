import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';

import './css/album_card.css';

const useStyles = makeStyles({
    card: {
        backgroundColor: 'transparent',
        transition: 'all 0.3s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
});

export default function AlbumCard(props) {
    const classes = useStyles();

    return (
        <>
            <Link className='album-card-link' to={`/album/${props.album.id}`}>
                <Card className={classes.card + ' card-hover'}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={props.album.cover_small}
                            title={props.album.name + ' cover'} />
                        <CardContent>
                            <h3 className='album-name'>
                                {props.album.name}
                            </h3>
                            <h5 className='album-artist'>
                                {props.album.artist}
                            </h5>
                            <div className='album-genres'>
                                <h6 className='album-genre-title'>Genres</h6>
                                {props.album.genres.map((genre, i) =>
                                    <span key={i} className='album-genre'>{genre}</span>
                                )}
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </>
    )
}