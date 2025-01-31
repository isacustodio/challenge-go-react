import React from 'react';
import { Repository } from '../types';

interface Props {
  repositories: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repositories }) => {
  return (
    <div className="repository-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {repositories.map((repo) => (
        <div 
          key={repo.name} 
          className="card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 w-full"
        >
          <h3 className="text-xl font-semibold text-gray-800">{repo.name}</h3>
          <p className="text-gray-600">{repo.description || "No description available."}</p>
          <p className="text-sm text-gray-500">🕒 Last Updated: {new Date(repo.lastUpdate).toLocaleString()}</p>
          <p className="text-sm text-gray-500">🏢 Organization: {repo.organization}</p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
