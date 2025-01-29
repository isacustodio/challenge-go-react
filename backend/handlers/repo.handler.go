
package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/isacustodio/challenge-go-react/backend/services" // Ajuste para o caminho correto
)

// GetRepositoriesHandler lida com a requisição HTTP para buscar repositórios
func GetRepositoriesHandler(w http.ResponseWriter, r *http.Request) {
	repos, err := services.GetRepositories(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"repositories": repos,
	})
}
