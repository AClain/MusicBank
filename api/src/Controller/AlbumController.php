<?php

namespace App\Controller;

use App\Entity\Album;
use App\Entity\Artist;
use App\Entity\GenreAlbum;
use App\Entity\Genre;
use App\Entity\Track;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AlbumController extends AbstractController
{
    /**
     * @Route("/album/add", name="album_add")
     * POST / Add an album
     */
    public function albumAdd(ValidatorInterface $validator, Request $request)
    {
        $post = json_decode($request->getContent(), true);

        $artist = isset($post['artist']) ? $post['artist'] : '';
        $em = $this->getDoctrine()->getRepository(Artist::class);
        $artist = $em->findBy(['name' => $artist]);

        $name = isset($post['name']) ? $post['name'] : '';
        $description = isset($post['description']) ? $post['description'] : '';
        $cover = isset($post['cover']) ? $post['cover'] : '';
        $cover_small = isset($post['cover_small']) ? $post['cover_small'] : '';
        $release_date = isset($post['release_date']) ? $post['release_date'] : '';

        $album = new Album();
        if ($artist) {
            $album->setArtist($artist[0]);
        }
        $album->setName($name);
        $album->setDescription($description);
        $album->setCover($cover);
        $album->setCoverSmall($cover_small);
        $album->setReleaseDate($release_date);

        $errors = $validator->validate($album);

        if (count($errors) > 0) {

            $messages = [];

            foreach ($errors as $violation) {
                $messages[$violation->getPropertyPath()][] = $violation->getMessage();
            }

            return $this->json([
                'status' => 'ERROR',
                'errors' => $messages
            ]);
        }

        $genre_list = isset($post['genres']) ? $post['genres'] : [];

        $em = $this->getDoctrine()->getManager();
        if (!empty($genre_list)) {
            $genreEm = $this->getDoctrine()->getRepository(Genre::class);
            $errors = [];
            foreach ($genre_list as $genre_name) {
                if ($genre_list[0] === $genre_list[1]) {
                    continue;
                }
                $genre = $genreEm->findOneBy(['name' => $genre_name]);
                if ($genre) {
                    $genre_album = new GenreAlbum();
                    $genre_album->setAlbum($album);
                    $genre_album->setGenre($genre);
                    $em->persist($genre_album);
                    continue;
                }
                $errors[] = "Genre '$genre_name' is not a valid genre.";
            }
        }

        if (count($errors) > 0) {
            $messages = [];

            foreach ($errors as $error) {
                $messages['genre_list'][] = $error;
            }

            return $this->json([
                'status' => 'ERROR',
                'message' => $messages
            ]);
        }

        $em->persist($album);
        $em->flush();

        return $this->json([
            'status' => 'OK',
            'message' => "Album '" . $album->getName() . "' by " . $artist[0]->getName() . " has been added."
        ]);
    }

    /**
     * @Route("/album/{id}", name="album_id")
     * GET / Get an album by id
     */
    public function albumId($id)
    {
        $album = $this->getDoctrine()
            ->getRepository(Album::class)
            ->find(['id' => $id]);

        if (!$album) {
            return $this->json([
                'status' => 'ERROR',
                'message' => 'Album not found.'
            ]);
        }

        $albumArray = [];
        $albumArray['id'] = $album->getId();
        $albumArray['name'] = $album->getName();
        $albumArray['description'] = $album->getDescription();
        $albumArray['artist'] = $album->getArtist()->getName();
        $albumArray['cover'] = $album->getCover();
        $albumArray['cover_small'] = $album->getCoverSmall();
        $albumArray['release_date'] = $album->getReleaseDate();

        $album_genres = $this->getAlbumGenres($album->getId());
        $albumArray['genres'] = $album_genres;

        $album_tracks = $this->getAlbumTracks($album->getId());
        $albumArray['tracks'] = $album_tracks;

        return $this->json([
            'status' => 'OK',
            'album' => $albumArray
        ]);
    }

    /**
     * @Route("/albums", name="album_list")
     * GET / Get all album
     */
    public function albumList()
    {
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 25;
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $offset = $page > 1 ? (($page - 1) * $limit) : null;

        $em = $this->getDoctrine()->getRepository(Album::class);
        $albums = $em->findBy([], null, $limit, $offset);

        $albumsArray = [];

        for ($i = 0; $i < sizeof($albums); $i++) {
            $albumsArray[$i] = [];
            $albumsArray[$i]['id'] = $albums[$i]->getId();
            $albumsArray[$i]['name'] = $albums[$i]->getName();
            $albumsArray[$i]['description'] = $albums[$i]->getDescription();
            $albumsArray[$i]['artist'] = $albums[$i]->getArtist()->getName();
            $albumsArray[$i]['cover'] = $albums[$i]->getCover();
            $albumsArray[$i]['cover_small'] = $albums[$i]->getCoverSmall();
            $albumsArray[$i]['release_date'] = $albums[$i]->getReleaseDate();
            $album_genres = $this->getAlbumGenres($albums[$i]->getId());
            $albumsArray[$i]['genres'] = $album_genres;
        }

        $allAlbum = $em->findAll();

        $max = ceil(sizeof($allAlbum) / $limit);
        if ((int)$max === $limit) {
            $max = $max + 1;
        }

        return $this->json([
            'status' => 'OK',
            'albums' => $albumsArray,
            'max' => $max
        ]);
    }

    public function getAlbumGenres($id)
    {
        $em = $this->getDoctrine()->getRepository(Album::class);
        $album = $em->find(['id' => $id]);

        if ($album) {
            $genreEm = $this->getDoctrine()->getRepository(GenreAlbum::class);
            $genres = $genreEm->findBy(['album' => $album]);
            $genre_list = [];
            foreach ($genres as $genre) {
                $genre_list[] = $genre->getGenre()->getName();
            }
            return $genre_list;
        }

        return 'This album has no genre.';
    }

    private function getAlbumTracks($id)
    {
        $em = $this->getDoctrine()->getRepository(Album::class);
        $album = $em->find(['id' => $id]);

        if ($album) {
            $trackEm = $this->getDoctrine()->getRepository(Track::class);
            $tracks = $trackEm->findBy(['album' => $album], ['track_no' => 'ASC']);
            $track_list = [];
            foreach ($tracks as $track) {
                $track_list[] = [
                    'name' => $track->getName(),
                    'track_no' => $track->getTrackNo()
                ];
            }
            return $track_list;
        }

        return 'This album has no track.';
    }

    /**
     * @Route("/album/{id}/genres", name="album_genres")
     * GET / Get genres from album id
     */
    public function albumGenres($id)
    {
        $em = $this->getDoctrine()->getRepository(Album::class);
        $album = $em->find(['id' => $id]);

        if ($album) {
            $genreEm = $this->getDoctrine()->getRepository(GenreAlbum::class);
            $genres = $genreEm->findBy(['album' => $album]);
            $genre_list = [];
            foreach ($genres as $genre) {
                $genre_list[] = $genre->getGenre()->getName();
            }
            return $this->json([
                'status' => 'OK',
                'genres' => $genre_list
            ]);
        }

        return $this->json([
            'status' => 'OK',
            'message' => 'This album has no genre.'
        ]);
    }
}
