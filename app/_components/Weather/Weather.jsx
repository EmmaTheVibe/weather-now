import WeatherClient from "./WeatherClient";
import styles from "./Weather.module.css";
export default function Weather() {
  return (
    <section className={styles.weather}>
      <WeatherClient />
    </section>
  );
}
