import { useEffect, useState } from "react";

interface ITezosTimer {
  formatter: (time: string | Date) => string;
  to: Date;
}
const TezosTimer = (props: ITezosTimer) => {
  const { formatter, to } = props;
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return <>{currentTime < to ? formatter(to) : "Expired"}</>;
};

export default TezosTimer;
