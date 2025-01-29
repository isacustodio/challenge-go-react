package models

type Repository struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	LastUpdate  string `json:"lastUpdate"`
	Organization string `json:"organization"`
	Private     bool   `json:"private"`
}

type Response struct {
	Repositories []Repository `json:"repositories"`
}