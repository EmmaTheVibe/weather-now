/* eslint-disable @next/next/no-img-element */
import { getWeatherInfo } from "@/app/_utils/weatherMap";
import styles from "./Daily.module.css";

export default function Daily({ data, isLoading, error }) {
  function roundUp(value) {
    return Math.ceil(parseFloat(value));
  }
  if (isLoading) {
    return (
      <div className={styles.daily}>
        <p className={styles.heading}>Daily Forecast</p>
        <div className={styles.grid}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`${styles.card} ${styles.cardLoading}`}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading forecast: {error.message}</div>;
  }

  if (!data || !data.daily) {
    return <div>No forecast data available</div>;
  }

  const { daily, daily_units } = data;

  return (
    <div className={styles.daily}>
      <p className={styles.heading}>Daily Forecast</p>

      <div className={styles.grid}>
        {daily.time.map((date, index) => {
          const dayDate = new Date(date);
          const dayName = dayDate.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const weather = getWeatherInfo(daily.weather_code[index]);

          return (
            <div key={date} className={`${styles.card} ${styles.cardLoaded}`}>
              <p className={styles.title}>{dayName}</p>
              <img
                src={weather.img}
                alt="summary"
                className={styles.summaryImg}
              />
              <div className={styles.line}>
                <p className={styles.tempHigh}>
                  {roundUp(daily.temperature_2m_max[index])}&deg;
                </p>
                <p className={styles.tempLow}>
                  {roundUp(daily.temperature_2m_min[index])}&deg;
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
