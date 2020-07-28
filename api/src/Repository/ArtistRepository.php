<?php

namespace App\Repository;

use App\Entity\Artist;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Artist|null find($id, $lockMode = null, $lockVersion = null)
 * @method Artist|null findOneBy(array $criteria, array $orderBy = null)
 * @method Artist[]    findAll()
 * @method Artist[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArtistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Artist::class);
    }

    /**
     * @return Artist[] Returns an array of Artist objects
     */
    public function findBySearch($search)
    {
        $qb = $this->createQueryBuilder('artist')
            ->where("artist.name LIKE :search")
            ->setParameter('search', $search . '%')
            ->orderBy('artist.name', 'ASC');

        $query = $qb->getQuery();

        return $query->execute();
    }
}
