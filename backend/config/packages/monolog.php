<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (Symfony\Config\MonologConfig $monologConfig, ContainerConfigurator $containerConfigurator): void {
    $monologConfig
        ->channels(['deprecation']);

    $monologConfig->handler('deprecation')
        ->type('stream')
        ->channels(['elements' => ['deprecation']]);

    $monologConfig->handler('main')
        ->type('fingers_crossed')
        ->actionLevel('error')
        ->handler('nested');

    $monologConfig->handler('nested')
        ->type('stream')
        ->path('php://stderr')
        ->level('debug');

    $monologConfig->handler('console')
        ->type('console')
        ->processPsr3Messages(false)
        ->channels(['elements' => ['!event', '!doctrine', '!console']])
    ;
};
