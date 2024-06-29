# Dockerfile pour le backend
FROM maven:3.8.3-openjdk-17
COPY . /app
WORKDIR /app
RUN mvn -f /app/pom.xml clean
RUN mvn -f /app/pom.xml install
EXPOSE 8080
# RUN  docker run -it -e NGROK_AUTHTOKEN=<token> ngrok/ngrok http 80
ENTRYPOINT ["java", "-jar", "/app/target/backend-0.0.1-SNAPSHOT.war"]

# lombok
# model mapper
# spring boot starter test
# spring boot starter validation
# spring-boot-starter-data-jpa
# postgresql