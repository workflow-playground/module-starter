<?php

namespace App\Message;

use Symfony\Component\DependencyInjection\Attribute\Exclude;

/**
 * @psalm-immutable Messages should be immutable, so that they can be passed around without risk of modification
 *
 * @see config/messenger.php for routing configuration
 */
#[Exclude] // They should be excluded from the Service Container
final readonly class Test
{
    public function __construct(
        public string $message,
    ) {
    }
}
