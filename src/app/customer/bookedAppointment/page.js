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
import { Suspense } from "react";
import TextField from "@mui/material/TextField";

function BookedAppointments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  const caseID = searchParams.get("case_id");

  useEffect(() => {
    fetchBookedSlotsOfCustomer(customerId).then((e) => {
      if (e?.detail === "No record found - 404: Product not found") {
      } else {
        setAppointmentDetails(e);
      }
    });
  }, []);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [cancelModalOpen, setcancelModalOpen] = useState(false);

  const [selectedAppointment, setselectedAppointment] = useState(null);
  const [cancelAppointmentReason, setcancelAppointmentReason] = useState(null);

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
  function openCancelModal() {
    setcancelModalOpen(true);
  }
  function closeModal() {
    setRescheduleModalOpen(false);
  }
  function closeCancelModal() {
    setcancelModalOpen(false);
  }
  const onRescheduleClick = () => {
    openModal();
  };
  const onCancelscheduleClick = () => {
    closeModal();
    router.push(
      `/customer/bookAppointment?customer_id=${customerId}&product_id=${productId}&appointment_id=${selectedAppointment}&case_id=${caseID}`,
      {
        scroll: false,
      }
    );
    // cancelBookedSlotsOfCustomer(selectedAppointment).then((e) => {
    //   closeModal();
    //   toast.success("Appointment Cancelled", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "light",
    //   });
    //   router.push(
    //     `/customer/bookAppointment?customer_id=${customerId}&product_id=${productId}`,
    //     {
    //       scroll: false,
    //     }
    //   );
    // });
  };

  const onOnlyCancelClick = () => {
    openCancelModal();
    cancelBookedSlotsOfCustomer(selectedAppointment, cancelAppointmentReason)
      .then((e) => {
        closeModal();
        toast.success(e?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setselectedAppointment(null);
        closeCancelModal();
        fetchBookedSlotsOfCustomer(customerId).then((e) => {
          setAppointmentDetails(e);
        });
      })
      .catch((e) => {
        toast.error(e?.message, {
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

  const onReScheduleConfirmation = () => {
    console.log("test");
  };

  console.log(appointmentDetails, "appointmentDetails");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-table-hero-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Case ID</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Start Time</StyledTableCell>
                <StyledTableCell align="center">End Time</StyledTableCell>
                <StyledTableCell align="center">Agent Name</StyledTableCell>
                <StyledTableCell align="center">Agent email</StyledTableCell>

                <StyledTableCell align="center">Status</StyledTableCell>

                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(appointmentDetails) &&
                appointmentDetails?.length !== 0 &&
                appointmentDetails?.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: "2px" },
                    }}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.case_id || "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.start_time}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.end_time}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.full_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.agent_email}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.appointment_description}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <div className="app-action-container">
                        <EditIcon
                          className="cr-ptr"
                          onClick={() => {
                            setselectedAppointment(row?.appointment_id);
                            onRescheduleClick();
                          }}
                        />
                        <DeleteIcon
                          className="cr-ptr"
                          onClick={() => {
                            setselectedAppointment(row.appointment_id);
                            openCancelModal();
                          }}
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
                variant={"contained"}
                name={"reschedule"}
                onClick={(e) => {
                  onCancelscheduleClick();
                }}
              />
            </div>
          </>
        </Modal>
        <Modal open={cancelModalOpen} onClose={closeCancelModal} center>
          <>
            <div className="modal-heading">
              <div>Cancell - Appointment</div>
            </div>
            <div className="modal-body">
              <p>Do you really want to cancel the appointment ?</p>
              <label>Reason for Cancel</label>
              <TextField
                multiline
                rows={2}
                maxRows={4}
                name="message"
                onChange={(e) => setcancelAppointmentReason(e?.target.value)}
                value={cancelAppointmentReason}
                className="inputField-ctmz"
                // disabled={appointmentID ? true : false}
              />
            </div>
            <div className="modal-button-container">
              <ButtonComponent
                variant={"contained"}
                name={"Cancel - Appointment"}
                onClick={(e) => {
                  onOnlyCancelClick();
                }}
                disabled={
                  cancelAppointmentReason === null ||
                  cancelAppointmentReason === ""
                }
              />
            </div>
          </>
        </Modal>
        <ToastContainer />
      </div>
    </Suspense>
  );
}

export default BookedAppointments;
