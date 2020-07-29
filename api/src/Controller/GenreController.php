<?php

namespace App\Controller;

use App\Entity\Genre;
use App\Entity\GenreAlbum;
use App\Repository\AlbumRepository;
use App\Repository\GenreAlbumRepository;
use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GenreController extends AbstractController
{
    /**
     * @Route("/genre/add", name="genre_add")
     * POST / Add new genre
     */
    public function genreAdd(ValidatorInterface $validator, Request $request)
    {
        $post = json_decode($request->getContent(), true);

        $name = isset($_POST['name']) ? $_POST['name'] : isset($post['name']) ? $post['name'] : '';

        $genre = new Genre();
        $genre->setName($name);

        $errors = $validator->validate($genre);

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
        $em->persist($genre);
        $em->flush();

        return $this->json([
            'status' => 'OK',
            'message' => 'Genre "' . $genre->getName() . '" has been added.',
        ]);
    }

    /**
     * @Route("/genre/{id}", name="genre_id")
     * GET / Get genre by id
     */
    public function genreId($id)
    {
        $genre = $this->getDoctrine()
            ->getRepository(Genre::class)
            ->find($id);

        if (!$genre) {
            return $this->json([
                'status' => 'ERROR',
                'message' => 'Genre not found.'
            ]);
        }

        return $this->json([
            'status' => 'OK',
            'album' => [
                'name' => $genre->getName(),
            ]
        ]);
    }

    /**
     * @Route("/genres", name="genre_list")
     * GET / Get all genre
     */
    public function genreList()
    {
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 25;
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $offset = $page > 1 ? (($page - 1) * $limit) : null;

        $em = $this->getDoctrine()->getRepository(Genre::class);
        $genres = $em->findBy([], ['name' => 'ASC'], $limit, $offset);
        $genresArray = [];

        for ($i = 0; $i < sizeof($genres); $i++) {
            $genresArray[$i] = [];
            $genresArray[$i]['id'] = $genres[$i]->getId();
            $genresArray[$i]['name'] = $genres[$i]->getName();
        }

        $max = ceil(sizeof($genresArray) / $limit);

        return $this->json([
            'status' => 'OK',
            'genres' => $genresArray,
            'max' => $max
        ]);
    }

    /**
     * @Route("/genre/search/{search}", name="genre_search")
     * GET / Get genre with name containing {search}
     */
    public function genreSearch($search, GenreRepository $genreRepository)
    {
        $genres = $genreRepository->findBySearch($search);

        $genresArray = [];

        foreach ($genres as $genre) {
            $genresArray[] .= $genre->getName();
        };

        return $this->json([
            'status' => 'OK',
            'search' => $search,
            'genres' => $genresArray
        ]);
    }
}
