<?php

declare(strict_types=1);

/**
 * Point d’entrée web (document root = public/) — équivalent du front controller Symfony.
 * En projet Symfony complet, ce rendu serait typiquement :
 *
 *   // src/Controller/AdminController.php
 *   #[Route('/admin', name: 'admin_dashboard')]
 *   public function dashboard(): Response
 *   {
 *       return $this->render('admin/dashboard.html.twig', [
 *           ... contexte métier / flash / utilisateur ...
 *       ]);
 *   }
 */

$root = dirname(__DIR__);

require $root . '/vendor/autoload.php';

$loader = new Twig\Loader\FilesystemLoader($root . '/templates');
$twig = new Twig\Environment($loader, [
    'cache' => false,
]);

/** @var callable(bool): array<string, mixed> $buildContext */
$buildContext = require $root . '/config/context.php';

echo $twig->render('admin/dashboard.html.twig', $buildContext(false));
