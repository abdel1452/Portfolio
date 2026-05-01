<?php

declare(strict_types=1);

namespace App\Controller;

/**
 * Illustration d’un contrôleur Symfony — ce dépôt utilise Twig en mode minimal (voir public/index.php).
 *
 * Avec symfony/framework-bundle, une action ressemblerait à :
 *
 * #[Route('/admin', name: 'admin_dashboard')]
 * public function dashboard(): Response
 * {
 *     return $this->render('admin/dashboard.html.twig', [
 *         'page_title' => 'Amsom Habitat – Console d’administration',
 *         'app_name' => 'Amsom Habitat',
 *         'app_tagline' => 'Console d’administration des applications',
 *         'asset_prefix' => '',
 *         'brand_logo_login' => 'images/amsom-official.png',
 *         'brand_logo_nav' => 'images/amsom-official.png',
 *         'bootstrap_css' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
 *         'bootstrap_icons' => 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
 *         'bootstrap_js' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
 *     ]);
 * }
 */
final class AdminController
{
}
