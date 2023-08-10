<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (Symfony\Config\TwigConfig $twigConfig, ContainerConfigurator $containerConfigurator): void {
    $twigConfig->defaultPath('%kernel.project_dir%/templates');

    if ('test' === $containerConfigurator->env()) {
        $twigConfig->strictVariables(true);
    }
};
