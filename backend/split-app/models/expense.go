package models

type Expense struct {
	ExpenseID   string  `json:"expense_id"`
	GroupID     string  `json:"group_id"`
	PaidBy      string  `json:"paid_by"`
	Amount      float64 `json:"amount"`
	Description string  `json:"description"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
}
