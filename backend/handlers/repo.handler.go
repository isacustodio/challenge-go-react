package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/isacustodio/challenge-go-react/backend/models"
)

type RepositoryService interface {
	GetRepositories(ctx context.Context) ([]models.Repository, error)
}

func GetRepositoriesHandler(service RepositoryService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		repos, err := service.GetRepositories(r.Context())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"repositories": repos,
		})
	}
}
