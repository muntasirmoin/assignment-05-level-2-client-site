// import React, { useState, useEffect } from "react";

// interface CountdownTimerProps {
//   targetDate: string | Date;
// }

// const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
//   const [timeLeft, setTimeLeft] = useState<number>(
//     calculateTimeLeft(targetDate)
//   );

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft(targetDate));
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup on component unmount
//   }, [targetDate]);

//   function calculateTimeLeft(targetDate: string | Date): number {
//     const now = new Date();
//     const target = new Date(targetDate);
//     return target.getTime() - now.getTime();
//   }

//   // Format time left
//   const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//   if (timeLeft < 0) {
//     return <div>Countdown has ended</div>;
//   }

//   return (
//     <div>
//       {days}d {hours}h {minutes}m {seconds}s
//     </div>
//   );
// };

// export default CountdownTimer;

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  date: string; // e.g., "01/09/24"
  time: string; // e.g., "01:00 PM"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ date, time }) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    calculateTimeLeft(date, time)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date, time));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [date, time]);

  function calculateTimeLeft(date: string, time: string): number {
    const now = new Date();
    const targetDate = new Date(`${date} ${time}`);

    return targetDate.getTime() - now.getTime();
  }

  // Format time left
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft < 0) {
    return <div>Countdown has ended</div>;
  }

  return (
    <div>
      <div>
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </div>
  );
};

export default CountdownTimer;
