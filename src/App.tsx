import { useEffect, useState } from 'react';
import moment from 'moment';

export default function App() {
  const [endTime, setEndTime] = useState('23:59');
  const [timeLeftText, setTimeLeftText] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = () => {
    const now = moment();
    const [endHour, endMinute] = endTime.split(':');
    const end = moment().set({ hour: +endHour, minute: +endMinute, second: 0 });

    if (end.isBefore(now)) {
      end.add(1, 'day'); // set it for tomorrow if the time has passed
    }

    const duration = moment.duration(end.diff(now));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setTimeLeftText({ hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <div className="text-center text-3xl md:text-5xl font-bold whitespace-pre leading-relaxed">
        <div>{timeLeftText.hours} Hours</div>
        <div>{timeLeftText.minutes} Minutes</div>
        <div>{timeLeftText.seconds} Seconds</div>
        <div>Remaining</div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <label className="text-lg mb-2">Set End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="text-black px-4 py-2 rounded shadow border border-gray-300"
        />
      </div>
    </div>
  );
}

