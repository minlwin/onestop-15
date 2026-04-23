FROM maven:3.9-eclipse-temurin-25-alpine AS build

WORKDIR /workspace

COPY application/pom.xml ./application/pom.xml
COPY commons/pom.xml ./commons/pom.xml
COPY domains/pom.xml ./domains/pom.xml
COPY office-api/pom.xml ./office-api/pom.xml
COPY public-api/pom.xml ./public-api/pom.xml
COPY student-api/pom.xml ./student-api/pom.xml

COPY pom.xml ./
RUN mvn -B dependency:go-offline

COPY application/src ./application/src
COPY commons/src ./commons/src
COPY domains/src ./domains/src
COPY office-api/src ./office-api/src
COPY public-api/src ./public-api/src
COPY student-api/src ./student-api/src

RUN mvn -B -T 1C clean package -DskipTests

FROM eclipse-temurin:25-jre-alpine as runtime

# create group and user in a single RUN (remove stray backslash/space that broke the continuation)
RUN addgroup -S springgrp && adduser -S springusr -G springgrp

USER springusr

WORKDIR /app

COPY --from=build /workspace/application/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]