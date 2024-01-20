import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../contexts/Utils";
import {
  GetAllPaymentDetail,
  addPayment,
  getAccNamesCash,
  getAccNameCusVen,
  getAcc1BalFrom,
} from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Employee.css";
import Select from "react-select";

const AddReceipt = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [acc_notes, setAccNotes] = useState("");
  const [ValError, setValError] = useState([]);
  const [to_acc, setto_acc] = useState("");
  const [to_acc_Options, setto_acc_Options] = useState([]);
  const [GetAccount_To, setGetAccount_To] = useState([]);
  const [from_acc, setfrom_acc] = useState("");
  const [from_acc_Options, setfrom_acc_Options] = useState([]);
  const [GetAccount_From, setGetAccount_From] = useState([]);

  const [to_acc_bal, setto_acc_bal] = useState("");
  const [from_acc_bal, setfrom_acc_bal] = useState("");

  const [acc_from_id, setacc_from_id] = useState(null);
  const [acc_to_id, setacc_to_id] = useState(null);

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };

  const handleChangeAcc_To = async (selectedOption) => {
    setto_acc_bal("");
    if (selectedOption.label !== "") {
      const updatedErrors = [...ValError];
      updatedErrors[0] = "";
      setValError(updatedErrors);
    }
    if (selectedOption && selectedOption.value) {
      if (selectedOption.value) {
        // try {
        //   const resp = await getAcc1BalFrom(selectedOption.value);
        setto_acc_bal(selectedOption.bal);
        // } catch (err) {
        //   console.log(err.message);
        // }
        setto_acc(selectedOption);
        setacc_to_id(selectedOption.value);
      }
    }
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

  const handleChangeAcc_From = async (selectedOption) => {
    setfrom_acc_bal("");
    if (selectedOption.label !== "") {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
    }
    if (selectedOption && selectedOption.value) {
      if (selectedOption.value) {
        // try {
        //   const resp = await getAcc1BalFrom(selectedOption.value);
        setfrom_acc_bal(selectedOption.bal);
        // } catch (err) {
        //   console.log(err.message);
        // }

        setfrom_acc(selectedOption);
        setacc_from_id(selectedOption.value);
      }
    }
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/receipt");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount_paid } = document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (to_acc === "") {
      updatedErrors[0] = "Please select receive in a/c.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (from_acc === "") {
      updatedErrors[1] = "Please select receive from a/c.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (amount_paid.value === "") {
      updatedErrors[2] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    if (amount_paid.value < 1) {
      updatedErrors[2] = "Amount paid must be greater than 0.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[2] = "";

    if (acc_notes) {
      if (ValidText1(acc_notes, 3) === false) {
        return;
      }
    }
    updatedErrors[3] = "";

    const response = await addPayment(
      acc_from_id,
      acc_to_id,
      amount_paid.value,
      acc_notes,
      from_acc_bal,
      12,
      to_acc_bal
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/receipt");
      alert("Receipt added successfully.");
    } else {
      alert("Receipt failed to add.");
    }
  };

  useEffect(() => {
    const fetchAcc_ToOptions = async () => {
      const fetchedProductOptions = GetAccount_To.map((item) => ({
        label: item.name,
        value: item.account_id,
        bal: item.end_balance,
      }));
      setto_acc_Options(fetchedProductOptions);
    };
    fetchAcc_ToOptions();
  }, [GetAccount_To, to_acc]);
  useEffect(() => {
    const fetchAcc_ToOptions = async () => {
      const fetchedProductOptions = GetAccount_From.map((item) => ({
        label: item.name,
        value: item.account_id,
        bal: item.end_balance,
      }));
      setfrom_acc_Options(fetchedProductOptions);
    };
    fetchAcc_ToOptions();
  }, [GetAccount_From, from_acc]);

  useEffect(() => {
    async function fetchData() {
      getAccNamesCash()
        .then((resp) => {
          setGetAccount_To(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await getAccNameCusVen()
        .then((resp1) => {
          setGetAccount_From(resp1.data || []);
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
          <Header title="ADD RECEIPT" />
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
                  <div class="article-employee2">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="ProductSelect"
                        >
                          Received In:{" "}
                        </label>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={to_acc}
                            onChange={handleChangeAcc_To}
                            options={to_acc_Options}
                            isSearchable
                            placeholder="Select Receive In Account"
                            isClearable
                            styles={{ width: "200%" }}
                          />
                        </div>
                        <span
                          style={{
                            color: "red",
                            fontSize: "18px",
                            paddingLeft: "102%",
                          }}
                        >
                          {` `}*
                        </span>
                        {ValError[0] && (
                          <p style={{ color: "red" }}>{ValError[0]}</p>
                        )}

                        {/* <br /> */}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="ProductSelect"
                        >
                          Received From:{" "}
                        </label>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={from_acc}
                            onChange={handleChangeAcc_From}
                            options={from_acc_Options}
                            isSearchable
                            placeholder="Select Receive From Account"
                            isClearable
                          />
                        </div>
                        <span
                          style={{
                            color: "red",
                            fontSize: "18px",
                            paddingLeft: "102%",
                          }}
                        >
                          {` `}*
                        </span>
                        {ValError[1] && (
                          <p style={{ color: "red" }}>{ValError[1]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Amount Paid:{" "}
                        </label>

                        <br />
                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          defaultValue={0.0}
                          name="amount_paid"
                          placeholder="Opening Balance"
                          className="input"
                          style={{ marginTop: "10px", width: "95%" }}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "18px",
                            // paddingLeft: "102%",
                          }}
                        >
                          {` `}*
                        </span>
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
                          placeholder="Enter Note "
                          id="noteTextarea"
                          value={acc_notes}
                          onChange={handleChangeAccNote}
                          rows="4"
                          className="textarea"
                          style={{ width: "100%", marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 3)}
                        />
                        {ValError[3] && (
                          <p style={{ color: "red" }}>{ValError[3]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                  <div style={{ paddingLeft: "70px" }}></div>
                  <div class="article-employee2">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div
                          style={{
                            color: "black",
                            fontSize: "20px",
                            marginTop: "36px",
                          }}
                        >
                          <label style={{ maxWidth: "100%" }}>
                            Bal: {formatCurrency(to_acc_bal)}
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <div
                          style={{
                            color: "black",
                            fontSize: "20px",
                            marginTop: "60px",
                          }}
                        >
                          <label style={{ maxWidth: "100%" }}>
                            Bal: {formatCurrency(from_acc_bal)}
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>

                <div class="article-employee2">
                  <div className="flex justify-left">
                    <div class="article-container-cus">
                      <div style={{ paddingLeft: "40px" }}>
                        <Button
                          margin="10px"
                          padding="20px"
                          color="white"
                          className="custom-button ml-2"
                          bgColor={currentColor}
                          text="Add"
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

export default AddReceipt;
