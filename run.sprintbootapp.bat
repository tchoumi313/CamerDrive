@echo off
REM Vérifier si le port 8080 est occupé
netstat -ano | findstr :8080 | findstr LISTENING > nul
if %errorlevel% equ 0 (
    echo Le port 8080 est déjà occupé.
    REM Demander à l'utilisateur s'il veut tuer le processus en cours
    set /p "response=Voulez-vous tuer le processus en cours ? (oui/non) "
    if /i "%response%"=="oui" (
        REM Tuer le processus en cours
        for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080 ^| findstr LISTENING') do taskkill /f /pid %%a
        echo Le processus a été tué.
    ) else (
        REM Quitter le script
        echo Le processus n'a pas été tué. Le script s'arrête.
        exit
    )
)

REM Lancer le projet Spring Boot
cd backend
REM mvn clean 
REM mvn install
mvn spring-boot:run
