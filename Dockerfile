# -------------------------------
# 🔨 Build Stage (with Maven)
# -------------------------------
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml first (cache dependencies)
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy entire source
COPY src ./src

# Build application
RUN mvn -B clean package -DskipTests

# -------------------------------
# 🚀 Runtime Stage (JDK 21 slim)
# -------------------------------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render will inject PORT dynamically
EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod \
    SERVER_PORT=8080 \
    JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
