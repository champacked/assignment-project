import React, { useState, useCallback } from "react";
import {
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Plus, Minus, RotateCcw } from "lucide-react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getBackgroundHeight = useCallback(() => {
    return `${Math.min(100, Math.max(0, count * 2))}%`;
  }, [count]);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", sm: "400px", md: "500px" },
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "secondary.light",
          height: getBackgroundHeight(),
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: { xs: 2, sm: 3, md: 4 },
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h3" : "h2"}
          sx={{ color: "primary.main" }}
        >
          {count}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="contained"
            onClick={() => setCount((prev) => prev + 1)}
            startIcon={<Plus />}
            fullWidth={isMobile}
          >
            Increment
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCount(0)}
            startIcon={<RotateCcw />}
            fullWidth={isMobile}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => setCount((prev) => prev - 1)}
            startIcon={<Minus />}
            fullWidth={isMobile}
          >
            Decrement
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Counter;
