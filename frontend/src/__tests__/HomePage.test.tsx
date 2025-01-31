import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRepositories } from "../hooks/useRepositories";
import HomePage from "../pages/HomePage";

jest.mock("../hooks/useRepositories", () => ({
  useRepositories: jest.fn(),
}));

describe("HomePage Component", () => {
  it("renders the loading state initially", () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      loading: true,
      search: "",
      setSearch: jest.fn(),
    });

    render(<HomePage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the list of repositories when loaded", () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [
        {
          name: "test-repo",
          description: "Test repository",
          lastUpdate: "2025-01-31T12:00:00Z",
          organization: "test-org",
          private: true,
        },
      ],
      loading: false,
      search: "",
      setSearch: jest.fn(),
    });

    render(<HomePage />);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("Test repository")).toBeInTheDocument();
    expect(screen.getByText("Organization: test-org")).toBeInTheDocument();
  });

  it("renders 'No repositories found' when the list is empty", () => {
    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      loading: false,
      search: "",
      setSearch: jest.fn(),
    });

    render(<HomePage />);

    expect(screen.getByText("No repositories found.")).toBeInTheDocument();
  });

  it("updates the search input correctly", () => {
    const setSearchMock = jest.fn();

    (useRepositories as jest.Mock).mockReturnValue({
      repositories: [],
      loading: false,
      search: "",
      setSearch: setSearchMock,
    });

    render(<HomePage />);
    const searchInput = screen.getByPlaceholderText("Search repositories...");

    fireEvent.change(searchInput, { target: { value: "new search" } });

    expect(setSearchMock).toHaveBeenCalledWith("new search");
  });
});
