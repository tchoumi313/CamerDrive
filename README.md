# CamerDrive
"Camer Drive" is an application for learning category B car driving courses. It was developed with the aim of facilitating the theoretical learning of courses for learners and allowing them to have fun while learning, testing their skills. skills through the different tests of past exams.

## How to install the differents projects ?

## Start download docker desktop into your computer depending your operating system.

- [Linux](https://docs.docker.com/desktop/linux/install/?_gl=1*y60r28*_ga*MjAwNjM4NjMzMy4xNzEyNjIxNzU0*_ga_XJWPQMJYHQ*MTcxMzAwNDk1NS4xMi4xLjE3MTMwMDUwMDMuMTIuMC4w)

- [Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*16d69al*_ga*MjAwNjM4NjMzMy4xNzEyNjIxNzU0*_ga_XJWPQMJYHQ*MTcxMzAwNDk1NS4xMi4xLjE3MTMwMDQ5NjAuNTUuMC4w)

## Open  terminal into your Workspace folder and run :
    git clone https://github.com/UDSMasterIARSD/CamerDrive.git
Execute, 
  Windows : 
    
    cd .\CamerDrive\
  Linux :

    cd ./CamerDrive/

## Now run the command (this step need for you to have little internet connection to downlaod the images (maven with jdk 17, node 18 and postgresSQL 13) and create your container who will permit you to execute your react native and sprint boot project ) :
    docker compose up --build 
  Or :

    docker-compose up --build
