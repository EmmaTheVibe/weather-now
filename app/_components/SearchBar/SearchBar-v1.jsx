/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGeocoding } from "@/app/_hooks/useGeocoding";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: suggestions, isLoading } = useGeocoding(debouncedTerm);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldShowSuggestions = showSuggestions && debouncedTerm.length >= 2;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleLocationSelect = (location) => {
    const cityName = location.admin1
      ? `${location.name}, ${location.country}`
      : `${location.name}, ${location.country}`;

    const params = new URLSearchParams(searchParams.toString());
    params.set("lat", location.latitude);
    params.set("lon", location.longitude);
    params.set("city", cityName);

    router.push(`?${params.toString()}`, { scroll: false });

    setSearchTerm("");
    setShowSuggestions(false);
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchBar}>
        <img src="./assets/images/icon-search.svg" alt="search" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for a place..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>

      {shouldShowSuggestions && (
        <div className={styles.suggestions}>
          {isLoading && (
            <div className={styles.searching}>
              <img src="./assets/images/icon-loading.svg" alt="loading" />
              <p>Search in progress...</p>
            </div>
          )}

          {!isLoading &&
            suggestions &&
            suggestions.length === 0 &&
            debouncedTerm && (
              <div className={styles.noResults}>
                <p>No result found</p>
              </div>
            )}

          {!isLoading && suggestions && suggestions.length > 0 && (
            <div className={styles.suggestionList}>
              {suggestions
                .sort((a, b) => (b.population || 0) - (a.population || 0))
                .map((location, index) => (
                  <div
                    key={`${location.latitude}-${location.longitude}-${index}`}
                    className={styles.suggestionItem}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className={styles.locationName}>
                      <p>
                        {location.name}, {location.country}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
