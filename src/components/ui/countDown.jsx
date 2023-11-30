import { useState, useEffect } from "react";

function CountdownTimer({ endsAt }) {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const endTime = new Date(endsAt).getTime();
    const timeRemaining = endTime - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, [endsAt]);

  return (
    <div>
      <p>Time Remaining:</p>
      <p>{timeRemaining.days} days</p>
      <p>{timeRemaining.hours} hours</p>
      <p>{timeRemaining.minutes} minutes</p>
      {timeRemaining.hours < 2 && <p>{timeRemaining.seconds} seconds</p>}
    </div>
  );
}

export default CountdownTimer;
