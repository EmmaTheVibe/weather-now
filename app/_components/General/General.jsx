/* eslint-disable @next/next/no-img-element */
import { getWeatherInfo } from "@/app/_utils/weatherMap";
import styles from "./General.module.css";
import JumpingDots from "../JumpingDots/JumpingDots";

export default function General({
  data,
  isLoading,
  error,
  cityName,
  selectedDayIndex,
}) {
  if (isLoading) {
    return (
      <div className={styles.general}>
        <div className={`${styles.today} ${styles.todayLoading}`}>
          <div className={styles.box}>
            <JumpingDots />
            <p>Loading...</p>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.title}>Feels Like</p>
            <p className={styles.value}>__</p>
          </div>
          <div className={`${styles.card} ${styles.cardLoading}`}>
            <p className={styles.title}>Humidity</p>
            <p className={styles.value}>__</p>
          </div>
          <div className={`${styles.card} ${styles.cardLoading}`}>
            <p className={styles.title}>Wind</p>
            <p className={styles.value}>__</p>
          </div>
          <div className={`${styles.card} ${styles.cardLoading}`}>
            <p className={styles.title}>Precipitation</p>
            <p className={styles.value}>__</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.today} ${styles.todayLoading}`}>
        <p>Error loading weather</p>
      </div>
    );
  }

  if (!data || !data.current || !data.daily || !data.hourly) {
    return (
      <div className={`${styles.today} ${styles.todayLoading}`}>
        <p>No weather data availables</p>
      </div>
    );
  }

  const { current, current_units, daily, hourly } = data;
  const isToday = selectedDayIndex === 0;

  const displayDate = isToday
    ? new Date(current.time)
    : new Date(daily.time[selectedDayIndex]);

  const formattedDate = displayDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  function roundUp(value) {
    return Math.ceil(parseFloat(value));
  }

  let temperature, feelsLike, humidity, windSpeed, precipitation, weatherCode;

  if (isToday) {
    temperature = current.temperature_2m;
    feelsLike = current.apparent_temperature;
    humidity = current.relative_humidity_2m;
    windSpeed = current.wind_speed_10m;
    precipitation = current.precipitation;
    weatherCode = daily.weather_code[selectedDayIndex];
  } else {
    const selectedDate = daily.time[selectedDayIndex];
    const hoursForDay = hourly.time
      .map((time, index) => {
        const hourDate = time.split("T")[0];
        if (hourDate === selectedDate) {
          return {
            temperature: hourly.temperature_2m[index],
            apparent_temperature: hourly.apparent_temperature[index],
            relative_humidity_2m: hourly.relative_humidity_2m[index],
            wind_speed_10m: hourly.wind_speed_10m[index],
            precipitation: hourly.precipitation[index],
            weather_code: hourly.weather_code[index],
          };
        }
        return null;
      })
      .filter((hour) => hour !== null);

    const middayHour =
      hoursForDay[12] ||
      hoursForDay[Math.floor(hoursForDay.length / 2)] ||
      hoursForDay[0];

    temperature = daily.temperature_2m_max[selectedDayIndex];
    feelsLike = middayHour.apparent_temperature;
    humidity = middayHour.relative_humidity_2m;
    windSpeed = middayHour.wind_speed_10m;

    precipitation = hoursForDay.reduce(
      (sum, hour) => sum + (hour.precipitation || 0),
      0
    );

    weatherCode = daily.weather_code[selectedDayIndex];
  }

  const weather = getWeatherInfo(weatherCode);

  return (
    <div className={styles.general}>
      <div className={`${styles.today} ${styles.todayLoaded}`}>
        <div className={styles.todaySummary}>
          <h3>{cityName}</h3>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.summary}>
          <img src={weather.img} alt="summary" className={styles.summaryImg} />
          <h1 className={styles.mainTemp}>{roundUp(temperature)}&deg;</h1>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.title}>Feels Like</p>
          <p className={styles.value}>
            {feelsLike ? `${roundUp(feelsLike)}°` : "N/A"}
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>Humidity</p>
          <p className={styles.value}>
            {humidity
              ? `${roundUp(humidity)}${current_units.relative_humidity_2m}`
              : "N/A"}
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>Wind</p>
          <p className={styles.value}>
            {windSpeed
              ? `${roundUp(windSpeed)} ${current_units.wind_speed_10m}`
              : "N/A"}
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>Precipitation</p>
          <p className={styles.value}>
            {precipitation !== null
              ? `${roundUp(precipitation)} ${current_units.precipitation}`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
