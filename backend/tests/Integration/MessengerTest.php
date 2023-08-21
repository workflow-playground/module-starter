<?php

namespace App\Tests\Integration;

use App\Message\Test;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Zenstruck\Messenger\Test\InteractsWithMessenger;

final class MessengerTest extends WebTestCase
{
    use InteractsWithMessenger;

    public function testDispatchesWithoutValue(): void
    {
        $client = self::createClient();
        $client->request('POST', '/_test/messenger');

        self::assertResponseIsSuccessful();
        self::assertSame('Hello World!', $client->getResponse()->getContent());

        $async = $this->transport('async')->queue();
        $async->assertContains(Test::class, 1);
        $test = $async->first();

        self::assertEquals(new Test('This is a test message'), $test->getMessage());
    }
}
