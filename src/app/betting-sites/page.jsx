/*'use client';
import React, { useState, useCallback, useEffect } from "react";
import Navigation1 from "../../components/navigation-1";
import BettingSiteForm from "../../components/betting-site-form";

function MainComponent() {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSite, setEditingSite] = useState(null);

  const fetchSites = useCallback(async () => {
    try {
      const response = await fetch("/api/betting-sites");
      if (!response.ok) throw new Error("Failed to fetch betting sites");
      const data = await response.json();
      setSites(data.sites || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const handleSubmit = async (formData) => {
    try {
      const method = editingSite ? "PUT" : "POST";
      const url = editingSite 
        ? `/api/betting-sites/${editingSite.id}`
        : "/api/betting-sites";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Failed to ${method} betting site`);
      
      await fetchSites();
      setEditingSite(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDelete = async (siteId) => {
    if (!window.confirm("Are you sure you want to delete this betting site?")) return;

    try {
      const response = await fetch(`/api/betting-sites/${siteId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete betting site");
      
      await fetchSites();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation1/>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Betting Sites Management</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sites List *}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              {sites.length > 0 ? "Registered Sites" : "No Sites Found"}
            </h2>

            {isLoading ? (
              <div className="text-gray-500 animate-pulse">Loading sites...</div>
            ) : (
              <div className="space-y-4">
                {sites.map((site) => (
                  <div
                    key={site.id}
                    className="group p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{site.name}</h3>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {site.url}
                        </a>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingSite(site)}
                          className="text-gray-600 hover:text-blue-600"
                          aria-label="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(site.id)}
                          className="text-gray-600 hover:text-red-600"
                          aria-label="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Section *}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              {editingSite ? "Edit Site" : "Add New Site"}
            </h2>
            <BettingSiteForm
              onSubmit={handleSubmit}
              initialData={editingSite}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainComponent;*/

"use client";
import React, { useState, useCallback, useEffect } from "react";
import BettingSiteForm from "../../components/betting-site-form";
import Navigation1 from "../../components/navigation-1";

function MainComponent() {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSite, setEditingSite] = useState(null);
  const fetchSites = useCallback(async () => {
    try {
      const response = await fetch("/api/betting-sites", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch betting sites");
      }
      const data = await response.json();
      setSites(data.sites || []);
    } catch (err) {
      console.error(err);
      setError("Could not load betting sites");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const handleSubmit = async (formData) => {
    try {
      const endpoint = editingSite
        ? `/api/betting-sites/${editingSite.id}`
        : "/api/betting-sites";
      const method = editingSite ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save betting site");
      }

      await fetchSites();
      setEditingSite(null);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const handleDelete = async (siteId) => {
    if (!window.confirm("Are you sure you want to delete this betting site?")) {
      return;
    }

    try {
      const response = await fetch(`/api/betting-sites/${siteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete betting site");
      }

      await fetchSites();
    } catch (err) {
      console.error(err);
      setError("Could not delete betting site");
    }
  };

  return (
    <>
      <Navigation1 />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Betting Sites
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {sites.length > 0 ? "Current Sites" : "No Sites Added"}
            </h2>

            {isLoading ? (
              <div className="text-gray-500 dark:text-gray-400">Loading...</div>
            ) : error ? (
              <div className="text-red-600 dark:text-red-400">{error}</div>
            ) : (
              <div className="space-y-4">
                {sites.map((site) => (
                  <div
                    key={site.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {site.name}
                        </h3>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          {site.url}
                        </a>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingSite(site)}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(site.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <BettingSiteForm
              onSubmit={handleSubmit}
              initialData={editingSite}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainComponent;