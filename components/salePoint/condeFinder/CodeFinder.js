import { Grid, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function CodeFinder() {
  const [code, setCode] = useState("");

  const addTocart = () => {
    console.log("addTocart");
  };
  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTocart();
          }}
        >
          <Grid container spacing={1} direction={'column'}>
            <Grid item display={'flex'}>
              <TextField
                label="Código"
                name="code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                size="small"
                fullWidth
                autoFocus
              />
              <IconButton type="submit">
                <AddShoppingCartIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
