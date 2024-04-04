import React, { useState } from "react";
// import Modal from "react-modal";
import "./eventSideBar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

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

function EventSideBar({ selectedDate }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formValues, setformValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedTimeSlot, setselectedTimeSlot] = useState({
    timeSlotStart: "",
    timeSlotEnd: "",
  });

  const availableTimeSlot = [
    "0:00",
    "0:30",
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
  ];

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
    });
  }
  const onSelectingTimeSlot = (selectedTime, selectedIndex) => {
    let endTime = availableTimeSlot[selectedIndex + 1];
    setselectedTimeSlot({
      timeSlotStart: selectedTime,
      timeSlotEnd: endTime,
    });
    openModal();
  };

  console.log("stat", formValues, selectedTimeSlot);
  return (
    <>
      {" "}
      <div className={"evnt-side-bar-hero-container"}>
        <div className="display-center">
          Available Time Slots - {selectedDate}
        </div>
        <div className={"evnt-time-slot-section"}>
          {availableTimeSlot?.map((time, index) => (
            <span key={time} className={"evnt-time-mrg"}>
              <span
                className="evnt-side-bar-time-span"
                onClick={() => onSelectingTimeSlot(time, index)}
              >
                {time}
              </span>
              <span className="horizental-line"></span>
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
