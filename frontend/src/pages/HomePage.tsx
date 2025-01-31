import React from "react";
import { useRepositories } from "../hooks/useRepositories";
import RepositoryList from "../components/RepositoryList";

const HomePage: React.FC = () => {
  const { repositories, loading, search, setSearch } = useRepositories();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 container">
      <input
        type="text"
        placeholder="🔍 Type a repository name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none search-box"
      />
      
      <div className="w-full mt-8 flex justify-center">
        {loading ? (
          <p className="text-lg text-gray-700 text-center min-h-[200px]">Loading repositories...</p>
        ) : repositories.length > 0 ? (
          <RepositoryList repositories={repositories} />
        ) : (
          <p className="text-lg text-gray-500 text-center min-h-[200px]">No repositories found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;