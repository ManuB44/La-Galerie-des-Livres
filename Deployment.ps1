# ==========================
# Deploy-Galerie.ps1
# Déploiement GitHub Pages
# ==========================

$repo = "La-Galerie-des-Livres"

Write-Host "🚀 Déploiement en cours vers GitHub Pages..." -ForegroundColor Cyan

# Vérifier si Git est dispo
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé ou non trouvé dans le PATH." -ForegroundColor Red
    exit
}

# Aller dans le dossier du script
Set-Location -Path $PSScriptRoot

# Vérifier que c'est un dépôt Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Ce dossier n'est pas un dépôt Git." -ForegroundColor Red
    exit
}

# Ajouter tous les fichiers
git add .

# Commit automatique horodaté
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy site update $timestamp"

# Push vers GitHub
git push origin main

Write-Host "✅ Déploiement terminé !"
Write-Host "🌐 Ton site sera mis à jour ici :"
Write-Host "👉 https://manub44.github.io/La-Galerie-des-Livres/" -ForegroundColor Green