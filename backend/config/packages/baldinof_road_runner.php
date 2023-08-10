<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ExceptionInterface;

return static function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->extension('baldinof_road_runner', [
        'kernel_reboot' => [
            'strategy' => 'on_exception',
            'allowed_exceptions' => [
                HttpExceptionInterface::class,
                'Symfony\Component\Serializer\Exception\ExceptionInterface',
                ExceptionInterface::class,
            ],
        ],
        'metrics' => [
            'enabled' => false,
        ],
    ]);
};
