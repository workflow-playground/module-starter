<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Doctrine\Set\DoctrineSetList;
use Rector\Set\ValueObject\SetList;
use Rector\Symfony\Set\SymfonySetList;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__.'/src',
        __DIR__.'/config',
        __DIR__.'/public',
    ]);
    $rectorConfig->sets([
        SetList::CODE_QUALITY,
        SetList::PHP_82,
        SetList::EARLY_RETURN,
        SetList::TYPE_DECLARATION,
        SymfonySetList::SYMFONY_63,
        SymfonySetList::ANNOTATIONS_TO_ATTRIBUTES,
        DoctrineSetList::DOCTRINE_CODE_QUALITY,
    ]);
};
