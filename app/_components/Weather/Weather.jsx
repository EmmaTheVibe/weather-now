import { Suspense } from "react";
import WeatherClient from "./WeatherClient";
import styles from "./Weather.module.css";
import JumpingDots from "../JumpingDots/JumpingDots";

export default function Weather() {
  return (
    <section className={styles.weather}>
      <Suspense fallback={<JumpingDots />}>
        <WeatherClient />
      </Suspense>
    </section>
  );
}
