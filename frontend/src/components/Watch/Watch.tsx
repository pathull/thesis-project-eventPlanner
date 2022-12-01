import { useState, useEffect } from 'react';

export const Watch = ({ time }: { time: string }): JSX.Element => {
  const [eventDate, setEventDate] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(time);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(days);

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHours(hours);

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(minutes);

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(seconds);

      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        setEventDate(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(eventDate);

  return (
    <div>
      <div>
        <span>{days}</span>
        <span>Days</span>
      </div>
      <div>
        <span>{hours}</span>
        <span>Hours</span>
      </div>
      <div>
        <span>{minutes}</span>
        <span>Minutes</span>
      </div>
      <div>
        <span>{seconds}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};
