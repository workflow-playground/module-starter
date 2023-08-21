<?php

declare(strict_types=1);

use App\Message\Test;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Config\FrameworkConfig;

use function Symfony\Component\DependencyInjection\Loader\Configurator\env;

return static function (FrameworkConfig $framework, ContainerConfigurator $container): void {
    $messenger = $framework->messenger();
    $messenger
        ->transport('failed')
        ->dsn(
            'test' === $container->env()
                ? 'test://'
                : env('MESSENGER_TRANSPORT_DSN_FAILED')
        );
    $messenger->failureTransport('failed');

    $messenger
        ->transport('async')
        ->dsn(
            'test' === $container->env()
                ? 'test://'
                : env('MESSENGER_TRANSPORT_DSN_ASYNC')
        );

    $messenger->routing(Test::class)->senders(['async']);
};
