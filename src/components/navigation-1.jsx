"use client";
import React from "react";

export default function Navigation1() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">Sports Arbitrage</h1>
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center text-white"
            >
              <i className="fas fa-chart-line mr-2"></i>
              Dashboard
            </a>
            <a
              href="/betting-sites"
              className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center text-white"
            >
              <i className="fas fa-trophy mr-2"></i>
              Betting Sites
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center text-white"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh
          </button>
        </div>
      </div>
    </nav>
  );
}