<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

final class HealthCheckTest extends WebTestCase
{
    public function testReadiness(): void
    {
        $client = self::createClient();
        $client->request('GET', '/_internal/readiness');

        self::assertResponseIsSuccessful();
        self::assertResponseStatusCodeSame(Response::HTTP_NO_CONTENT);
    }
}
