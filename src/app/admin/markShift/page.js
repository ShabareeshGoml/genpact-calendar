"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./markshift.css";
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
import { fetchBookedSlotsOfAgent } from "@/services/apiServices/agentUpcomming";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { getAgentList } from "@/services/apiServices";
import { putAgentList } from "@/services/apiServices";
import Checkbox from "@mui/material/Checkbox";

function MarkShift() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = searchParams.get("agent_id");
  // const productId = searchParams.get("product_id");
  useEffect(() => {
    getAgentList().then((e) => {
      setAppointmentDetails(e?.agents_details);
    });
  }, []);

  // useEffect(() => {
  //   // Update backend API here when appointmentDetails change
  // }, [appointmentDetails]);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
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

  const days = [
    { id: 1, name: "M", value: "Monday" },
    { id: 2, name: "T", value: "Tuesday" },
    { id: 3, name: "W", value: "Wednesday" },
    { id: 4, name: "Th", value: "Thursday" },
    { id: 5, name: "F", value: "Friday" },
    { id: 6, name: "Sa", value: "Saturday" },
    { id: 7, name: "Su", value: "Sunday" },
  ];

  const getShiftValue = (shift_from, shift_to) => {
    console.log(shift_from, shift_to, "chk1");
    if (shift_from === "09:00:00" && shift_to === "17:00:00") {
      return "09:00:00-17:00:00";
    } else if (shift_from === "17:00:00" && shift_to === "01:00:00") {
      return "17:00:00-01:00:00";
    } else if (shift_from === "01:00:00" && shift_to === "09:00:00") {
      return "01:00:00-09:00:00";
    } else {
      return "-";
    }
  };

  const handleShiftChange = (e, id) => {
    const selectedShift = e.target.value;
    const shift_from = selectedShift.split("-")[0];
    const shift_to = selectedShift.split("-")[1];

    const newAppointmentDetails = appointmentDetails.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          shift_from: shift_from !== "-" ? shift_from : null,
          shift_to: shift_to !== "-" ? shift_to : null,
        };
      }
      return row;
    });
    setAppointmentDetails([...newAppointmentDetails]);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleWeeklyOffChange = (day, id) => {
    const newAppointmentDetails = appointmentDetails.map((row) => {
      if (row.id === id) {
        const updatedWeeklyOff = row.weekly_off ? [...row.weekly_off] : [];
        const index = updatedWeeklyOff.indexOf(day.value);
        if (index === -1) {
          updatedWeeklyOff.push(day.value);
        } else {
          updatedWeeklyOff.splice(index, 1);
        }
        return {
          ...row,
          weekly_off: updatedWeeklyOff.length ? updatedWeeklyOff : null,
        };
      }
      return row;
    });
    setAppointmentDetails(newAppointmentDetails);
  };

  const updateBackend = async () => {
    try {
      console.log(appointmentDetails, "check before sending backend");
      // setIsUpdated(true);
      const body = {
        agents_details: appointmentDetails,
      };
      const response = await putAgentList(body);
      if (response.message === "All the row updated successfully") {
        toast.success("Updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        toast.error("Failed to update data", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  console.log(appointmentDetails, "appointmentDetails");
  return (
    <div className="app-table-hero-container">
      <ToastContainer />
      <div className="app-container">
        {/* Dropdown for Months at left top */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-dropdown"
        >
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Update button at right top */}
        <button
          onClick={updateBackend}
          className="markshift-update-button"
          disabled={!isUpdated}
        >
          Update
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell></StyledTableCell> */}
              <StyledTableCell align="center">Agent Name</StyledTableCell>
              <StyledTableCell align="center">Weekly Off Days</StyledTableCell>

              <StyledTableCell align="center">Shift Time</StyledTableCell>

              {/* <StyledTableCell align="right">Actions</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentDetails &&
              appointmentDetails?.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: "2px" } }}
                >
                  {/* <StyledTableCell component="th" scope="row">
                  <Checkbox  defaultChecked />
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    {row?.full_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {days?.map((day) => (
                      <React.Fragment key={day.id}>
                        <Checkbox
                          id={day.id}
                          checked={row?.weekly_off?.includes(day.value)}
                          onChange={() => {
                            handleWeeklyOffChange(day, row.id);
                            setIsUpdated(true); // Set update status
                          }}
                        />
                        {day.name}
                      </React.Fragment>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <select
                      value={getShiftValue(row.shift_from, row.shift_to)}
                      onChange={(e) => {
                        handleShiftChange(e, row.id);
                        setIsUpdated(true); // Set update status
                      }}
                    >
                      <option value="-">-</option>
                      <option value="09:00:00-17:00:00">09:00 - 17:00</option>
                      <option value="17:00:00-01:00:00">17:00 - 01:00</option>
                      <option value="01:00:00-09:00:00">01:00 - 09:00</option>
                    </select>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MarkShift;
