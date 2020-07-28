<?php

namespace App\Controller;

use App\Entity\Artist;
use App\Repository\AlbumRepository;
use App\Repository\ArtistRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ArtistController extends AbstractController
{
    /**
     * @Route("/artist/add", name="artist_add")
     * POST / Add an artist
     */
    public function artistAdd(ValidatorInterface $validator, Request $request)
    {
        $post = json_decode($request->getContent(), true);

        $name = isset($post['name']) ? $post['name'] : '';
        $description = isset($post['description']) ? $post['description'] : '';
        $bio = isset($post['bio']) ? $post['bio'] : '';
        $photo = isset($post['photo']) ? $post['photo'] : '';

        $artist = new Artist();
        $artist->setName($name);
        $artist->setDescription($description);
        $artist->setBio($bio);
        $artist->setPhoto($photo);

        $errors = $validator->validate($artist);

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

        $em = $this->getDoctrine()->getManager();
        $em->persist($artist);
        $em->flush();

        return $this->json([
            'status' => 'OK',
            'message' => "Artist '" . $artist->getName() . "' has been added."
        ]);
    }

    /**
     * @Route("/artist/name/{name}", name="artist_name")
     * GET / Get an artist by name
     */
    public function artistName($name, AlbumRepository $albumRepository)
    {
        $artist = $this->getDoctrine()
            ->getRepository(Artist::class)
            ->findOneBy(['name' => $name]);

        $albums = $albumRepository->findBy(['artist' => $artist]);

        if (!$artist) {
            return $this->json([
                'status' => 'ERROR',
                'message' => 'Artist not found.'
            ]);
        }

        $albumsArray = [];

        if (sizeof($albums) > 0) {
            foreach ($albums as $album) {
                array_push($albumsArray, [
                    'name' => $album->getName(),
                    'id' => $album->getId()
                ]);
            }
        }

        return $this->json([
            'status' => 'OK',
            'artist' => [
                'name' => $artist->getName(),
                'description' => $artist->getDescription(),
                'bio' => $artist->getBio(),
                'photo' => $artist->getPhoto(),
                'albums' => $albumsArray
            ]
        ]);
    }


    /**
     * @Route("/artists", name="artist_list")
     * GET / Get all artist
     */
    public function artistList()
    {
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 25;
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $offset = $page > 1 ? (($page - 1) * $limit) : null;

        $em = $this->getDoctrine()->getRepository(Artist::class);
        $artists = $em->findBy([], null, $limit, $offset);

        $artistsArray = [];

        for ($i = 0; $i < sizeof($artists); $i++) {
            $artistsArray[$i] = [];
            $artistsArray[$i]['id'] = $artists[$i]->getId();
            $artistsArray[$i]['name'] = $artists[$i]->getName();
            $artistsArray[$i]['description'] = $artists[$i]->getDescription();
            $artistsArray[$i]['bio'] = $artists[$i]->getBio();
            $artistsArray[$i]['photo'] = $artists[$i]->getPhoto();
        }

        $max = ceil(sizeof($artistsArray) / $limit);

        return $this->json([
            'status' => 'OK',
            'artists' => $artistsArray,
            'max' => $max
        ]);
    }

    /**
     * @Route("/artist/search/{search}", name="artist_search")
     * GET / Get artist with name containing {search}
     */
    public function artistSearch($search, ArtistRepository $artistRepository)
    {
        $artists = $artistRepository->findBySearch($search);

        $artistsArray = [];

        foreach ($artists as $artist) {
            $artistsArray[] .= $artist->getName();
        };

        return $this->json([
            'status' => 'OK',
            'search' => $search,
            'artists' => $artistsArray
        ]);
    }
}
