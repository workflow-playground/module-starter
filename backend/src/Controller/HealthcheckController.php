<?php

namespace App\Controller;

use Doctrine\DBAL\Connection;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Indicates whether the container is ready to respond to request.
 * If the readiness probe fails, the endpoints controller removes the Pod's IP address from the endpoints
 * of all Services that match the Pod.
 *
 * @see https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#types-of-probe
 */
final class HealthcheckController extends AbstractController
{
    /**
     * Indicates whether the container is ready to respond to requests.
     */
    #[Route('_internal/readiness', name: 'app_readiness', methods: ['GET'])]
    public function readiness(Connection $connection, LoggerInterface $logger): Response
    {
        try {
            $connection->executeQuery('SELECT 1');

            return new Response(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            $logger->warning($e);

            return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }
}
