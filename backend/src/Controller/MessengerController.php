<?php

namespace App\Controller;

use App\Message\Test;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * This is an example controller which is used to te.
 */
#[Route('/_test/messenger', name: 'app_messenger', methods: ['GET', 'POST'], condition: "'prod' !== '%kernel.environment%'")]
final class MessengerController extends AbstractController
{
    public function __invoke(Request $request, MessageBusInterface $messages): Response
    {
        $messages->dispatch(new Test(
            'This is a test message'
        ));

        return new Response('Hello World!');
    }
}
