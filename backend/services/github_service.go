package services

import (
	"context"
	"os"
	"log"
	"fmt"
	"github.com/google/go-github/v54/github"
	"golang.org/x/oauth2"
	"github.com/isacustodio/challenge-go-react/backend/models" // Ajuste para o caminho correto
)

// GetRepositories busca os repositórios do usuário e das organizações
func GetRepositories(ctx context.Context) ([]models.Repository, error) {
	token := os.Getenv("GITHUB_ACCESS_TOKEN")
	if token == "" {
		return nil, logError("GitHub Access Token not set")
	}

	tokenSource := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	client := github.NewClient(oauth2.NewClient(ctx, tokenSource))

	// Obtém o usuário autenticado
	user, _, err := client.Users.Get(ctx, "")
	if err != nil {
		return nil, logError("Failed to fetch user: " + err.Error())
	}

	// Obtém os repositórios do usuário
	repos, _, err := client.Repositories.List(ctx, user.GetLogin(), nil)
	if err != nil {
		return nil, logError("Failed to fetch user repositories: " + err.Error())
	}

	var result []models.Repository
	for _, repo := range repos {
		result = append(result, models.Repository{
			Name:        repo.GetName(),
			Description: repo.GetDescription(),
			LastUpdate:  repo.GetUpdatedAt().String(),
			Organization: "Personal",
			Private:     repo.GetPrivate(),
		})
	}

	// Obtém as organizações do usuário
	orgs, _, err := client.Organizations.List(ctx, "", nil)
	if err != nil {
		log.Println("Warning: Failed to fetch organizations:", err)
	} else {
		for _, org := range orgs {
			repos, _, err := client.Repositories.ListByOrg(ctx, org.GetLogin(), nil)
			if err == nil {
				for _, repo := range repos {
					result = append(result, models.Repository{
						Name:        repo.GetName(),
						Description: repo.GetDescription(),
						LastUpdate:  repo.GetUpdatedAt().String(),
						Organization: org.GetLogin(),
						Private:     repo.GetPrivate(),
					})
				}
			}
		}
	}

	return result, nil
}

// Função para logar erros e retornar erro formatado
func logError(message string) error {
	log.Println("Error:", message)
	return fmt.Errorf(message)
}
