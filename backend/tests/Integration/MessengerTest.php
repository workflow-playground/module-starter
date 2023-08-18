<?php

namespace App\Tests\Integration;

use App\Message\Test;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Zenstruck\Messenger\Test\InteractsWithMessenger;

use function Psl\Json\encode;

final class MessengerTest extends WebTestCase
{
    use InteractsWithMessenger;

    public function testDispatches(): void
    {
        $client = self::createClient();
        $client->request(
            method: 'POST',
            uri: '/_test/messenger',
            content: encode(['message' => 'From within a test']),
        );

        self::assertResponseIsSuccessful();
        self::assertSame('Hello World!', $client->getResponse()->getContent());

        $async = $this->transport('async')->queue();
        $async->assertContains(Test::class, 1);
        $test = $async->first();

        self::assertEquals(new Test('From within a test'), $test->getMessage());
    }

    public function testDispatchesWithoutValue(): void
    {
        $client = self::createClient();
        $client->request(
            method: 'POST',
            uri: '/_test/messenger',
            content: '{}',
        );

        self::assertResponseIsSuccessful();
        self::assertSame('Hello World!', $client->getResponse()->getContent());

        $async = $this->transport('async')->queue();
        $async->assertContains(Test::class, 1);
        $test = $async->first();

        self::assertEquals(new Test('This is a test message'), $test->getMessage());
    }
}
