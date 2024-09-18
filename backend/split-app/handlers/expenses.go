package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"split-app/models"

	"github.com/gorilla/mux"
)

func CreateExpense(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var expense models.Expense
		json.NewDecoder(r.Body).Decode(&expense)

		query := `INSERT INTO expenses (expense_id, group_id, paid_by, amount, description, created_at, updated_at) VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())`
		_, err := db.Exec(query, expense.GroupID, expense.PaidBy, expense.Amount, expense.Description)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	}
}

func GetExpense(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		expenseID := vars["id"]

		var expense models.Expense
		query := `SELECT expense_id, group_id, paid_by, amount, description, created_at, updated_at FROM expenses WHERE expense_id = $1`
		err := db.QueryRow(query, expenseID).Scan(&expense.ExpenseID, &expense.GroupID, &expense.PaidBy, &expense.Amount, &expense.Description, &expense.CreatedAt, &expense.UpdatedAt)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Expense not found", http.StatusNotFound)
			} else {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
			return
		}
		json.NewEncoder(w).Encode(expense)
	}
}

func UpdateExpense(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		expenseID := vars["id"]

		var expense models.Expense
		json.NewDecoder(r.Body).Decode(&expense)

		query := `UPDATE expenses SET group_id = $1, paid_by = $2, amount = $3, description = $4, updated_at = NOW() WHERE expense_id = $5`
		_, err := db.Exec(query, expense.GroupID, expense.PaidBy, expense.Amount, expense.Description, expenseID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	}
}

func DeleteExpense(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		expenseID := vars["id"]

		query := `DELETE FROM expenses WHERE expense_id = $1`
		_, err := db.Exec(query, expenseID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	}
}
