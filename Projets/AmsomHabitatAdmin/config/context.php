<?php

declare(strict_types=1);

/**
 * Contexte passé au gabarit Twig — même tableau qu’un contrôleur Symfony
 * ferait passer à $this->render('admin/dashboard.html.twig', [...]).
 *
 * @return array<string, mixed>
 */
return function (bool $forStaticExport): array {
    $assetPrefix = $forStaticExport ? 'public/' : '';
    // Logo couleur (vert + gris) : kit « Synéo » RVB téléchargeable sur amsom-habitat.fr/communication/ → amsom-official.png
    $img = $forStaticExport ? 'public/images/' : 'images/';
    $official = $img . 'amsom-official.png';

    return [
        'page_title' => 'Amsom Habitat – Console d’administration',
        'app_name' => 'Amsom Habitat',
        'app_tagline' => 'Console d’administration des applications',
        'asset_prefix' => $assetPrefix,
        'brand_logo_login' => $official,
        'brand_logo_nav' => $official,
        'bootstrap_css' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'bootstrap_icons' => 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
        'bootstrap_js' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    ];
};
