export interface Repository {
    name: string;
    description: string;
    lastUpdate: string;
    organization: string;
    private: boolean;
}

export interface ApiResponse {
repositories: Repository[];
}