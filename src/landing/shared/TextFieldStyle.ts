import TextField from '@mui/material/TextField';
import { styled } from '@mui/material';

export const TextFieldStyle = styled(TextField)({
  input: { color: '#1D1B1C' },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type="number"]': {
    MozAppearance: 'textfield',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1D1B1C', // Set the default border color here
  },
  '& .MuiInputLabel-root': {
    color: '#1D1B1C', // Set the desired color for the label
  },
 
    '&.MuiOutlinedInput-root:hover': {
      borderColor: '#1D1B1C !important', // Set the desired border color for hover
    },
 
});
