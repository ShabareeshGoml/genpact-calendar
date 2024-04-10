"use client";
import React, { useEffect, useState } from "react";
import "./MarkShiftDetails.css";
import { addSchedule, fetchAllAgents } from "@/services/apiServices/markShift";
import { fetchAllProductList } from "@/services/apiServices/productPage";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MarkShiftDetails() {
  useEffect(() => {
    fetchAllAgents().then((agent) => setagentListOption(agent));
    fetchAllProductList().then((product) => setproductList(product));
  }, []);

  const [agentListOption, setagentListOption] = useState([]);
  const [productList, setproductList] = useState([]);
  const [formValue, setformValue] = useState({
    agent_id: "",
    call_name: "",
    date: "",
    shift_from: "",
    shift_to: "",
    alloted_product_id: "",
    slot_duration_mins: "",
  });

  const handelOnChange = (e) => {
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const isObjectEmpty = (obj) => {
    let empty = Object.keys(obj).filter(
      (key) => obj[key] === null || obj[key] === undefined || obj[key] === ""
    );

    return empty.length !== 0;
  };

  const onMarkShiftClick = (e) => {
    e.preventDefault();
    const shift = {
      agent_id: parseInt(formValue?.agent_id),
      call_name: formValue?.call_name,
      date: moment(formValue?.date).format("YYYY-MM-DD"),
      shift_from: formValue?.shift_from,
      shift_to: formValue?.shift_to,
      alloted_product_id: parseInt(formValue?.alloted_product_id),
      slot_duration_mins: parseInt(formValue?.slot_duration_mins),
    };
    addSchedule(shift).then((e) => {
      console.log(e);
      setformValue({
        agent_id: "",
        call_name: "",
        date: "",
        shift_from: "",
        shift_to: "",
        alloted_product_id: "",
        slot_duration_mins: "",
      });
      toast.success("Schedule Added Succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    });
  };

  let isShiftDisable = isObjectEmpty(formValue);
  console.log(formValue, isObjectEmpty(formValue), "list");

  return (
    <div className="shift-hero-container">
      <h2>Mark Shift For Sub-Agents</h2>
      <div className="shift-input-fields-hero-container">
        <div className="shift-duo-container">
          <div className="shift-input-container">
            <label className="shift-input-label">Select Agent</label>
            <select
              className="shift-input"
              name="agent_id"
              onChange={handelOnChange}
              value={formValue?.agent_id}
            >
              <option disabled value=""></option>
              {agentListOption?.map((agent) => (
                <option key={agent?.id} value={agent?.id}>
                  {agent?.first_name + " " + agent?.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="shift-input-container">
            <label className="shift-input-label">Agent Call Name</label>
            <input
              className="shift-input"
              type="text"
              name="call_name"
              onChange={handelOnChange}
              value={formValue?.call_name}
            />
          </div>
        </div>
        <div className="shift-duo-container">
          <div className="shift-input-container">
            <label className="shift-input-label">Select Product</label>
            <select
              className="shift-input"
              name="alloted_product_id"
              onChange={handelOnChange}
              value={formValue?.alloted_product_id}
            >
              <option value="" disabled></option>
              {productList?.map((product) => (
                <option key={product?.id} value={product?.id}>
                  {product?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="shift-input-container">
            <label className="shift-input-label">Date</label>
            <input
              className="shift-input"
              type="date"
              name="date"
              onChange={handelOnChange}
              value={formValue?.date}
            />
          </div>
        </div>
        <div className="shift-duo-container">
          <div className="shift-input-container">
            <label className="shift-input-label">Start Time</label>
            <input
              className="shift-input"
              name="shift_from"
              type="text"
              onChange={handelOnChange}
              value={formValue?.shift_from}
            />
          </div>
          <div className="shift-input-container">
            <label className="shift-input-label">End Time</label>
            <input
              className="shift-input"
              name="shift_to"
              type="text"
              onChange={handelOnChange}
              value={formValue?.shift_to}
            />
          </div>
        </div>

        <div className="shift-duo-container">
          <div className="shift-input-container">
            <label className="shift-input-label">
              Slot Duration In Minutes
            </label>
            <input
              className="shift-input"
              type="text"
              name="slot_duration_mins"
              onChange={handelOnChange}
              value={formValue?.slot_duration_mins}
            />
          </div>
        </div>

        <div className="shift-submit-button-container">
          <button
            className="shift-submit-button"
            disabled={isShiftDisable}
            onClick={onMarkShiftClick}
          >
            Mark Shift
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MarkShiftDetails;
