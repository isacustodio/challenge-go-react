package tests

import (
	"context"

	"github.com/isacustodio/challenge-go-react/backend/models"
)

// Mock do serviço de repositórios para os testes
type MockRepositoryService struct{}

func (m *MockRepositoryService) GetRepositories(ctx context.Context) ([]models.Repository, error) {
	return []models.Repository{
		{
			Name:         "projeto-teste",
			Description:  "Repositório de teste",
			LastUpdate:   "2024-01-27T10:30:00Z",
			Organization: "TesteOrg",
			Private:      true,
		},
	}, nil
}
