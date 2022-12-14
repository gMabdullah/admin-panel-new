import { CircularProgress, LinearProgress } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

type progressType = {
  type?: string;
};

const BorderLinearProgress = withStyles({
  root: {
    height: 3,
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);

const Progress = ({ type }: progressType) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {type !== "undefined" && type !== "" && type === "circle" ? (
        <CircularProgress color="secondary" size={"1.4rem"} />
      ) : (
        <BorderLinearProgress color="secondary" />
      )}
    </div>
  );
};

export default Progress;
