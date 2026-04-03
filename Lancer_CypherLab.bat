@echo off
TITLE CypherLab Launcher
echo ==========================================
echo    Lancement de CypherLab en cours...
echo ==========================================
echo.
echo Ouverture de votre navigateur sur http://localhost:5173/
start http://localhost:5173/
echo Basculement sur le serveur de developpement...
npm run dev
pause
