<?php

declare(strict_types=1);

/**
 * Exporte une page HTML statique à la racine du projet (pour ouverture sans PHP).
 * Usage : php bin/render-static.php
 */

$root = dirname(__DIR__);

require $root . '/vendor/autoload.php';

$loader = new Twig\Loader\FilesystemLoader($root . '/templates');
$twig = new Twig\Environment($loader, ['cache' => false]);

/** @var callable(bool): array<string, mixed> $buildContext */
$buildContext = require $root . '/config/context.php';

$html = $twig->render('admin/dashboard.html.twig', $buildContext(true));
$out = $root . '/index.html';
file_put_contents($out, $html);

fwrite(STDOUT, "Twig rendu → {$out}\n");
