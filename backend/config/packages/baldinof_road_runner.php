<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ExceptionInterface;

return static function (Symfony\Config\BaldinofRoadRunnerConfig $roadRunnerConfig, ContainerConfigurator $containerConfigurator): void {
    $roadRunnerConfig->kernelReboot()
        ->strategy('on_exception')
        ->allowedExceptions([
            HttpExceptionInterface::class,
            'Symfony\Component\Serializer\Exception\ExceptionInterface',
            ExceptionInterface::class,
        ]);
    $roadRunnerConfig->metrics()
        ->enabled(false);
};
