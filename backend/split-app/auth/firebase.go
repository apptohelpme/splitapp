package auth

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

var client *auth.Client

// InitFirebase initializes the Firebase Auth client.
func InitFirebase(credsPath string) error {
	ctx := context.Background()
	opt := option.WithCredentialsFile(credsPath)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return fmt.Errorf("error initializing app: %w", err)
	}

	c, err := app.Auth(ctx)
	if err != nil {
		return fmt.Errorf("error initializing auth client: %w", err)
	}

	client = c
	return nil
}

// Client returns the initialized Auth client (after InitFirebase is called).
func Client() *auth.Client {
	return client
}

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		idToken := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := client.VerifyIDToken(context.Background(), idToken)
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Add user info to the request context
		ctx := context.WithValue(r.Context(), "user", token)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func Authorize(requiredRole string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Context().Value("user").(*auth.Token)
		if role, ok := token.Claims["role"]; !ok || role != requiredRole {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}
