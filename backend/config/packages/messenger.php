<?php

declare(strict_types=1);

use App\Message\Test;
use Symfony\Config\FrameworkConfig;

use function Symfony\Component\DependencyInjection\Loader\Configurator\env;

return static function (FrameworkConfig $framework): void {
    $messenger = $framework->messenger();
    $messenger
        ->transport('failed')
        ->dsn(env('MESSENGER_TRANSPORT_DSN').'/failed?auto_setup=true');
    $messenger->failureTransport('failed');

    $messenger
        ->transport('async')
        ->dsn(env('MESSENGER_TRANSPORT_DSN').'/async?auto_setup=true');

    $messenger->routing(Test::class)->senders(['async']);
};
