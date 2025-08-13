import { useEffect, useState } from 'react';

/**
 * Clock 컴포넌트
 *
 * 실시간 시계를 표시하고 사용자가 시계를 시작하거나 정지할 수 있는 React 함수형 컴포넌트입니다.
 * 시간은 "시", "분", "초"로 나뉘어 표시됩니다.
 *
 * 주요 기능:
 * - 현재 시간을 "HH:mm:ss" 형식으로 표시합니다.
 * - 시계가 실행 중일 때 매초마다 시간을 업데이트합니다.
 **/
const Clock = () => {
  const [time, setTime] = useState('');
  const [toggleBt, setToggleBt] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  const CurrentTime = () => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    return setTime(`${hour} : ${minutes} : ${seconds}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      CurrentTime();
    }, 1000);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  const timerStart = () => {
    if (!intervalId) {
      const id = setInterval(() => CurrentTime(), 1000);
      setIntervalId(id);
      setToggleBt(true);
    }
  };
  const timerStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setToggleBt(false);
    }
  };

  return (
    <div className="timer-container">
      <div>{time}</div>
      {toggleBt ? (
        <button onClick={timerStop} className="stop bt">
          타이머 정지
        </button>
      ) : (
        <button onClick={timerStart} className="start bt">
          타이머 시작
        </button>
      )}
    </div>
  );
};

export default Clock;
