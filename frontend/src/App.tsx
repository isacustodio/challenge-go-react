import React from "react";
import HomePage from "./pages/HomePage";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-center p-4">GitHub Repositories</h1>
      <HomePage />
    </div>
  );
};

export default App;
