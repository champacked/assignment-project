import React, { useState, useCallback } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  
  const getBackgroundHeight = useCallback(() => {
    return `${Math.min(100, Math.max(0, count * 2))}%`;
  }, [count]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: 'primary.light',
          height: getBackgroundHeight(),
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 4,
        }}
      >
        <Typography variant="h2">{count}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setCount(prev => prev + 1)}
            startIcon={<Plus />}
          >
            Increment
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCount(0)}
            startIcon={<RotateCcw />}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => setCount(prev => prev - 1)}
            startIcon={<Minus />}
          >
            Decrement
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Counter;