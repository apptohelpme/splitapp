# Use the official alpine Go image as a base image for building the app
FROM golang:1.23.1-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code to the container
COPY . .

# Build the application
RUN go build -o split-app-backend .

# Start with a smaller image for the final container
FROM alpine:latest AS runner

# Set the working directory in the final container
WORKDIR /root

# Copy the built binary from the builder stage
COPY --from=builder /app/split-app-backend /root/split-app-backend

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["/root/split-app-backend"]
