import { renderHook, act, waitFor } from "@testing-library/react";
import { useRepositories } from "../hooks/useRepositories";
import { fetchRepositories } from "../services/api";
import { ApiResponse } from "../types";

jest.mock("../services/api");

describe("useRepositories Hook", () => {
  const mockData: ApiResponse = {
    repositories: [
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
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return repositories", async () => {
    (fetchRepositories as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useRepositories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.repositories).toHaveLength(2);
    expect(result.current.repositories[0].name).toBe("test-repo");
    expect(result.current.repositories[1].name).toBe("another-repo");
  });

  it("should handle API errors", async () => {
    (fetchRepositories as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useRepositories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.repositories).toEqual([]);
  });

  it("should update search and filter repositories", async () => {
    (fetchRepositories as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useRepositories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setSearch("test");
    });

    expect(result.current.repositories).toHaveLength(1);
    expect(result.current.repositories[0].name).toBe("test-repo");

    act(() => {
      result.current.setSearch("another");
    });

    expect(result.current.repositories).toHaveLength(1);
    expect(result.current.repositories[0].name).toBe("another-repo");
  });
});
