import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.circle} />
      <div className={classes.circle} />
      <div className={classes.circle} />
      <div className={classes.circle} />
    </div>
  );
};

export default Loader;
