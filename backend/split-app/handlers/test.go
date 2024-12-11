package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"firebase.google.com/go/auth"
)

func TestApi(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// Get the authenticated user's information
		token := r.Context().Value("user").(*auth.Token)
		userID := token.UID // Firebase user ID

		json.NewEncoder(w).Encode(userID)
	}
}
