import React from "react";
import { render, screen } from "@testing-library/react";
import RepositoryList from "../components/RepositoryList";
import { Repository } from "../types";

describe("RepositoryList Component", () => {
  const mockRepositories: Repository[] = [
    {
      name: "test-repo",
      description: "Test repository",
      lastUpdate: "2025-01-31T12:00:00Z",
      organization: "test-org",
      private: false,
    },
    {
      name: "another-repo",
      description: "Another repository",
      lastUpdate: "2025-02-01T15:30:00Z",
      organization: "another-org",
      private: true,
    },
  ];

  it("renders a list of repositories", () => {
    render(<RepositoryList repositories={mockRepositories} />);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("another-repo")).toBeInTheDocument();

    expect(screen.getByText("Test repository")).toBeInTheDocument();
    expect(screen.getByText("Another repository")).toBeInTheDocument();

    expect(screen.getByText("Organization: test-org")).toBeInTheDocument();
    expect(screen.getByText("Organization: another-org")).toBeInTheDocument();
  });

  it("renders correctly when there are no repositories", () => {
    render(<RepositoryList repositories={[]} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
