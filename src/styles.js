import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  desktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '5%',
    },
  },
  last: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
      paddingBottom: '200px',
    },
  },
  grid: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  glowCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(6px)',
    borderRadius: '20px',
    boxShadow: '0 0 25px rgba(0, 255, 200, 0.2)',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',

    '&:hover': {
      boxShadow: '0 0 45px rgba(0, 255, 200, 0.4)',
      transform: 'scale(1.01)',
    },
  },
}));