<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (Symfony\Config\FrameworkConfig $frameworkConfig, ContainerConfigurator $containerConfigurator): void {
    $frameworkConfig->router()->utf8(true);

    if ('prod' === $containerConfigurator->env()) {
        $frameworkConfig->router()->strictRequirements(false);
    }
};
