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

    return () => clearInterval(timerInterval);
  }, [endsAt]);

  if (
    timeRemaining.days <= 0 &&
    timeRemaining.hours <= 0 &&
    timeRemaining.minutes <= 0 &&
    timeRemaining.seconds <= 0
  ) {
    return <p className="text-destructive">Auction has ended</p>;
  }

  return (
    <div className="flex gap-2 font-medium">
      {timeRemaining.days >= 1 && <p>{timeRemaining.days} days</p>}
      {timeRemaining.days < 2 && <p>{timeRemaining.hours} hours</p>}
      {timeRemaining.days < 2 && <p>{timeRemaining.minutes} minutes</p>}
      {timeRemaining.hours < 1 && <p>{timeRemaining.seconds} seconds</p>}
    </div>
  );
}

export default CountdownTimer;
