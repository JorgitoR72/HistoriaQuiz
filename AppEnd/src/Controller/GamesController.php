<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Entity\Games;
use App\Entity\Typegame;
use App\Entity\User;

#[Route('api/games', name: 'app_games')]
class GamesController extends AbstractController
{
    #[Route('/shows', name: 'app_list_games', methods: ['GET'])]
    public function listGames(EntityManagerInterface $em): JsonResponse
    {
        $games = $em->getRepository(Games::class)->findAll();

        $data = [];
        foreach ($games as $game) {
            $data[] = [
                'id' => $game->getId(),
                'title' => $game->getTitle(),
                'description' => $game->getDescription(),
                'typegame' => $game->getTypegame(),
                'user_id' => $game->getUser()->getId(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/show/{id}', name: 'app_show_game', methods: ['GET'])]
    public function showGame(int $id, EntityManagerInterface $em): JsonResponse
    {
        $game = $em->getRepository(Games::class)->find($id);

        if (!$game) {
            return new JsonResponse(['status' => 'error', 'message' => 'Game not found1'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = [
            'id' => $game->getId(),
            'title' => $game->getTitle(),
            'description' => $game->getDescription(),
            'typegame' => $game->getTypegame(),
            'user_id' => $game->getUser()->getId(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/new', name: 'app_new_game', methods: ['POST'])]
    public function createGame(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $request = $this->transformJsonBody($request);

        $game = new Games();
        $game->setTitle($request->get('title'));
        $game->setDescription($request->get('description'));
        
        // Obtener el objeto Typegame
        $typegame = $em->getRepository(Typegame::class)->find($request->get('typegame'));
        $game->setTypegame($typegame);
        
        // Asumiendo que 'user_id' es una relación ManyToOne, también necesitas el objeto User
        $user = $em->getRepository(User::class)->find($request->get('user_id'));
        $game->setUser($user);

        $em->persist($game);
        $em->flush();

        return new JsonResponse(['status' => 'game_created']);
    }

    #[Route('/edit/{id}', name: 'app_edit_game', methods: ['PUT'])]
    public function editGame(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $request = $this->transformJsonBody($request);

        $game = $em->getRepository(Games::class)->find($id);

        if (!$game) {
            return new JsonResponse(['status' => 'error', 'message' => 'Game not found2'], JsonResponse::HTTP_NOT_FOUND);
        }

        $game->setTitle($request->get('title', $game->getTitle()));
        $game->setDescription($request->get('description', $game->getDescription()));
        $game->setTypegame($request->get('typegame', $game->getTypegame()));

        $em->flush();

        return new JsonResponse(['status' => 'game_updated']);
    }

    #[Route('/delete/{id}', name: 'app_delete_game', methods: ['DELETE'])]
    public function deleteGame(int $id, EntityManagerInterface $em): JsonResponse
    {
        $game = $em->getRepository(Games::class)->find($id);

        if (!$game) {
            return new JsonResponse(['status' => 'error', 'message' => 'Game not found3'], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($game);
        $em->flush();

        return new JsonResponse(['status' => 'game_deleted']);
    }

    #[Route('/typegame', name: 'app_typegame', methods: ['GET'])]
    public function typeGame(EntityManagerInterface $em): JsonResponse
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $em->getRepository(Typegame::class);
        $typeGames = $repository->findAll();

        // Convertir los objetos Users directamente a JSON
        $jsonContent = $serializer->serialize($typeGames, 'json');

        // Crear y devolver una JsonResponse
        return new JsonResponse($jsonContent, 200, ['status' => 'type_game'], true);
    }

    protected function transformJsonBody(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        } else if ($data === null) {
            return $request;
        }

        $request->request->replace($data);
        return $request;
    }
}
