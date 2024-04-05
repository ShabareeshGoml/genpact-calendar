import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
import "./eventSideBar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import moment from "moment";
import { fetchSlotsFromDate, getAgentList } from "@/services/apiServices";

const customStyles = {
  content: {
    top: "25%",
    left: "40%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

function EventSideBar({ selectedDate, isClient }) {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formValues, setformValues] = useState({
    name: "",
    email: "",
    message: "",
    productType: "",
    phone: "",
  });
  const [selectedTimeSlot, setselectedTimeSlot] = useState({});
  const [selectedAgent, setselectedAgent] = useState(null);

  useEffect(() => {
    const getAgents = async () => {
      let response = await getAgentList();
      console.log(response?.data, "agents");
    };
    getAgents();
  }, []);

  useEffect(() => {
    getTimeSlot();
  }, [selectedDate]);

  const availableTimeSlot = [
    {
      start: "09:00",
      end: "09:30",
      flagBooked: false,
    },
    {
      start: "09:30",
      end: "10:00",
      flagBooked: true,
    },
    {
      start: "10:00",
      end: "10:30",
      flagBooked: false,
    },
  ];

  const getTimeSlot = async () => {
    let response = await fetchSlotsFromDate(selectedDate, selectedAgent);
    console.log(response?.data);
  };
  const onChangeHandler = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setformValues({
      name: "",
      email: "",
      message: "",
      productType: "",
      phone: "",
    });
  }
  const onSelectingTimeSlot = (time) => {
    setselectedTimeSlot(time);
    openModal();
  };

  const onSlotBook = () => {};
  const handelOnAgentChange = (e) => {
    console.log(e?.target?.value);
    setselectedAgent(e?.target?.value);
    getTimeSlot();
  };

  const agentOptions = [
    {
      agent_id: 3,
      agent_name: "Zack",
    },
    {
      agent_id: 123,
      agent_name: "Default Agent Name",
    },
    {
      agent_id: 2,
      agent_name: "Cody",
    },
    {
      agent_id: 4,
      agent_name: "Cody",
    },
    {
      agent_id: 11,
      agent_name: "Default Agent Name",
    },
    {
      agent_id: 1,
      agent_name: "Zack",
    },
  ];

  console.log("stat", formValues, selectedTimeSlot);
  return (
    <>
      {" "}
      <div className={"evnt-side-bar-hero-container"}>
        <div className="display-center">
          {/* Available Time Slots - {selectedDate || defaultDate} */}
          {isClient && (
            <>
              <p>Select agent to book slots</p>
              <div className="input-agent">
                <label>Agent</label>
                <select
                  className="select-container"
                  name="agentName"
                  onChange={handelOnAgentChange}
                >
                  {agentOptions?.map((agent) => (
                    <option key={agent?.agent_id} value={agent?.agent_id}>
                      {agent?.agent_name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        <div className={"evnt-time-slot-section"}>
          {availableTimeSlot?.map((time, index) => (
            <span
              key={time?.start}
              onClick={() => onSelectingTimeSlot(time)}
              className={`${
                time?.flagBooked === true
                  ? `evnt-time-mrg`
                  : `evnt-time-mrg-disable`
              }`}
            >
              <span
              // className="evnt-side-bar-time-span"
              >
                {time?.start} - {time?.end}
              </span>
              {/* <span className="horizental-line"></span> */}
            </span>
          ))}
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <>
          <div className="modal-heading">
            <div>
              Book Time Slot for {selectedTimeSlot?.timeSlotStart} -{" "}
              {selectedTimeSlot?.timeSlotEnd}
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
            <div className="input-pop-up">
              <label>Product Type</label>
              <input
                type={"text"}
                className="input-container"
                name="productType"
                onChange={(e) => onChangeHandler(e)}
                value={formValues?.productType}
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
            <button className="cutm-button">Book Slot</button>
          </div>
        </>
      </Modal>
    </>
  );
}

export default EventSideBar;
