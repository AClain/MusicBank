# MusicBank

"MusicBank", actuelement proposé en anglais, est un service permettant de rechercher et ajouter des ressources musicales (artistes, albums, etc.).

## Lancer le service
```shell
$ cd api
$ composer install
$ php -s localhost:8000 -t public/
$ cd ../client
$ npm install
$ npm start
```

## Routes

##### /artists 
> Liste les artistes

##### /albums 
> Liste les albums

##### /genres 
> Liste les genres

##### /artist/add 
> Ajoute un artiste

##### /album/add 
> Ajoute un album

##### /genre/add 
> Ajoute un genre

##### /track/add/{album_id}
> Ajoute une piste sur un album

##### /artist/{artist_name} 
> Liste les informations d'un artiste

##### /album/{album_id} 
> Liste les information d'un album

## Technos
* ReactJS
* Material-UI
* Symfony 5

## Dépendances

* client/
  * [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
  * [Material-UI](https://github.com/mui-org/material-ui)
  * [query-string](https://github.com/sindresorhus/query-string)

* api/
  * [annotations](https://symfony.com/doc/current/routing.html#creating-routes-as-annotations)
  * [doctrine](https://symfony.com/doc/current/doctrine.html)
  * [validator](https://symfony.com/doc/current/components/validator.html)
  * [doctrine annotations](https://www.doctrine-project.org/projects/doctrine-annotations/en/1.10/index.html)
  * [cors-bundle](https://github.com/nelmio/NelmioCorsBundle)
