import { Suspense } from "react";
import NavBar from "./_components/NavBar/NavBar";
import Weather from "./_components/Weather/Weather";
import JumpingDots from "./_components/JumpingDots/JumpingDots";

export default function page() {
  return (
    <>
      <Suspense fallback={<p></p>}>
        <NavBar />
      </Suspense>
      <Suspense fallback={<JumpingDots />}>
        <Weather />
      </Suspense>
    </>
  );
}
