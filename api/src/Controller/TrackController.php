<?php

namespace App\Controller;

use App\Entity\Track;
use App\Entity\Album;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TrackController extends AbstractController
{
    /**
     * @Route("/track/add", name="track_add")
     * POST / Add a track
     */
    public function trackAdd(ValidatorInterface $validator, Request $request)
    {
        $post = json_decode($request->getContent(), true);

        $album = isset($post['album']) ? $post['album'] : '';
        $em = $this->getDoctrine()->getRepository(Album::class);
        $album = $em->findOneBy(['id' => $album]);

        $name = isset($post['name']) ? $post['name'] : '';
        $track_no = isset($post['track_no']) ? intval($post['track_no']) : '';

        $trackEm = $this->getDoctrine()->getRepository(Track::class);
        if ($album) {
            $trackExists = $trackEm->findBy([
                'album' => $album,
                'track_no' => $track_no
            ]);
        }

        if (isset($trackExists) && !empty($trackExists)) {
            $errorTrackNo = "Track number $track_no has already been taken.";
        }

        if (isset($errorTrackNo)) {
            return $this->json([
                'status' => 'ERROR',
                'errors' => [
                    'track_no' => [
                        0 => $errorTrackNo
                    ]
                ]
            ]);
        }

        $track = new Track();
        if ($album) {
            $track->setAlbum($album);
        }
        $track->setName($name);
        $track->setTrackNo($track_no);

        $errors = $validator->validate($track);

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
        $em->persist($track);
        $em->flush();

        return $this->json([
            'status' => 'OK',
            'message' => 'Track has been added',
        ]);
    }
}
