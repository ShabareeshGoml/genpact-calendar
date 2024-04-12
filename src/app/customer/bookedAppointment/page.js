"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

function BookedAppointments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  useEffect(() => {
    fetchBookedSlotsOfCustomer(customerId).then((e) => {
      setAppointmentDetails(e);
    });
  }, []);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
              <StyledTableCell align="right">End Time</StyledTableCell>
              {/* <StyledTableCell align="right">Agent</StyledTableCell> */}
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentDetails?.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: "2px" } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.start_time}
                </StyledTableCell>
                <StyledTableCell align="right">{row.end_time}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.agent}</StyledTableCell> */}
                <StyledTableCell align="right">
                  {row.appointment_description}
                </StyledTableCell>

                <StyledTableCell align="right">
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
                </StyledTableCell>
              </StyledTableRow>
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
