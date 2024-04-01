import { useEffect, useState } from "react";

const CountAnimation = ({ targetNumber, duration }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    let startTimestamp;
    const increment = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const incrementValue = Math.ceil((targetNumber / duration) * progress);
      setCurrentNumber((prevNumber) =>
        prevNumber + incrementValue <= targetNumber
          ? prevNumber + incrementValue
          : targetNumber,
      );
      if (progress < duration) requestAnimationFrame(increment);
    };
    requestAnimationFrame(increment);
  }, [targetNumber, duration]);

  return <>{currentNumber}</>;
};

export default CountAnimation;
