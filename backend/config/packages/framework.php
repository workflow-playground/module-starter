<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (Symfony\Config\FrameworkConfig $frameworkConfig, ContainerConfigurator $containerConfigurator): void {
    $frameworkConfig->secret('%env(APP_SECRET)%')
    ->httpMethodOverride(false)
        ->handleAllThrowables(true);

    $frameworkConfig->session()
        ->handlerId(null)
        ->cookieSecure('auto')
        ->cookieSamesite('lax')
        ->storageFactoryId('session.storage.factory.native');

    $frameworkConfig->phpErrors()
        ->log();

    if ('test' === $containerConfigurator->env()) {
        $frameworkConfig
            ->test(true);

        $frameworkConfig
            ->session()
            ->storageFactoryId('session.storage.factory.mock_file');
    }
};
