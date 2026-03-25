import { useState, useEffect } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;

export default function useTrafficLight() {
  const [light, setLight] = useState<TrafficLightColor>("red");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown, light]);

  useEffect(() => {
    if (countdown > 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountdown(5);

    if (countdown === 0) {
      if (light === "red") {
        setLight("green");
        return;
      }

      if (light === "green") {
        setLight("yellow");
        return;
      }

      if (light === "yellow") {
        setLight("red");
        return;
      }
      return;
    }
  }, [countdown, light]);

  return {
    //Props
    colors,
    light,
    countdown,

    // Computed
    percentage: ((5 - countdown) / 5) * 100,
    greenLight: light === "green" ? colors.green : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
    redLight: light === "red" ? colors.red : "bg-gray-500",
  };
}
