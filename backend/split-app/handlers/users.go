package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"split-app/models"

	"github.com/gorilla/mux"
)

func CreateUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		json.NewDecoder(r.Body).Decode(&user)

		query := `INSERT INTO users (user_id, name, email, picture_url, created_at, updated_at) VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())`
		_, err := db.Exec(query, user.Name, user.Email, user.PictureURL)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	}
}

func GetUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		userID := vars["id"]

		var user models.User
		query := `SELECT user_id, name, email, picture_url, created_at, updated_at FROM users WHERE user_id = $1`
		err := db.QueryRow(query, userID).Scan(&user.UserID, &user.Name, &user.Email, &user.PictureURL, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "User not found", http.StatusNotFound)
			} else {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
			return
		}
		json.NewEncoder(w).Encode(user)
	}
}

func UpdateUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		userID := vars["id"]

		var user models.User
		json.NewDecoder(r.Body).Decode(&user)

		query := `UPDATE users SET name = $1, email = $2, picture_url = $3, updated_at = NOW() WHERE user_id = $4`
		_, err := db.Exec(query, user.Name, user.Email, user.PictureURL, userID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	}
}

func DeleteUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		userID := vars["id"]

		query := `DELETE FROM users WHERE user_id = $1`
		_, err := db.Exec(query, userID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	}
}
