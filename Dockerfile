# Use Eclipse Temurin's Java 21 image as the base image
FROM docker.io/library/eclipse-temurin:21-jdk-alpine as build

# Set the working directory in the container
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy the Maven pom.xml file
COPY pom.xml .

# Download dependencies (this will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the application with tests explicitly disabled
RUN mvn clean package -Dmaven.test.skip=true

# Use Eclipse Temurin's Java 21 JRE for the runtime image
FROM docker.io/library/eclipse-temurin:21-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/manage-employee-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
