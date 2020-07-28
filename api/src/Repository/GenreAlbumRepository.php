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

    // /**
    //  * @return GenreAlbum[] Returns an array of GenreAlbum objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GenreAlbum
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
