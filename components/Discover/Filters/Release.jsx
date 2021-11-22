import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import _find from "lodash/find";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

export default function Release() {
  return (
    <>
      <Typography variant="body2">Release Dates</Typography>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <TextField
            id="from_date"
            label="From"
            type="date"
            fullWidth
            defaultValue={moment()}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextField
            id="to_date"
            label="To"
            type="date"
            fullWidth
            defaultValue={moment()}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
