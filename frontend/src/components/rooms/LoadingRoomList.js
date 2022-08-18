import classes from './LoadingRoomList.module.css';

export const LoadingRoomCard = () => {
  return (
    <div className={classes.card}>
      <div />
      <div>
        <span>{/* */}</span>
        <span>{/* */}</span>
      </div>
    </div>
  );
};

export const LoadingRoomList = () => {
  const loadPages = [1, 2, 3, 4, 5, 6];
  return (
    <div className={classes.roomList}>
      {loadPages.map((num) => (
        <LoadingRoomCard key={num} />
      ))}
    </div>
  );
};
