export default function countdown(endsAt, element) {
  const endsIn = element.querySelector('[data-listing="endsIn"]');
  let s = 1000;
  let m = 60 * s;
  let h = 60 * m;
  let d = 24 * h;

  let timeLeft;
  let daysLeft;
  let hoursLeft;
  let minutesLeft;
  let secondsLeft;

  function calculateTime() {
    const now = new Date();
    const ends = new Date(endsAt);

    timeLeft = new Date(ends.getTime() - now.getTime());
    daysLeft = Math.floor(timeLeft / d);
    hoursLeft = Math.floor((timeLeft % d) / h);
    minutesLeft = Math.floor((timeLeft % h) / m);
    secondsLeft = Math.floor((timeLeft % m) / s);
  }
  calculateTime();

  if (daysLeft === 0) {
    setInterval(() => {
      calculateTime();
      endI;
    });
  }
}
