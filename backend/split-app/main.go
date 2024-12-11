package main

import (
	"log"
	"net/http"
	"split-app/auth"
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

	firebaseErr := auth.InitFirebase("secrets/split-app-firebase-adminsdk.json")
	if firebaseErr != nil {
		log.Fatalf("Failed to initialize Firebase: %v", firebaseErr)
	}

	// Initialize the router
	r := mux.NewRouter()

	// Protect routes with authentication and authorization
	// User routes
	r.HandleFunc("/users", handlers.CreateUser(dbConn)).Methods("POST")
	r.Handle("/users/{id}", auth.Authenticate(http.HandlerFunc(handlers.GetUser(dbConn)))).Methods("GET")
	r.Handle("/users/{id}", auth.Authenticate(http.HandlerFunc(handlers.UpdateUser(dbConn)))).Methods("PUT")
	r.Handle("/users/{id}", auth.Authenticate(http.HandlerFunc(handlers.DeleteUser(dbConn)))).Methods("DELETE")

	// Expense routes
	r.Handle("/expenses", auth.Authenticate(http.HandlerFunc(handlers.CreateExpense(dbConn)))).Methods("POST")
	r.Handle("/expenses/{id}", auth.Authenticate(http.HandlerFunc(handlers.GetExpense(dbConn)))).Methods("GET")
	r.Handle("/expenses/{id}", auth.Authenticate(http.HandlerFunc(handlers.UpdateExpense(dbConn)))).Methods("PUT")
	r.Handle("/expenses/{id}", auth.Authenticate(http.HandlerFunc(handlers.DeleteExpense(dbConn)))).Methods("DELETE")

	// Test API
	r.Handle("/testapi", auth.Authenticate(http.HandlerFunc(handlers.TestApi(dbConn)))).Methods("GET")

	// Example for role-based authorization
	// r.Handle("/admin", auth.Authenticate(auth.Authorize("admin", http.HandlerFunc(handlers.AdminHandler)))).Methods("GET")

	// Start the server
	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
