import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

export const PriceRangeInput = ({ onChange }) => {
  const [priceFrom, setPriceFrom] = useState(299);
  const [priceTo, setPriceTo] = useState(49999);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setPriceFrom(value);
    onChange({ priceFrom: value, priceTo });
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setPriceTo(value);
    onChange({ priceFrom, priceTo: value });
  };

  return (
    <Box sx={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="caption" sx={{fontSize: '12px', fontWeight: 600,  letterSpacing: '-0.0375rem', lineHeight: '1.75rem'}}>Price from</Typography>
      <TextField
        value={priceFrom}
        onChange={(e) => handleFromChange(e.target.value)}
        type="number"
        size="small"
        sx={{ width: '80px', marginRight: '5px' }}
      />
      </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="caption" sx={{fontSize: '12px', fontWeight: 600, letterSpacing: '-0.0375rem', lineHeight: '1.75rem'}}>Price to</Typography>
      <TextField
        value={priceTo}
        onChange={(e) => handleToChange(e.target.value)}
        type="number"
        size="small"
        sx={{ width: '100px', marginLeft: '5px' }}
      />
    </Box>
    </Box>
  );
};
