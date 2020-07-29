<?php

namespace App\Repository;

use App\Entity\GenreAlbum;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GenreAlbum|null find($id, $lockMode = null, $lockVersion = null)
 * @method GenreAlbum|null findOneBy(array $criteria, array $orderBy = null)
 * @method GenreAlbum[]    findAll()
 * @method GenreAlbum[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GenreAlbumRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GenreAlbum::class);
    }
}
