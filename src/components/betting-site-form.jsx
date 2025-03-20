"use client";
import React from "react";

export default function BettingSiteForm({ onSubmit, initialData = null, isLoading = false }) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    url: initialData?.url || "",
    selectors: initialData?.selectors || "",
  });
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ name: "", url: "", selectors: "" });
      setError(null);
    } catch (err) {
      setError("Failed to save betting site. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {initialData ? "Edit Betting Site" : "Add New Betting Site"}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Site Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 
              text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            placeholder="Enter betting site name"
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Site URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            required
            value={formData.url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, url: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 
              text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label
            htmlFor="selectors"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            CSS Selectors
          </label>
          <textarea
            id="selectors"
            name="selectors"
            rows={4}
            value={formData.selectors}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, selectors: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 
              text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            placeholder="Enter CSS selectors for odds scraping"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Example:
            <pre>
              .odds-class
              .event-class
            </pre>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setFormData({ name: "", url: "", selectors: "" })}
          className="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-900 
            hover:bg-gray-900 hover:text-white transition-colors duration-200
            dark:border-gray-700 dark:text-white"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white 
            hover:bg-gray-700 transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {isLoading ? "Saving..." : initialData ? "Update Site" : "Add Site"}
        </button>
      </div>
    </form>
  );
}