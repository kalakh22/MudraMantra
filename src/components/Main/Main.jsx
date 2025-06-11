import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles  from './styles';
import Form from './Form/Form';
import List from './List/List';

const Main = () => {
const classes = useStyles();
const { balance } = useContext(ExpenseTrackerContext);
  return (
    <Card className={`${classes.root} ${classes.glowCard}`}>
      <div
  style={{
    background: 'radial-gradient(circle, #ffffff, #f0f0f0)',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginBottom: '1rem'
  }}
>
  <Typography variant="h4" align="center" style={{ fontWeight: 'bold', color: '#333' }}>
    MudraMantra
  </Typography>
  <Typography variant="subtitle1" align="center" style={{ color: '#666' }}>
    Voice-powered Expense Tracker
  </Typography>
</div>

      <CardContent>
        <Typography align="center" variant="h5">Total Balance: ${balance}</Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
        </Typography>
        <Divider />
        <Form />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Main
