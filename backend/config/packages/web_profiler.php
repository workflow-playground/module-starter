<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Config\FrameworkConfig;
use Symfony\Config\WebProfilerConfig;

return static function (FrameworkConfig $frameworkConfig, WebProfilerConfig $profilerConfig, ContainerConfigurator $containerConfigurator): void {
    if ('dev' === $containerConfigurator->env()) {
        $profilerConfig
            ->toolbar(true)
            ->interceptRedirects(false)
        ;

        $frameworkConfig
            ->profiler()
            ->onlyExceptions(false)
            ->collectSerializerData(true)
        ;
    }
    if ('test' === $containerConfigurator->env()) {
        $profilerConfig
            ->toolbar(false)
            ->interceptRedirects(false)
        ;
        $frameworkConfig->profiler()->collect(false);
    }
};
