<?php

declare(strict_types=1);

return static function (Symfony\Config\DoctrineMigrationsConfig $migrationsConfig): void {
    $migrationsConfig
        ->allOrNothing(true)
        ->enableProfiler(false)
        ->migrationsPath('DoctrineMigrations', '%kernel.project_dir%/migrations')
    ;
};
