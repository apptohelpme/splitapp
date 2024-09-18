package main

import (
    "log"
    "net/http"
    "split-app/db"
    "split-app/handlers"

    "github.com/gorilla/mux"
)

func main() {
    // Initialize database connection
    dbConn, err := db.ConnectDB()
    if err != nil {
        log.Fatalf("Failed to connect to the database: %v", err)
    }
    defer dbConn.Close()

    // Initialize the router
    r := mux.NewRouter()

    // User routes
    r.HandleFunc("/users", handlers.CreateUser(dbConn)).Methods("POST")
    r.HandleFunc("/users/{id}", handlers.GetUser(dbConn)).Methods("GET")
    r.HandleFunc("/users/{id}", handlers.UpdateUser(dbConn)).Methods("PUT")
    r.HandleFunc("/users/{id}", handlers.DeleteUser(dbConn)).Methods("DELETE")

    // Expense routes
    r.HandleFunc("/expenses", handlers.CreateExpense(dbConn)).Methods("POST")
    r.HandleFunc("/expenses/{id}", handlers.GetExpense(dbConn)).Methods("GET")
    r.HandleFunc("/expenses/{id}", handlers.UpdateExpense(dbConn)).Methods("PUT")
    r.HandleFunc("/expenses/{id}", handlers.DeleteExpense(dbConn)).Methods("DELETE")

    // Start the server
    log.Println("Starting server on :8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}
