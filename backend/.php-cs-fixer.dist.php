<?php

// See https://mlocati.github.io/php-cs-fixer-configurator/

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude('var')
;

$config = new PhpCsFixer\Config();

return $config
    ->setFinder($finder)
    ->setRules(
        [
            '@Symfony' => true,
            // psalm does not understand them if it's not phpdoc
            'phpdoc_to_comment' => false,
        ]
    );
