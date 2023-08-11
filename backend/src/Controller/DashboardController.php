<?php

namespace App\Controller;

use App\Message\Test;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

final class DashboardController extends AbstractController
{
    #[Route('/', name: 'app_dashboard', methods: ['GET'])]
    public function __invoke(MessageBusInterface $messages): Response
    {
        $messages->dispatch(new Test('Hello World!'));

        return new Response('Hello World!');
    }
}
