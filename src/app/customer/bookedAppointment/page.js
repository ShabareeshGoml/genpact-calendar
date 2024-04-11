"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./bookedAppointment.css";
import {
  cancelBookedSlotsOfCustomer,
  fetchBookedSlotsOfCustomer,
} from "@/services/apiServices/bookedAppointment";
import { useSearchParams } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ButtonComponent from "@/components/Button/ButtonComponent";
import { useRouter } from "next/navigation";

function BookedAppointments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  useEffect(() => {
    fetchBookedSlotsOfCustomer(customerId).then((e) => {
      console.log(e, "cusDetails");
      setAppointmentDetails([{ ...e }]);
    });
  }, []);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);

  const rows = [
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
    {
      date: "2024-05-05",
      start: "10:00",
      end: "10:00",
      agent: "Zuck",
      desc: "my laptop not working ",
    },
  ];
  function openModal() {
    setRescheduleModalOpen(true);
  }
  function closeModal() {
    setRescheduleModalOpen(false);
  }
  const onRescheduleClick = () => {
    openModal();
  };
  const onCancelscheduleClick = () => {
    cancelBookedSlotsOfCustomer(customerId).then((e) => {
      closeModal();
      toast.success("Appointment Cancelled", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      router.push(
        `/customer/bookAppointment?customer_id=${customerId}&product_id=${productId}`,
        {
          scroll: false,
        }
      );
    });
  };

  const onReScheduleConfirmation = () => {
    console.log("test");
  };

  console.log(appointmentDetails, "appointmentDetails");
  return (
    <div className="app-table-hero-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              {/* <TableCell align="right">Agent</TableCell> */}
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentDetails?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: "2px" } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.from_time}</TableCell>
                <TableCell align="right">{row.to_time}</TableCell>
                {/* <TableCell align="right">{row.agent}</TableCell> */}
                <TableCell align="right">{row.apt_details}</TableCell>

                <TableCell align="right">
                  <div className="app-action-container">
                    <EditIcon
                      className="cr-ptr"
                      onClick={() => onRescheduleClick()}
                    />
                    <DeleteIcon
                      className="cr-ptr"
                      onClick={() => onCancelscheduleClick()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={rescheduleModalOpen} onClose={closeModal} center>
        <>
          <div className="modal-heading">
            <div>Reschedule - Appointment</div>
          </div>
          <div className="modal-body">
            <p>Do you need to reschedule the appointment ?</p>
          </div>
          <div className="modal-button-container">
            <ButtonComponent
              name={"reschedule"}
              onClick={(e) => {
                onCancelscheduleClick();
              }}
            />
          </div>
        </>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default BookedAppointments;
