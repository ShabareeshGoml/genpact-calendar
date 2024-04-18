"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ButtonComponent from "@/components/Button/ButtonComponent";
import "./addagent.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { fetchAllProductList } from "@/services/apiServices/productPage";
import { createAgent } from "@/services/apiServices/addAgent";
import { ToastContainer, toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 250,
    },
  },
};
const names = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturady",
  "Sunday",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddAgent() {
  const theme = useTheme();

  useEffect(() => {
    fetchAllProductList().then((product) => {
      setproductList(product);
    });
  }, []);

  const [personName, setPersonName] = React.useState([]);
  const [formValues, setformValues] = useState({
    name: "",
    email: "",
    product: "",
    shift_from: "",
    shift_to: "",
  });
  const [productList, setproductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleChangeProduct = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onChangeHandler = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onCompleteForm = () => {
    const today = new Date();
    const agent = {
      full_name: formValues?.name,
      date_of_joining: today?.toISOString(),
      slot_time: 45,
      buffer_time: 15,
      product_id: formValues?.product,
      agent_email: formValues?.email,
      shift_from: formValues?.shift_from,
      shift_to: formValues?.shift_to,
      weekly_off: personName,
    };
    createAgent(agent)
      .then((res) => {
        console.log(res);
        toast.success(res?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setformValues({
          name: "",
          email: "",
          product: "",
          shift_from: "",
          shift_to: "",
        });
        setPersonName([]);
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      });
    // console.log(agent, "agent");
  };
  //   console.log(personName, formValues, new Date(), "personName");

  return (
    <div className="form-main">
      <ToastContainer />
      <label className="book-label">Create New Agent</label>
      <div className="book-slot-picker-hero-container-form">
        <div className="input-pop-up">
          <label>Name</label>
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Agent Name"
            name="name"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.name}
            className="inputField-ctmz"
            // disabled
          />
        </div>
        <div className="input-pop-up">
          <label>Email</label>
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Email"
            type="email"
            name="email"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.email}
            className="inputField-ctmz"
          />
        </div>
        <div className="input-pop-up">
          <label>Select Product</label>
          <Select
            // labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formValues?.product}
            name="product"
            // label="Product"
            onChange={onChangeHandler}
            className="inputField-ctmz"
            size="small"
          >
            {productList?.map((product) => (
              <MenuItem value={product?.id}>{product?.name}</MenuItem>
            ))}
          </Select>
        </div>

        <div className="input-pop-up">
          <label>Pick Days</label>
          <FormControl>
            <Select
              //   labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              size="small"
              className="inputField-ctmz"
              value={personName}
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  //   label="Pick days"
                  size="small"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="input-pop-up">
          <label>Shift From</label>
          <TextField
            required
            size="small"
            id="outlined-required"
            // label="start"
            type="time"
            name="shift_from"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.shift_from}
            className="inputField-ctmz"
          />
        </div>
        <div className="input-pop-up">
          <label>Shift To</label>
          <TextField
            required
            size="small"
            id="outlined-required"
            // label="start"
            type="time"
            name="shift_to"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.shift_to}
            className="inputField-ctmz"
          />
        </div>
      </div>
      <div className="book-btn-container">
        <ButtonComponent
          name={"Create"}
          variant={"contained"}
          //   disabled={value === "" || selectedTimeSlot === null}
          onClick={onCompleteForm}
        />
      </div>
    </div>
  );
}

export default AddAgent;
