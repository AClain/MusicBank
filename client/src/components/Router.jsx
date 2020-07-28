import React from 'react';
import {
    BrowserRouter as ReactRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Header from './Header';

import ArtistInfo from './group/artist/ArtistInfo';
import ArtistForm from './group/artist/ArtistForm';
import Artists from './group/artist/Artists';

import Albums from './group/album/Albums';
import AlbumForm from './group/album/AlbumForm';
import AlbumInfo from './group/album/AlbumInfo';

import Genres from './group/genre/Genres';
import GenreForm from './group/genre/GenreForm';

import TrackForm from './group/track/TrackForm';

export default function Router() {

    return (
        <ReactRouter>
            <Header />
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/albums'></Redirect>
                </Route>

                <Route path='/artists' component={Artists} exact />
                <Route path='/artist/add' component={ArtistForm} exact />
                <Route path='/artist/:name' component={ArtistInfo} exact />

                <Route path='/albums' component={Albums} exact />
                <Route path='/album/add' component={AlbumForm} exact />
                <Route path='/album/:id' component={AlbumInfo} exact />


                <Route path='/genres' component={Genres} exact />
                <Route path='/genre/add' component={GenreForm} exact />

                <Route path='/track/add/:name' component={TrackForm} exact />
            </Switch>
        </ReactRouter>
    );
}
