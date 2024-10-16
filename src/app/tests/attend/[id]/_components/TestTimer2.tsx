import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
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
    <Button
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      {label ? label : 'Time Left'}{' '}
      {days > 0 && `${convertToTwoDigit(days)}:`}
      {hours > 0 && `${convertToTwoDigit(hours)}:`}
      {convertToTwoDigit(minutes)}:{convertToTwoDigit(seconds)}
    </Button>
  );
}

export default TestTimer2;
