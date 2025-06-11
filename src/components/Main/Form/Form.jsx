import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  TextField, Typography, Grid, Button, FormControl, InputLabel,
  Select, MenuItem, IconButton, Snackbar, CircularProgress
} from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import useSpeechRecognition from '../../../hooks/useSpeechRecognition';
import MicIcon from '@material-ui/icons/Mic';
import * as chrono from 'chrono-node';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const formRef = useRef(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { transcript, startListening } = useSpeechRecognition();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false); // NEW

  const updateForm = (updates) => {
    setFormData((prev) => {
      const updated = { ...prev, ...updates };
      formRef.current = updated;
      return updated;
    });
  };

  const createTransaction = () => {
    setLoading(true); // Start loading

    setTimeout(() => {
      const transaction = {
        ...formRef.current,
        amount: Number(formRef.current.amount),
        id: uuidv4(),
      };

      addTransaction(transaction);
      setFormData(initialState);
      formRef.current = initialState;
      setLoading(false); // Stop loading
      setOpenSnackbar(true); // Show toast
    }, 1500); // simulate delay
  };

  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();

      if (lowerTranscript.includes('income')) {
        updateForm({ type: 'Income' });
      } else if (lowerTranscript.includes('expense')) {
        updateForm({ type: 'Expense' });
      }

      [...incomeCategories, ...expenseCategories].forEach((cat) => {
        if (lowerTranscript.includes(cat.type.toLowerCase())) {
          updateForm({ category: cat.type });
        }
      });

      const amountMatch = lowerTranscript.match(/(\d+(\.\d+)?)/);
      if (amountMatch) {
        updateForm({ amount: amountMatch[0] });
      }

      const parsedDate = chrono.parseDate(transcript);
      if (parsedDate) {
        updateForm({ date: formatDate(parsedDate) });
      }

      const timeout = setTimeout(() => {
        const { amount, category, type } = formRef.current;
        if (amount && category && type) {
          createTransaction();
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [transcript]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {transcript ? `You said: "${transcript}"` : 'Tap the mic and speak your transaction'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => updateForm({ type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => updateForm({ category: e.target.value })}
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => updateForm({ amount: e.target.value })}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => updateForm({ date: formatDate(e.target.value) })}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={createTransaction}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Create'}
        </Button>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <IconButton
          onClick={startListening}
          color="secondary"
          style={{ backgroundColor: '#f1f1f1' }}
        >
          <MicIcon />
        </IconButton>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Transaction added successfully!"
      />
    </Grid>
  );
};

export default Form;
