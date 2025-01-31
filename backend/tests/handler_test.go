package tests

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/isacustodio/challenge-go-react/backend/handlers"
)

// Usamos a estrutura MockRepositoryService já definida em `mocks.go`
func TestGetRepositoriesHandler(t *testing.T) {
	mockService := &MockRepositoryService{} // Agora referenciamos o mock já existente

	req, err := http.NewRequest("GET", "/repositories", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := handlers.GetRepositoriesHandler(mockService)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler retornou status %v, esperado %v", status, http.StatusOK)
	}

	var response map[string]interface{}
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	if err != nil {
		t.Errorf("Resposta não é um JSON válido: %v", err)
	}

	if _, exists := response["repositories"]; !exists {
		t.Errorf("Resposta JSON não contém a chave 'repositories'")
	}
}
