/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWeather } from "@/app/_hooks/useWeather";
import General from "../General/General";
import Daily from "../Daily/Daily";
import Hourly from "../Hourly/Hourly";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Weather.module.css";

const VALID_TEMP_UNITS = ["celsius", "fahrenheit"];
const VALID_WIND_UNITS = ["kmh", "mph"];
const VALID_PRECIP_UNITS = ["mm", "inch"];

const DEFAULT_LOCATION = {
  lat: 51.5074,
  lon: -0.1278,
  city: "London, United Kingdom",
};

function getValidUnit(param, validUnits, defaultUnit) {
  const value = param;
  return value && validUnits.includes(value) ? value : defaultUnit;
}

function isValidCoordinate(lat, lon) {
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  return (
    !isNaN(latNum) &&
    !isNaN(lonNum) &&
    latNum >= -90 &&
    latNum <= 90 &&
    lonNum >= -180 &&
    lonNum <= 180
  );
}

export default function WeatherClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const urlLat = searchParams.get("lat");
  const urlLon = searchParams.get("lon");
  const urlCity = searchParams.get("city");

  const tempUnit = getValidUnit(
    searchParams.get("temp"),
    VALID_TEMP_UNITS,
    "celsius"
  );
  const windUnit = getValidUnit(
    searchParams.get("wind"),
    VALID_WIND_UNITS,
    "kmh"
  );
  const precipUnit = getValidUnit(
    searchParams.get("precip"),
    VALID_PRECIP_UNITS,
    "mm"
  );

  const hasValidCoordinates =
    urlLat && urlLon && isValidCoordinate(urlLat, urlLon);

  const lat = hasValidCoordinates ? parseFloat(urlLat) : DEFAULT_LOCATION.lat;
  const lon = hasValidCoordinates ? parseFloat(urlLon) : DEFAULT_LOCATION.lon;
  const cityName = urlCity || DEFAULT_LOCATION.city;

  useEffect(() => {
    if (!hasValidCoordinates) {
      setIsGettingLocation(true);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            let cityName = "Current Location";
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();

              if (data.city || data.locality) {
                const city = data.city || data.locality;
                const country = data.countryName;
                cityName = country ? `${city}, ${country}` : city;
              }
            } catch (error) {
              console.log("Reverse geocoding failed:", error);
            }

            const params = new URLSearchParams(searchParams.toString());
            params.set("lat", latitude.toString());
            params.set("lon", longitude.toString());
            params.set("city", cityName);

            router.push(`?${params.toString()}`, { scroll: false });
            setIsGettingLocation(false);
          },

          (error) => {
            console.log("Geolocation error:", error.message);

            const params = new URLSearchParams(searchParams.toString());
            params.set("lat", DEFAULT_LOCATION.lat.toString());
            params.set("lon", DEFAULT_LOCATION.lon.toString());
            params.set("city", DEFAULT_LOCATION.city);

            router.push(`?${params.toString()}`, { scroll: false });
            setIsGettingLocation(false);
          },

          {
            timeout: 10000,
            enableHighAccuracy: false,
          }
        );
      } else {
        console.log("Geolocation not supported");
        setIsGettingLocation(false);

        const params = new URLSearchParams(searchParams.toString());
        params.set("lat", DEFAULT_LOCATION.lat.toString());
        params.set("lon", DEFAULT_LOCATION.lon.toString());
        params.set("city", DEFAULT_LOCATION.city);

        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, error } = useWeather(
    lat,
    lon,
    tempUnit,
    windUnit,
    precipUnit
  );

  if (isGettingLocation) {
    return (
      <div className={`container ${styles.wrapper}`}>
        <h1 className={styles.heading}>How&apos;s the sky looking today?</h1>
        <div className={styles.txtBox}>
          <img src="./assets/images/icon-loading.svg" alt="loading" />
          <p>Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.wrapper}`}>
      <h1 className={styles.heading}>How&apos;s the sky looking today?</h1>
      <SearchBar />
      <div className={styles.content}>
        <div className={styles.top}>
          <General
            data={data}
            isLoading={isLoading}
            error={error}
            cityName={cityName}
            selectedDayIndex={selectedDayIndex}
          />
          <Daily data={data} isLoading={isLoading} error={error} />
        </div>

        <Hourly
          data={data}
          isLoading={isLoading}
          error={error}
          selectedDayIndex={selectedDayIndex}
          setSelectedDayIndex={setSelectedDayIndex}
        />
      </div>
    </div>
  );
}
