/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Units.module.css";

const VALID_TEMP_UNITS = ["celsius", "fahrenheit"];
const VALID_WIND_UNITS = ["kmh", "mph"];
const VALID_PRECIP_UNITS = ["mm", "inch"];

function getValidUnit(param, validUnits, defaultUnit) {
  const value = param;
  return value && validUnits.includes(value) ? value : defaultUnit;
}

export default function Units() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const [tempUnit, setTempUnit] = useState(
    getValidUnit(searchParams.get("temp"), VALID_TEMP_UNITS, "celsius")
  );
  const [windUnit, setWindUnit] = useState(
    getValidUnit(searchParams.get("wind"), VALID_WIND_UNITS, "kmh")
  );
  const [precipUnit, setPrecipUnit] = useState(
    getValidUnit(searchParams.get("precip"), VALID_PRECIP_UNITS, "mm")
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("temp", tempUnit);
    params.set("wind", windUnit);
    params.set("precip", precipUnit);

    router.push(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempUnit, windUnit, precipUnit]);

  const isMetric =
    tempUnit === "celsius" && windUnit === "kmh" && precipUnit === "mm";

  const handleSystemSwitch = () => {
    if (isMetric) {
      setTempUnit("fahrenheit");
      setWindUnit("mph");
      setPrecipUnit("inch");
    } else {
      setTempUnit("celsius");
      setWindUnit("kmh");
      setPrecipUnit("mm");
    }
  };

  const handleUnitClick = (e, setter, value) => {
    e.stopPropagation();
    setter(value);
  };

  const UNIT_CLASS = styles.unitOption || "unitOption";
  const ACTIVE_CLASS = styles.active || "active";

  return (
    <div
      className={`${styles.units} ${isOpen ? styles.open : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.dropdown}>
        <img src="./assets/images/icon-units.svg" alt="units" />
        <p>Units</p>
        <img src="./assets/images/icon-dropdown.svg" alt="dropdown" />
      </div>

      {isOpen && (
        <div className={styles.options}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSystemSwitch();
            }}
          >
            Switch to {isMetric ? "Imperial" : "Metric"}
          </button>

          <div>
            <p className={styles.title}>Temperature</p>
            <div className={styles.group}>
              <div
                className={`${UNIT_CLASS} ${
                  tempUnit === "celsius" ? ACTIVE_CLASS : ""
                }`}
                onClick={(e) => handleUnitClick(e, setTempUnit, "celsius")}
              >
                <p>Celsius (°C)</p>
                {tempUnit === "celsius" ? (
                  <img
                    src="./assets/images/icon-checkmark.svg"
                    alt="checkmark"
                  />
                ) : (
                  ""
                )}
              </div>
              <div
                className={`${UNIT_CLASS} ${
                  tempUnit === "fahrenheit" ? ACTIVE_CLASS : ""
                }`}
                onClick={(e) => handleUnitClick(e, setTempUnit, "fahrenheit")}
              >
                <p>Fahrenheit (°F)</p>
                {tempUnit === "fahrenheit" ? (
                  <img
                    src="./assets/images/icon-checkmark.svg"
                    alt="checkmark"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div>
            <p className={styles.title}>Wind Speed</p>
            <div className={styles.group}>
              <div
                className={`${UNIT_CLASS} ${
                  windUnit === "kmh" ? ACTIVE_CLASS : ""
                }`}
                onClick={(e) => handleUnitClick(e, setWindUnit, "kmh")}
              >
                <p>km/h</p>
                {windUnit === "kmh" ? (
                  <img
                    src="./assets/images/icon-checkmark.svg"
                    alt="checkmark"
                  />
                ) : (
                  ""
                )}
              </div>
              <div
                className={`${UNIT_CLASS} ${
                  windUnit === "mph" ? ACTIVE_CLASS : ""
                }`}
                onClick={(e) => handleUnitClick(e, setWindUnit, "mph")}
              >
                <p>mph</p>
                {windUnit === "mph" ? (
                  <img
                    src="./assets/images/icon-checkmark.svg"
                    alt="checkmark"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div>
            <p className={styles.title}>Precipitation</p>
            <div className={styles.group}>
              <div
                className={`${UNIT_CLASS} ${
                  precipUnit === "mm" ? ACTIVE_CLASS : ""
                }`}
                onClick={(e) => handleUnitClick(e, setPrecipUnit, "mm")}
              >
                <p>Millimeters (mm)</p>
                {precipUnit === "mm" ? (
                  <img
                    src="./assets/images/icon-checkmark.svg"
                    alt="checkmark"
                  />
                ) : (
                  ""
                )}
              </div>
              <div
                className={`${UNIT_CLASS} ${
                  precipUnit === "inch" ? ACTIVE_CLASS : ""
                }`}
                onClick={(e) => handleUnitClick(e, setPrecipUnit, "inch")}
              >
                <p>Inches (in)</p>
                {precipUnit === "inch" ? (
                  <img
                    src="./assets/images/icon-checkmark.svg"
                    alt="checkmark"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
