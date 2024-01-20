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
  GetAllAccountTypes,
  EditAccountOpeningBal,
  GetAccountByID,
} from "../api/Api";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Employee.css";

const ViewAccount = () => {
  const { currentColor } = useStateContext();
  const [AccountType, setAccountType] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [ledger_date, setledger_date] = useState("");
  let param = useParams();

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/account");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      GetAccountByID(param.Account_id)
        .then((resp) => {
          setAccName(resp.data[0].name);
          setAccDesc(resp.data[0].description);
          setAccNotes(resp.data[0].notes);
          setAccountType(resp.data[0].acc_type);
          const dbDate1 = new Date(resp.data[0].datetime);
          dbDate1.setUTCHours(24);
          setledger_date(dbDate1.toISOString().split("T")[0]);
          setacc_id(resp.data[0].account_id);
          setOpeningBal(resp.data[0].end_balance);
          setLedgerNotes(resp.data[0].note);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div className="user-body">
        <div style={{ paddingLeft: "12px" }}>
          <Header title="VIEW ACCOUNT" />
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
                  {/* <div class="article-container"> */}
                  <div class="article-employee2">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Account Title:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="acc_name"
                          placeholder="Title"
                          className="input"
                          value={acc_name}
                          style={{ width: "94%", marginTop: "10px" }}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Type: </label>
                        <br />
                        <input
                          type="text"
                          name="acc_type"
                          placeholder="Account Type"
                          className="input"
                          value={AccountType}
                          style={{ width: "94%", marginTop: "10px" }}
                          readOnly
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
                          style={{ width: "94%", marginTop: "10px" }}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                  <div style={{ paddingLeft: "70px" }}></div>
                  <div class="article-employee2">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Description:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="acc_description"
                          placeholder="Description"
                          className="input"
                          value={acc_desc}
                          style={{ width: "94%", marginTop: "10px" }}
                          readOnly
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
                          style={{ width: "94%", marginTop: "10px" }}
                          readOnly
                          rows="4"
                          className="textarea"
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </div>

                <div class="article-employee2">
                  <div className="flex justify-left">
                    <div class="article-container-cus">
                      <div style={{ paddingLeft: "360px" }}>
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
        </div>
        {/* <button >Submit</button> */}
      </div>
    </div>
  );
};

export default ViewAccount;
