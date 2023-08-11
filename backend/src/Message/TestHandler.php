<?php

namespace App\Message;

use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final readonly class TestHandler
{
    public function __construct(
        private LoggerInterface $logger
    ) {
    }

    public function __invoke(Test $message): void
    {
        $this->logger->debug($message->message);
    }
}
