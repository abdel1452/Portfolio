# Script PowerShell pour lancer l'émulateur Android
# Coach v1 - Abdelmalek Elidrissi

Write-Host "🚀 Lancement de l'émulateur Android pour Coach v1..." -ForegroundColor Cyan
Write-Host ""

# Chemin de l'émulateur Android (par défaut)
$emulatorPath = "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe"

# Vérifier d'autres emplacements possibles
if (-not (Test-Path $emulatorPath)) {
    $emulatorPath = "$env:ANDROID_HOME\emulator\emulator.exe"
}

if (-not (Test-Path $emulatorPath)) {
    $emulatorPath = "$env:USERPROFILE\AppData\Local\Android\Sdk\emulator\emulator.exe"
}

# Vérifier si l'émulateur existe
if (-not (Test-Path $emulatorPath)) {
    Write-Host "❌ Erreur : Android Emulator non trouvé." -ForegroundColor Red
    Write-Host ""
    Write-Host "Emplacements vérifiés :" -ForegroundColor Yellow
    Write-Host "  - $env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -ForegroundColor Gray
    Write-Host "  - $env:ANDROID_HOME\emulator\emulator.exe" -ForegroundColor Gray
    Write-Host ""
    Write-Host "💡 Solutions :" -ForegroundColor Cyan
    Write-Host "  1. Installez Android Studio depuis https://developer.android.com/studio" -ForegroundColor White
    Write-Host "  2. Créez un AVD (Appareil Virtuel Android) via Tools > Device Manager" -ForegroundColor White
    Write-Host "  3. Ou modifiez le chemin dans ce script si Android SDK est installé ailleurs" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ Emulator trouvé : $emulatorPath" -ForegroundColor Green
Write-Host ""

# Lister les AVD disponibles
Write-Host "📱 Recherche des AVD disponibles..." -ForegroundColor Cyan
$avds = & $emulatorPath -list-avds

if ($avds.Count -eq 0) {
    Write-Host "❌ Aucun AVD trouvé." -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Pour créer un AVD :" -ForegroundColor Cyan
    Write-Host "  1. Ouvrez Android Studio" -ForegroundColor White
    Write-Host "  2. Allez dans Tools > Device Manager" -ForegroundColor White
    Write-Host "  3. Cliquez sur 'Create Device'" -ForegroundColor White
    Write-Host "  4. Sélectionnez un appareil (ex: Pixel 5)" -ForegroundColor White
    Write-Host "  5. Téléchargez une image système (ex: API 33 - Android 13)" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "AVD disponibles :" -ForegroundColor Green
$index = 1
foreach ($avd in $avds) {
    Write-Host "  [$index] $avd" -ForegroundColor White
    $index++
}
Write-Host ""

# Sélectionner le premier AVD ou demander à l'utilisateur
$selectedAVD = $avds[0]

if ($avds.Count -gt 1) {
    Write-Host "Sélection automatique : $selectedAVD" -ForegroundColor Yellow
    Write-Host "Pour utiliser un autre AVD, modifiez la variable `$selectedAVD dans le script." -ForegroundColor Gray
    Write-Host ""
}

# Vérifier si un émulateur est déjà en cours d'exécution
Write-Host "🔍 Vérification des émulateurs en cours d'exécution..." -ForegroundColor Cyan
$runningEmulators = Get-Process -Name "qemu-system-x86_64" -ErrorAction SilentlyContinue

if ($runningEmulators) {
    Write-Host "⚠️  Un émulateur semble déjà être en cours d'exécution." -ForegroundColor Yellow
    Write-Host "   Vous pouvez continuer ou fermer l'émulateur existant." -ForegroundColor Gray
    Write-Host ""
    $response = Read-Host "Continuer quand même ? (O/N)"
    if ($response -ne "O" -and $response -ne "o") {
        Write-Host "Opération annulée." -ForegroundColor Yellow
        pause
        exit 0
    }
}

# Lancer l'émulateur
Write-Host "🚀 Lancement de l'émulateur : $selectedAVD" -ForegroundColor Cyan
Write-Host "⏳ Cela peut prendre 1-3 minutes au premier lancement..." -ForegroundColor Yellow
Write-Host "   Veuillez patienter..." -ForegroundColor Gray
Write-Host ""

try {
    # Lancer l'émulateur en arrière-plan
    Start-Process -FilePath $emulatorPath -ArgumentList "-avd", $selectedAVD -WindowStyle Normal
    
    Write-Host "✅ Émulateur en cours de lancement..." -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Prochaines étapes :" -ForegroundColor Cyan
    Write-Host "  1. Attendez que l'émulateur démarre complètement (écran d'accueil Android)" -ForegroundColor White
    Write-Host "  2. Ouvrez Visual Studio 2022" -ForegroundColor White
    Write-Host "  3. Ouvrez la solution MauiAppCoach.slnx" -ForegroundColor White
    Write-Host "  4. Sélectionnez l'émulateur dans la barre d'outils" -ForegroundColor White
    Write-Host "  5. Appuyez sur F5 pour compiler et déployer l'application" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Astuce : Une fois l'émulateur lancé, vous pouvez le garder ouvert" -ForegroundColor Yellow
    Write-Host "   pour éviter de le relancer à chaque fois." -ForegroundColor Yellow
    Write-Host ""
    
} catch {
    Write-Host "❌ Erreur lors du lancement de l'émulateur : $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Essayez de lancer manuellement :" -ForegroundColor Cyan
    Write-Host "  & '$emulatorPath' -avd $selectedAVD" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "Appuyez sur une touche pour fermer cette fenêtre..." -ForegroundColor Gray
pause
