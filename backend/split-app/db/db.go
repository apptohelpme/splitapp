package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

func ConnectDB() (*sql.DB, error) {
	host := os.Getenv("SPLITAPP_DB_HOST")
	port := os.Getenv("SPLITAPP_DB_PORT")
	user := os.Getenv("SPLITAPP_DB_USER")
	password := os.Getenv("SPLITAPP_DB_PASSWORD")
	dbname := os.Getenv("SPLITAPP_DB_NAME")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}
	return db, nil
}
