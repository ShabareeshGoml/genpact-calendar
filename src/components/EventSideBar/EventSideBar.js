import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
import "./eventSideBar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import moment from "moment";
import {
  bookSlot,
  fetchSlotsFromDate,
  getAgentList,
} from "@/services/apiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callIcon } from "@/assets";
import Image from "next/image";
import {
  bookTimeSlot,
  createAppointment,
  createCustomerId,
  fetchAvailableSlots,
} from "@/services/apiServices/bookingAppointment";
import { fetchAllAgents } from "@/services/apiServices/markShift";
import { useRouter } from "next/navigation";
// import callIcon from "../../assets/icons/call.png";

function EventSideBar({
  selectedDate,
  isClient,
  productId,
  userInfo,
  agentId,
}) {
  const router = useRouter();
  const defaultDate = selectedDate || moment(new Date()).format("YYYY-MM-DD");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formValues, setformValues] = useState({
    name: userInfo?.username,
    email: userInfo?.email_id,
    message: "",
    phone: userInfo?.mobile_no,
    time: "",
  });
  const [selectedTimeSlot, setselectedTimeSlot] = useState({});
  const [selectedAgent, setselectedAgent] = useState(agentId);
  const [agentOption, setagentOption] = useState(null);
  const [timeSlotOptions, settimeSlotOptions] = useState(null);

  // useEffect(() => {
  //   fetchAllAgents().then((agent) => {
  //     setagentOption(agent);
  //     setselectedAgent(agent[0]?.id);
  //   });
  // }, []);
  useEffect(() => {
    setformValues({
      name: userInfo?.username,
      email: userInfo?.email_id,
      message: "",
      time: "",
      phone: userInfo?.mobile_no,
    });
  }, [userInfo]);

  useEffect(() => {
    if (isClient) {
      fetchAvailableSlots(productId, defaultDate, "customer").then((e) =>
        settimeSlotOptions(e)
      );
    } else {
      fetchAvailableSlots(productId, defaultDate, "agent", agentId).then((e) =>
        settimeSlotOptions(e)
      );
    }
  }, [productId, defaultDate, selectedAgent]);

  // const getTimeSlot = async () => {
  //   let response = await fetchSlotsFromDate(defaultDate, selectedAgent);
  //   settimeSlotOptions(response);
  // };
  const onChangeHandler = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    // setformValues({
    //   name: "",
    //   email: "",
    //   message: "",
    //   // productType: "",
    //   phone: "",
    // });
  }
  const onSelectingTimeSlot = (time) => {
    setselectedTimeSlot(time);
    openModal();
  };

  const onSlotBook = (e) => {
    e.preventDefault();
    // const customerInfo = {
    //   username: formValues?.name,
    //   email_id: formValues?.email,
    //   mobile_no: formValues?.phone,
    // };
    // console.log(customerInfo, "on Button Press");
    // createCustomerId(customerInfo).then(async (e) => {
    //   console.log(e, "customerCreated");

    // });
    const schedule = {
      customer_id: userInfo?.id,
      // schedule_id: selectedTimeSlot?.id,
      // from_time: selectedTimeSlot?.start,
      // to_time: selectedTimeSlot?.end,
      agent_id: 4,
      appointment_description: formValues?.message,
      scheduled_at: new Date(
        defaultDate + " " + formValues?.time
      ).toISOString(),
    };
    console.log(schedule, "schedule");
    createAppointment(schedule)
      .then((slotConfirm) => {
        // closeModal();
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
            `/customer/bookedAppointment?customer_id=${userInfo?.id}&product_id=${productId}`,
            {
              scroll: false,
            }
          );
        } else {
          toast.error("Booking Failed", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.error("Booking Failed", {
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
  const handelOnAgentChange = (e) => {
    setselectedAgent(e?.target?.value);
    // getTimeSlot();
  };

  const isObjectEmpty = (obj) => {
    let empty = Object.keys(obj).filter(
      (key) => obj[key] === null || obj[key] === undefined || obj[key] === ""
    );

    return empty.length !== 0;
  };

  let isBookDisable = isObjectEmpty(formValues);

  const onCallButtonClick = (e) => {
    console.log("but click");
    // e.stopPropagation();
    toast.success("Call Initiated Successfully!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };
  // const selectedAgentName = agentOption?.filter(
  //   (e) => e.agent_id === selectedAgent
  // )?.[0]?.agent_name;

  console.log(
    formValues,
    new Date(defaultDate + " " + formValues?.time).toISOString(),
    "test2"
  );

  return (
    <>
      {" "}
      <div className={"evnt-side-bar-hero-container"}>
        <div className="display-center">
          {/* Available Time Slots - {selectedDate || defaultDate} */}
          {isClient ? (
            <>
              <p>Selected Date : {defaultDate}</p>
            </>
          ) : (
            <>
              <p>Selected Date : {defaultDate}</p>
              {/* <p>Select agent to book slots</p> */}
              {/* <div className="input-agent">
                <label>Agent</label>
                <select
                  className="select-container"
                  name="agentName"
                  onChange={handelOnAgentChange}
                >
                  {agentOption?.map((agent) => (
                    <option key={agent?.id} value={agent?.id}>
                      {agent?.first_name + " " + agent?.last_name}
                    </option>
                  ))}
                </select>
              </div> */}
            </>
          )}
        </div>
        <div className={"evnt-time-slot-section"}>
          {/* {timeSlotOptions && timeSlotOptions?.length !== 0 ? (
            timeSlotOptions?.map((time, index) => (
              <span
                key={time?.start + index}
                onClick={() => (isClient ? onSelectingTimeSlot(time) : {})}
                className={`${
                  time?.is_booked === false
                    ? `evnt-time-mrg`
                    : `evnt-time-mrg-disable`
                }`}
              >
                <span
                // className="evnt-side-bar-time-span"
                >
                  {time?.start} - {time?.end}
                </span>
                {!isClient && time?.is_booked === true && (
                  <span className="cur-point" onClick={onCallButtonClick}>
                    <Image src={callIcon} width={30} height={30} alt="icon" />
                  </span>
                )}

              </span>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No Slots Available</p>
          )} */}
          <>
            {/* <div className="modal-heading">
              <div>
                Book Time Slot for {selectedTimeSlot?.start} -{" "}
                {selectedTimeSlot?.end}
              </div>
            </div> */}
            <div className="inside-box-form">
              <div className="input-pop-up">
                <label>Name</label>
                <input
                  type={"text"}
                  className="input-container"
                  name="name"
                  onChange={(e) => onChangeHandler(e)}
                  value={formValues?.name}
                />
              </div>
              <div className="input-pop-up">
                <label>Email</label>
                <input
                  type={"email"}
                  className="input-container"
                  name="email"
                  onChange={(e) => onChangeHandler(e)}
                  value={formValues?.email}
                />
              </div>
              <div className="input-pop-up">
                <label>Phone No</label>
                <input
                  type={"tel"}
                  className="input-container"
                  name="phone"
                  onChange={(e) => onChangeHandler(e)}
                  value={formValues?.phone}
                />
              </div>
              <div className="input-pop-up">
                <label>Select Time</label>
                <input
                  type="time"
                  className="input-container"
                  name="time"
                  onChange={(e) => onChangeHandler(e)}
                  value={formValues?.time}
                />
              </div>
              <div className="input-pop-up">
                <label>Message</label>
                <textarea
                  name="message"
                  className="input-txtArea"
                  onChange={(e) => onChangeHandler(e)}
                  value={formValues?.message}
                />
              </div>
              <button
                className="cutm-button"
                onClick={onSlotBook}
                disabled={isBookDisable}
              >
                Book Slot
              </button>
            </div>
          </>
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <>
          <div className="modal-heading">
            <div>
              Book Time Slot for {selectedTimeSlot?.start} -{" "}
              {selectedTimeSlot?.end}
            </div>
          </div>
          <div className="modal-body">
            <div className="input-pop-up">
              <label>Name</label>
              <input
                type={"text"}
                className="input-container"
                name="name"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.name}
              />
            </div>
            <div className="input-pop-up">
              <label>Email</label>
              <input
                type={"email"}
                className="input-container"
                name="email"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.email}
              />
            </div>
            <div className="input-pop-up">
              <label>Phone No</label>
              <input
                type={"tel"}
                className="input-container"
                name="phone"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.phone}
              />
            </div>
            {/* <div className="input-pop-up">
              <label>Product Type</label>
              <input
                type={"text"}
                className="input-container"
                name="productType"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.productType}
              />
            </div> */}
            <div className="input-pop-up">
              <label>Message</label>
              <textarea
                name="message"
                className="input-txtArea"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.message}
              />
            </div>
            <button
              className="cutm-button"
              onClick={onSlotBook}
              disabled={isBookDisable}
            >
              Book Slot
            </button>
          </div>
        </>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EventSideBar;
