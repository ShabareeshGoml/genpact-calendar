"use client";
import React, { useEffect, useState } from "react";
import styles from "../../page.module.css";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import EventSideBar from "@/components/EventSideBar/EventSideBar";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  createAppointment,
  fetchCustomerDetails,
  getAgent,
  getAppointmentDetails,
  updateAppointment,
} from "@/services/apiServices/bookingAppointment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./bookAppointment.css";
import { availableSlotTime } from "@/utils/constants";
import ButtonComponent from "@/components/Button/ButtonComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { isObjectEmpty } from "@/utils/functions";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  const appointmentID = searchParams.get("appointment_id");
  //getAppointmentDetails
  useEffect(() => {
    fetchCustomerDetails(customerId).then((e) => {
      setformValues({
        ...formValues,
        name: e?.username,
        email: e?.email_id,
        phone: e?.mobile_no,
      });
      // setuserDetails(e);
    });
    if (appointmentID) {
      getAppointmentDetails(appointmentID).then((e) => {
        console.log(e?.appointment_details, "aqua");
        setappDes(e?.appointment_details[0]?.appointment_description);
      });
    }
  }, []);

  // const [selectedDate, setselectedDate] = useState(null);
  const [selectedTimeSlot, setselectedTimeSlot] = useState(null);
  const [userDetails, setuserDetails] = useState({});
  const [value, onChange] = useState("");
  const [appDes, setappDes] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [showForm, setshowForm] = useState(false);
  const [formValues, setformValues] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleChange = (event) => {
    setTimeZone(event.target.value);
  };
  const onTimeSlotSelection = (time) => {
    setselectedTimeSlot(time);
  };

  const onCompleteForm1 = () => {
    setshowForm(true);
  };

  const onClickBack = () => {
    setshowForm(false);
  };

  const onCreateAppointment = () => {
    if (appointmentID) {
      const schedule = {
        date: moment(new Date(value)).format("DD-MM-YY"),
        start_time: selectedTimeSlot?.start,
        end_time: selectedTimeSlot?.end,
      };
      updateAppointment(appointmentID, schedule).then((e) => {
        console.log(e, "app");
        if (e?.message === "Appointment updated successfully.") {
          toast.success(e?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          router.push(
            `/customer/bookedAppointment?customer_id=${customerId}&product_id=${productId}`,
            {
              scroll: false,
            }
          );
        }
      });
    } else {
      getAgent(productId, moment(new Date(value)).format("YYYY-MM-DD")).then(
        (agentId) => {
          console.log(agentId);
          const schedule = {
            customer_id: customerId,
            date: moment(new Date(value)).format("YY-MM-DD"),
            agent_id: agentId,
            appointment_description: formValues?.message,
            start_time: selectedTimeSlot?.start,
            end_time: selectedTimeSlot?.end,
          };
          console.log(schedule, "schedule");
          createAppointment(schedule).then((slotConfirm) => {
            if (slotConfirm?.payload?.appointment_id) {
              console.log(slotConfirm?.payload?.appointment_id, "slot");
              toast.success("Booking Confirmed", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              });
              router.push(
                `/customer/bookedAppointment?customer_id=${customerId}&product_id=${productId}`,
                {
                  scroll: false,
                }
              );
            } else {
              toast.error(slotConfirm?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              });
            }
          });
          // .catch((err) => {
          //   toast.error("Booking Failed", {
          //     position: "top-right",
          //     autoClose: 3000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     theme: "light",
          //   });
          // });
        }
      );
    }
  };

  let isFormValueDisable = appointmentID ? false : isObjectEmpty(formValues);
  console.log(formValues, appDes, "test");
  return (
    <div className="book-hero-container">
      <ToastContainer />
      {!showForm ? (
        <>
          <label className="book-label">Choose a Date</label>
          <div className="book-calendar-container">
            <Calendar
              onChange={onChange}
              value={value}
              className={"calendar-react"}
              // minDate={new Date()}
            />
            {/* <CalendarComponent onDaySelection={(date) => onDaySelection(date)} /> */}
          </div>
          <label className="book-label">Pick a time</label>
          {/* <div className="time-zone-picker-cnt">
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Time Zone
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={timeZone}
                label="Time Zone"
                size="small"
                onChange={handleChange}
                style={{ width: "320px", height: "50px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div> */}

          <div className="book-slot-picker-hero-container">
            {availableSlotTime?.map((slot) => (
              <span
                //book-slot-cnt-selected
                className={`book-slot-cnt ${
                  selectedTimeSlot?.id === slot?.id && `book-slot-cnt-selected`
                }`}
                key={slot?.id}
                onClick={() => onTimeSlotSelection(slot)}
              >
                {slot?.start + " - " + slot?.end}
              </span>
            ))}
          </div>
          <div className="book-btn-container">
            <ButtonComponent
              name={"Continue"}
              variant={"contained"}
              disabled={value === "" || selectedTimeSlot === null}
              onClick={onCompleteForm1}
            />
          </div>
        </>
      ) : (
        <>
          <label className="book-label">User Details</label>
          <div className="book-slot-picker-hero-container">
            <div className="input-pop-up">
              <label>Name</label>
              <TextField
                required
                size="small"
                id="outlined-required"
                label="Name"
                name="name"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.name}
                className="inputField-ctmz"
                disabled
              />
              {/* <input
            type={"text"}
            className="input-container"
            name="name"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.name}
          /> */}
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
                disabled
              />
              {/* <input
            type={"email"}
            className="input-container"
            name="email"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.email}
          /> */}
            </div>
            <div className="input-pop-up">
              <label>Phone No</label>
              <TextField
                required
                size="small"
                id="outlined-required"
                label="Phone"
                type="tel"
                name="phone"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.phone}
                className="inputField-ctmz"
                disabled
              />
              {/* <input
            type={"tel"}
            className="input-container"
            name="phone"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.phone}
          /> */}
            </div>
            {/* <div className="input-pop-up">
          <label>Select Time</label>
          <input
            type="time"
            className="input-container"
            name="time"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.time}
          />
        </div> */}
            <div className="input-pop-up">
              <label>Message</label>
              <TextField
                multiline
                rows={2}
                maxRows={4}
                name="message"
                onChange={(e) => onChangeHandler(e)}
                value={appDes || formValues?.message}
                className="inputField-ctmz"
                disabled={appointmentID ? true : false}
              />
              {/* <textarea
            name="message"
            className="input-txtArea"
            onChange={(e) => onChangeHandler(e)}
            value={formValues?.message}
          /> */}
            </div>

            {/* <button
          className="cutm-button"
          // onClick={onSlotBook}
          // disabled={isBookDisable}
        >
          Book Slot
        </button> */}
          </div>
          <div className="book-btn-dual-cntr">
            <ButtonComponent
              name={"back"}
              variant={"outlined"}
              onClick={onClickBack}
            />

            <ButtonComponent
              name={"Continue"}
              variant={"contained"}
              disabled={isFormValueDisable}
              onClick={onCreateAppointment}
            />
          </div>
        </>
      )}

      {/* <div style={{ width: "22%", maxHeight: "82dvh !important" }}>
        <EventSideBar
          selectedDate={selectedDate}
          isClient={true}
          productId={productId}
          userInfo={userDetails}
        />
      </div> */}
    </div>
  );
}

export default BookAppointment;
