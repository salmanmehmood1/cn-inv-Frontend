import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  GetEmployeeById,
  GetAllStores,
  GetAllManagers,
  EditEmployeeApi,
} from "../api/Api";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Employee.css";

const ViewEmployee = () => {
  const { currentColor } = useStateContext();
  const [street_address, setStreet_Address] = useState("");
  const [hire_date, sethire_date] = useState("");
  const [Store, setStore] = useState("");
  const [Manager, setManager] = useState("");
  let param = useParams();

  const [first_name, setfirst_name] = useState("");
  const [Email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const [salary, setsalary] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [acc_type_id, setacc_type_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [ledger_date, setledger_date] = useState("");

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/employee");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      GetEmployeeById(param.Employee_id)
        .then((resp) => {
          console.log(resp.data);
          setfirst_name(resp.data[0][0].name);
          setStreet_Address(resp.data[0][0].street_address);
          setcity(resp.data[0][0].city);
          setstate(resp.data[0][0].state);
          setpostalcode(resp.data[0][0].postal_code);
          setEmail(resp.data[0][0].email);
          setcontact(resp.data[0][0].contact);
          if (resp.data[0][0].hire_date !== null) {
            const dbDate = new Date(resp.data[0][0].hire_date);
            dbDate.setUTCHours(24);
            sethire_date(dbDate.toISOString().split("T")[0]);
          }
          setManager(resp.data[0][0].Manager);
          setStore(resp.data[0][0].store);
          setsalary(resp.data[0][0].salary);
          setAccName(resp.data[0][0].acc_name);
          setAccNotes(resp.data[0][0].acc_notes);
          setacc_id(resp.data[0][0].account_id);
          setacc_type_id(resp.data[0][0].acc_type_id);
          setOpeningBal(resp.data[0][0].opening_balance);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-2 md:m-2 bg-white rounded-2xl">
      <div className="user-body">
        <div style={{ paddingLeft: "12px" }}>
          <Header title="VIEW EMPLOYEE" />
        </div>
        <div className="offset-lg-3 col-lg-6">
          <form>
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container-cus">
                <div className="flex justify-left">
                  <div class="article-employee1">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          GENERAL INFORMATION{" "}
                        </b>
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Name: </label>
                        <br />
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="input"
                          value={first_name}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Contact: </label>
                        <br />
                        <input
                          required
                          type="text"
                          name="contact"
                          placeholder="Contact Number"
                          className="input"
                          value={contact}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Email: </label>
                        <br />
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="input"
                          value={Email}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Salary: </label>
                        <br />
                        <input
                          type="number"
                          step="1.00"
                          name="salary"
                          placeholder="Salary"
                          className="input"
                          value={salary}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Hire Date:{" "}
                        </label>
                        <br />
                        <input
                          type="date"
                          name="hire_date"
                          value={hire_date}
                          className="input"
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="article-employee1">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          CONTINUE...{" "}
                        </b>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Store: </label>
                        <br />
                        <input
                          type="text"
                          name="store"
                          placeholder="Store"
                          className="input"
                          value={Store}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Manager: </label>
                        <br />
                        <input
                          type="text"
                          name="manager"
                          placeholder="Manager"
                          className="input"
                          value={Manager}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Opening Balance:{" "}
                        </label>
                        <br />
                        <input
                          type="number"
                          step="0.01"
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          value={OpeningBal}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Note: </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          placeholder="Note "
                          id="noteTextarea"
                          value={acc_notes}
                          rows="4"
                          className="textarea"
                          readOnly
                          style={{ marginTop: "10px", width: "75%" }}
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                  <div class="article-employee1">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          LOCATION DETAIL{" "}
                        </b>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Street Address:{" "}
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          placeholder="Street Address"
                          id="noteTextarea"
                          value={street_address}
                          readOnly
                          rows="4"
                          className="textarea"
                          style={{ marginTop: "10px", width: "75%" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>City: </label>
                        <br />
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          className="input"
                          value={city}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>State: </label>
                        <br />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          className="input"
                          value={state}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Postal Code:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="postal_code"
                          placeholder="Postal Code"
                          className="input"
                          value={postalcode}
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="article-employee1">
                  <div className="flex justify-center">
                    <div class="article-container-cus">
                      <div style={{ paddingLeft: "460px" }}>
                        <Button
                          margin="10px"
                          padding="20px"
                          color="white"
                          className="custom-button ml-2"
                          bgColor={currentColor}
                          text="Back"
                          borderRadius="10px"
                          onClick={handleBackClick}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
