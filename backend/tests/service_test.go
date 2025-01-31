package tests

import (
	"context"
	"testing"
)

func TestGetRepositories(t *testing.T) {
	mockService := &MockRepositoryService{}
	repos, err := mockService.GetRepositories(context.Background())

	if err != nil {
		t.Fatalf("Erro inesperado: %v", err)
	}

	if len(repos) == 0 {
		t.Errorf("Esperava pelo menos um repositório, mas recebeu zero")
	}

	if repos[0].Name != "projeto-teste" {
		t.Errorf("Esperava 'projeto-teste', mas recebeu %s", repos[0].Name)
	}
}
