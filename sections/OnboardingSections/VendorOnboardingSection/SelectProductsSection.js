import { CheckBox } from "@mui/icons-material";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import React from "react";

export default function SelectProductsSection({ products }) {
  return (
    <div>
      {Array.isArray(products) &&
        products.map((item, index) => (
          <div key={index}>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={gilad}
                    // onChange={handleChange}
                    name={item.title}
                  />
                }
                label={<span style={{ fontWeight: "600" }}>{item.title}</span>}
              />
            </FormControl>
          </div>
        ))}
    </div>
  );
}
