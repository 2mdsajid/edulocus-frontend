import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';

interface TestTimerProps {
  expiryTimestamp: number; // Time in milliseconds
  onExpire: () => void;
  onTick?: (remainingTime: number) => void; // Time in milliseconds
  className?: string;
  label?: string;
}

function TestTimer2({
  expiryTimestamp,
  onExpire,
  onTick,
  className,
  label,
}: TestTimerProps): JSX.Element {
  function convertToTwoDigit(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  const currentDatetime = new Date();
  currentDatetime.setMilliseconds(
    currentDatetime.getMilliseconds() + expiryTimestamp
  );

  const [remainingTime, setRemainingTime] = useState<number>(0);

  const {
    days,
    seconds,
    minutes,
    hours,
  } = useTimer({ expiryTimestamp: currentDatetime, onExpire });

  useEffect(() => {
    setRemainingTime((hours * 3600 + minutes * 60 + seconds) * 1000);
    if (typeof onTick === 'function') {
      onTick(remainingTime);
    }
  }, [seconds, onTick, remainingTime]);

  return (
    <div
      className={cn(
        'flex items-center gap-2 md:justify-between bg-blue-100 rounded-lg p-4 text-sm md:text-lg ',
        className
      )}
    >
      <span className='flex items-center gap-1 '>
        <Clock className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
        {label ? label : 'Time Left'}
      </span>
      {days > 0 && `${convertToTwoDigit(days)}:`}
      {hours > 0 && `${convertToTwoDigit(hours)}:`}
      {convertToTwoDigit(minutes)}:{convertToTwoDigit(seconds)}
    </div>
  );
}

export default TestTimer2;
