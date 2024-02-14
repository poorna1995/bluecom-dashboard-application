import React, { useState } from "react";
import Select, { components } from "react-select";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import makeAnimated from "react-select/animated";

import CreatableSelect from "react-select/creatable";

const animatedComponents = makeAnimated();

const customStyles = {
  multiValueRemove: (styles) => ({
    ...styles,
    marginLeft: "16px",
    ":hover": {
      backgroundColor: "#484A9E",
      color: "white",
      borderRadius: "50%",
    },
  }),
  multiValue: (base) => ({
    ...base,
    // border: `2px dotted #484a9e`,
    borderRadius: "20px",
    paddingLeft: "16px",
    // display: "none",
    // paddingRight: "16px",
  }),

  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "10px",
    ":hover": {
      //   border: "1px",
    },
  }),
};

const controlStyles = {
  border: "1px solid black",
  padding: "5px",
  //   background: "transparent",
  //   color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
  borderRadius: "10px",
};

const ControlComponent = (props) => (
  <div style={controlStyles}>
    <components.Control {...props} />
    {/* <PrimaryButton
      title="Send"
      style={{ flex: 0.2, height: "35px", borderRadius: "10px" }}
    /> */}
  </div>
);
const SelectContainer = ({ children, ...props }) => {
  return (
    <components.SelectContainer {...props}>
      {children}
    </components.SelectContainer>
  );
};

const IndicatorsContainer = (props) => {
  return (
    <div>
      {/* <PrimaryButton title="Send" /> */}
      <div style={{ display: "none" }}>
        <components.IndicatorsContainer {...props} />
      </div>
    </div>
  );
};

const mapState = ({ user }) => ({
  user: user,
});
const CreatableInputField = ({
  types,
  setTypes,
  options,
  handleChange,
  ...props
}) => {
  const ref = React.createRef();
  // const options = [];
  // const [types, setTypes] = useState([]);
  // const handleChange = (e) => {
  //   setTypes(e);
  // };

  // const typeList = types.map((item) => {
  //   const { label } = item;
  //   return label;
  // });
  // console.log({ typeList });

  // console.log(emails);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%", paddingRight: "16px" }}>
        <CreatableSelect
          isMulti
          styles={customStyles}
          closeMenuOnSelect={true}
          // components={{
          //   SelectContainer,
          //   IndicatorsContainer,
          //   // Control: ControlComponent,
          // }}
          options={options}
          components={{ IndicatorsContainer }}
          placeholder="Enter Related Topics"
          // isMulti
          ref={ref}
          value={types}
          onChange={handleChange}
          isClearable
          theme={(theme) => ({
            ...theme,
            // borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "#484A9E",
            },
            borderColor: theme.primary,
          })}
          // styles={{
          //   container: (base) => ({
          //     ...base,
          //     backgroundColor: "transparent",
          //     //   padding: 5,
          //     border: "none",
          //     height: "48px",
          //   }),
          // }}
          // options={colourOptions}
          {...props}
        />
      </div>
    </div>
  );
};
export default CreatableInputField;
