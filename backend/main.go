package main

import (
	"log"
	"net/http"
	"os"

	gorillaHandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	appHandlers "github.com/isacustodio/challenge-go-react/backend/handlers"
	"github.com/isacustodio/challenge-go-react/backend/services"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	gitHubService := &services.GitHubRepositoryService{}
	router := mux.NewRouter()

	router.HandleFunc("/repositories", appHandlers.GetRepositoriesHandler(gitHubService)).Methods("GET")

	corsHandler := gorillaHandlers.CORS(
		gorillaHandlers.AllowedOrigins([]string{"http://localhost:3000"}),
		gorillaHandlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		gorillaHandlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler(router)))
}
