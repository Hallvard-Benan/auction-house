import { useState, useEffect } from "react";

function CountdownTimer({ endsAt, longFormat, className }) {
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
  }, []);

  if (
    timeRemaining.days <= 0 &&
    timeRemaining.hours <= 0 &&
    timeRemaining.minutes <= 0 &&
    timeRemaining.seconds <= 0
  ) {
    return <p className={`text-destructive ${className}`}>Auction has ended</p>;
  }

  const shortTimeLeft = timeRemaining.days < 1 && "text-destructive";

  return (
    <div className={`flex gap-2 font-medium ${className}`}>
      {longFormat === true && (
        <p className="font font-normal">Auction ends in:</p>
      )}
      {timeRemaining.days >= 1 && <p>{timeRemaining.days} days</p>}
      {timeRemaining.days < 2 && timeRemaining.hours > 0 && (
        <p className={shortTimeLeft}>{timeRemaining.hours} hours</p>
      )}
      {timeRemaining.days < 2 && (
        <p className={shortTimeLeft}>{timeRemaining.minutes} minutes</p>
      )}
      {timeRemaining.days <= 1 && (
        <p className={shortTimeLeft}>{timeRemaining.seconds} seconds</p>
      )}
    </div>
  );
}

export default CountdownTimer;
