/* eslint-disable @next/next/no-img-element */
import { getWeatherInfo } from "@/app/_utils/weatherMap";
import { useState } from "react";
import styles from "./Hourly.module.css";

export default function Hourly({
  data,
  isLoading,
  error,
  selectedDayIndex,
  setSelectedDayIndex,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function roundUp(value) {
    return Math.ceil(parseFloat(value));
  }
  if (isLoading) {
    return (
      <div className={styles.hourly}>
        <div className={styles.line}>
          <p>Hourly Forecast</p>
          <div className={styles.dropdown}>
            <p>-</p>
            <img src="./assets/images/icon-dropdown.svg" alt="dropdown" />
          </div>
        </div>
        <div className={styles.hourListWrapper}>
          <div className={styles.hourList}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.hour} ${styles.hourLoading}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading hourly forecast: {error.message}</div>;
  }

  if (!data || !data.hourly || !data.daily) {
    return <div>No hourly forecast data available</div>;
  }

  const { hourly, hourly_units, daily } = data;

  const selectedDate = daily.time[selectedDayIndex];

  const hoursForSelectedDay = hourly.time
    .map((time, index) => {
      const hourDate = time.split("T")[0];
      if (hourDate === selectedDate) {
        return {
          time: time,
          temperature: hourly.temperature_2m[index],
          weatherCode: hourly.weather_code[index],
        };
      }
      return null;
    })
    .filter((hour) => hour !== null);

  const dayOptions = daily.time.map((date, index) => {
    const dayDate = new Date(date);
    const dayName = dayDate.toLocaleDateString("en-US", { weekday: "long" });
    const shortDate = dayDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return {
      index,
      label: `${dayName}`,
      isToday: index === 0,
    };
  });

  return (
    <div className={styles.hourly}>
      <div className={styles.line}>
        <p>Hourly Forecast</p>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles.dropdown}
        >
          <p>{dayOptions[selectedDayIndex].label}</p>
          <img src="./assets/images/icon-dropdown.svg" alt="dropdown" />
          {isDropdownOpen && (
            <div className={styles.dropbox}>
              {dayOptions.map((day) => (
                <div
                  key={day.index}
                  onClick={() => {
                    setSelectedDayIndex(day.index);
                    setIsDropdownOpen(false);
                  }}
                  className={`${styles.day} ${
                    day.index === selectedDayIndex ? styles.selectedDay : ""
                  }`}
                >
                  <p>{day.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.hourListWrapper}>
        <div className={styles.hourList}>
          {hoursForSelectedDay.map((hour) => {
            const hourTime = new Date(hour.time);
            const formattedTime = hourTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            });
            const weather = getWeatherInfo(hour.weatherCode);

            return (
              <div
                key={hour.time}
                className={`${styles.hour} ${styles.hourLoaded}`}
              >
                <div className={styles.group}>
                  <img
                    src={weather.img}
                    alt="summary"
                    className={styles.summaryImg}
                  />
                  <p className={styles.time}>{formattedTime}</p>
                </div>
                <p className={styles.temp}>{roundUp(hour.temperature)}&deg;</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
