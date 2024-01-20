import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../contexts/Utils";
import {
  GetAllAccountTypes,
  EditAccountOpeningBal,
  GetAccountByID,
  CheckAccNameExist,
  CheckDefaultAcc,
} from "../api/Api";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Employee.css";

const EditAccount = () => {
  const { currentColor } = useStateContext();
  const [AccountType, setAccountType] = useState("select");
  const [getacc_types, setacc_types] = useState([]);
  const [defaultacc, setdefaultacc] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_name1, setAccName1] = useState("");
  const [aexist, setaexist] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [ledger_date, setledger_date] = useState("");
  const [ValError, setValError] = useState([]);

  let param = useParams();

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };

  const handleChangeLedgerNote = (e) => {
    setLedgerNotes(e.target.value);
  };
  const handleChangeOpeningBalance = (e) => {
    setOpeningBal(e.target.value);
  };
  const handleChangeAccName = (e) => {
    setAccName(e.target.value);
  };
  const handleChangeAccDesc = (e) => {
    setAccDesc(e.target.value);
  };

  const handleChangeLedgerDate = (e) => {
    const inputDate = new Date(e.target.value);

    inputDate.setUTCHours(12);

    const formattedDate = inputDate.toISOString().split("T")[0];
    setledger_date(formattedDate);
  };
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

  const handleChangeAccountType = (e) => {
    setAccountType(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
    }
  };

  const validName1 = (name, ii) => {
    const updatedErrors = [...ValError];
    if (name.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (validateName(name)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const ValidText1 = (txt, ii) => {
    const updatedErrors = [...ValError];
    if (txt.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (ValidText(txt)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { acc_description, opening_balance } = document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (defaultacc === 1) {
      alert(`A${param.Account_id} is Defualt account.\nIt is not editable.`);
      return;
    }

    if (acc_name === "") {
      updatedErrors[0] = "Please enter account name.";
      setValError(updatedErrors);
      return;
    }
    if (acc_name) {
      if (validName1(acc_name, 0) === false) {
        return;
      }
    }
    if (acc_name1 != acc_name) {
      if (aexist === 1) {
        updatedErrors[0] = "Account name must be unique.";
        setValError(updatedErrors);
        return;
      }
    }
    updatedErrors[0] = "";

    if (AccountType === "select") {
      updatedErrors[1] = "Please select account type.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (acc_description.value) {
      if (ValidText1(acc_description.value, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (opening_balance.value === "") {
      updatedErrors[3] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[3] = "";

    if (acc_notes) {
      if (ValidText1(acc_notes, 4) === false) {
        return;
      }
    }
    updatedErrors[4] = "";

    const accounttype_id = getacc_types.find(
      (item) => item.name === AccountType
    );
    const response = await EditAccountOpeningBal(
      param.Account_id,
      acc_name,
      acc_description.value,
      accounttype_id.a_type_id,
      acc_notes,
      ledger_notes,
      opening_balance.value,
      ledger_date,
      900
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/account");
      alert("Account updated successfully.");
    } else {
      alert("Account failed to updated.");
    }
  };
  useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, [acc_name]);

  useEffect(() => {
    async function fetchData() {
      await CheckAccNameExist(acc_name)
        .then((resp) => {
          console.log(resp.data);
          setaexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [acc_name]);

  useEffect(() => {
    async function fetchData() {
      await CheckDefaultAcc(param.Account_id)
        .then((resp) => {
          console.log(resp.data);
          setdefaultacc(resp.data[0].default);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAllAccountTypes()
        .then((resp) => {
          setacc_types(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAccountByID(param.Account_id)
        .then((resp) => {
          setAccName(resp.data[0].name);
          setAccName1(resp.data[0].name);
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
          <Header title="EDIT STORE" />
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
                          onChange={handleChangeAccName}
                          onBlur={(e) => validName1(e.target.value, 0)}
                          autoFocus
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {`  `}*
                        </span>
                        {ValError[0] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="AccountSelect"
                        >
                          Type:{" "}
                        </label>

                        <select
                          style={{
                            width: "94%",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            padding: "8px",
                          }}
                          id="AccountSelect"
                          value={AccountType}
                          onChange={handleChangeAccountType}
                        >
                          <option value="select"> select </option>

                          {getacc_types.map((item) => (
                            <option key={item.a_type_id}>{item.name}</option>
                          ))}
                        </select>
                        <span style={{ color: "red", fontSize: "24px" }}>
                          {`  `}*
                        </span>
                        {ValError[1] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[1]}
                          </p>
                        )}
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
                          step="1.00"
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          value={OpeningBal}
                          style={{ width: "94%", marginTop: "10px" }}
                          onChange={handleChangeOpeningBalance}
                        />
                        <span style={{ color: "red", fontSize: "28px" }}>
                          {` `}*
                        </span>
                        {ValError[3] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[3]}
                          </p>
                        )}
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
                          style={{ width: "94%", marginTop: "10px" }}
                          value={acc_desc}
                          onChange={handleChangeAccDesc}
                          onBlur={(e) => ValidText1(e.target.value, 2)}
                        />
                        {ValError[2] && (
                          <p style={{ color: "red" }}>{ValError[2]}</p>
                        )}
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
                          placeholder="Enter Account Note "
                          id="noteTextarea"
                          value={acc_notes}
                          style={{ width: "94%", marginTop: "10px" }}
                          onChange={handleChangeAccNote}
                          onBlur={(e) => ValidText1(e.target.value, 4)}
                          rows="4"
                          className="textarea"
                        />
                        {ValError[4] && (
                          <p style={{ color: "red" }}>{ValError[4]}</p>
                        )}
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
                          text="Update"
                          borderRadius="10px"
                          onClick={handleSubmit}
                        />
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

export default EditAccount;
