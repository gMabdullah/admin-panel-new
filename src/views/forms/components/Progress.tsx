import React from 'react'
import {  CircularProgress, LinearProgress } from '@mui/material';
import { makeStyles , withStyles} from '@mui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
type progressType ={
  type?:string
}
const BorderLinearProgress = withStyles({
  root: {
    height: 3,
  
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);

const Progress=({type}:progressType)=> {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    const progress=()=> {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={classes.root}>
     {( type !== 'undefined' && type !== '' && type == 'circle') ?
        <CircularProgress color="secondary" size = {'1.4rem'}/>
        :
        <BorderLinearProgress variant="determinate" value={completed} color="secondary" />
      }
      
      </div>
  )
}

export default Progress