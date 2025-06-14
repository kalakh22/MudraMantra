import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cartContent: {
    paddingTop: 0,
  },
  divider: {
    margin: '20px 0',
  },

  list: {
    maxHeight: '160px', // Show only ~2 items
    overflowY: 'auto',
  },
  avatarIncome: {
    color: '#fff',
    backgroundColor: '#4caf50', // Green
  },
  avatarExpense: {
    color: '#fff',
    backgroundColor: '#f44336', // Red
  },
}));
