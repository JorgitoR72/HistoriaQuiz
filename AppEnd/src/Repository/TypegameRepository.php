<?php

namespace App\Repository;

use App\Entity\Typegame;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Typegame>
 *
 * @method Typegame|null find($id, $lockMode = null, $lockVersion = null)
 * @method Typegame|null findOneBy(array $criteria, array $orderBy = null)
 * @method Typegame[]    findAll()
 * @method Typegame[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypegameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Typegame::class);
    }

//    /**
//     * @return Typegame[] Returns an array of Typegame objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Typegame
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
