import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";

export default function CustomSelectComponent({ options }) {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      // value={selectedStore}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          // component="li"
          //  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          sx={{
            // display: "flex",
            // flexDirection: "column",
            cursor: "pointer",
            // alignItems: "start",
            // textAlign: "left",
            // alignItems:"flex-start"
          }}
          {...props}
        >
          <Typography
            component="p"
            sx={{
              fontWeight: "700",
              lineHeight: "28px",
            }}
          >
            {option.label}
          </Typography>
          <br />
          <Typography component="p">{option.address1}</Typography>
          <br />
          <Typography component="p">
            ({option.state}) -{option.zipcode}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
