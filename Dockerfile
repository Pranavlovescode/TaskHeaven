# Build stage
FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built jar
COPY --from=build /app/target/manage-employee-0.0.1-SNAPSHOT.jar app.jar

# Expose app port
EXPOSE 8080

# Default environment variables (can be overridden at runtime)
ENV SPRING_PROFILES_ACTIVE=prod \
    SERVER_PORT=8080 \
    JAVA_OPTS=""

# Run the app
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
