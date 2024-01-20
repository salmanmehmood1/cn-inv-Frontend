import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddEmployeeApi,
  GetAllStores,
  GetAllManagers,
  CheckEmpNameExist,
} from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import TimeoutUtility from "../contexts/TimeoutUtility";
import "../styles/Employee.css";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../contexts/Utils";
import { select } from "@syncfusion/ej2/base";

const AddEmployee = () => {
  const { currentColor } = useStateContext();
  const [street_address, setStreet_Address] = useState("");
  const [hire_date, sethire_date] = useState();
  const [getstore, setGetStore] = useState([]);
  const [getmanager, setGetManager] = useState([]);
  const [aexist, setaexist] = useState("");
  const [name, setname] = useState("");
  const [Store, setStore] = useState("select");
  const [Manager, setManager] = useState("select");
  const [acc_notes, setAccNotes] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [ledger_date, setledger_date] = useState(
    new Date().toISOString().split("T")[0] + " 00:00:00"
  );

  const [ValError, setValError] = useState([]);

  const [formData, setFormData] = useState({
    // hire_date: new Date().toISOString().split("T")[0],
    ledger_date: new Date().toISOString().split("T")[0],
  });

  const handleChangeStore = (e) => {
    setStore(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[4] = "";
      setValError(updatedErrors);
    }
  };

  const handleChangeManager = (e) => {
    setManager(e.target.value);
  };
  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };

  const handleChangeLedgerNote = (e) => {
    setLedgerNotes(e.target.value);
  };

  const handleChangeLedgerDate = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setledger_date(e.target.value + " 00:00:00");
    console.log(ledger_date);
  };
  const handleChangeName = (e) => {
    setname(e.target.value);
  };

  const handleChangeHireDate = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    if (hire_date === "undefined") {
      sethire_date(null);
    } else {
      sethire_date(e.target.value + " 00:00:00");
      console.log(hire_date);
    }
  };
  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/employee");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeaddress = (e) => {
    setStreet_Address(e.target.value);
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
    updatedErrors[ii] = "Invalid Field!";
    setValError(updatedErrors);
    return false;
  };

  const validPhone1 = (phone, ii) => {
    const updatedErrors = [...ValError];
    if (phone.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (ValidPhone(phone)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid Field!";
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
    updatedErrors[ii] = "Invalid Field!";
    setValError(updatedErrors);
    return false;
  };

  const validateEmail1 = (mail, ii) => {
    const updatedErrors = [...ValError];

    if (mail.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (validateEmail(mail)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid Field!";
    setValError(updatedErrors);
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      const {
        email,
        contact,
        salary,
        city,
        state,
        postal_code,
        opening_balance,
      } = document.forms[0];

      setValError([]);
      const updatedErrors = [...ValError];

      if (name === "") {
        updatedErrors[0] = "Please enter name.";
        setValError(updatedErrors);
        return;
      }
      if (name) {
        if (validName1(name, 0) === false) {
          return;
        }
      }
      if (aexist === 1) {
        updatedErrors[0] = "Employee name must be unique.";
        setValError(updatedErrors);
        return;
      }
      updatedErrors[0] = "";

      if (contact.value === "") {
        updatedErrors[1] = "Please enter contact No.";
        setValError(updatedErrors);
        return;
      }
      if (contact.value) {
        if (validPhone1(contact.value, 1) === false) {
          return;
        }
      }
      updatedErrors[1] = "";

      if (email.value === "") {
        updatedErrors[2] = "Please enter email.";
        setValError(updatedErrors);
        return;
      }
      if (email.value) {
        if (validateEmail1(email.value, 2) === false) {
          return;
        }
      }
      updatedErrors[2] = "";

      if (salary.value === "") {
        updatedErrors[3] = "Please enter salary.";
        setValError(updatedErrors);
        return;
      }
      if (salary.value <= 0) {
        updatedErrors[3] = "Salary must be greater than 0.";
        setValError(updatedErrors);
        return;
      }
      updatedErrors[3] = "";

      if (Store === "select") {
        updatedErrors[4] = "Please select store.";
        setValError(updatedErrors);
        return;
      }
      updatedErrors[4] = "";

      if (opening_balance.value === "") {
        updatedErrors[5] = "Please enter opening balance.";
        setValError(updatedErrors);
        return;
      }
      updatedErrors[5] = "";

      if (acc_notes) {
        if (ValidText1(acc_notes, 6) === false) {
          return;
        }
      }
      updatedErrors[6] = "";

      if (street_address) {
        if (ValidText1(street_address, 7) === false) {
          return;
        }
      }
      updatedErrors[7] = "";

      if (city.value) {
        if (ValidText1(city.value, 8) === false) {
          return;
        }
      }
      updatedErrors[8] = "";

      if (state.value) {
        if (ValidText1(state.value, 9) === false) {
          return;
        }
      }
      updatedErrors[9] = "";

      if (postal_code.value) {
        if (ValidText1(postal_code.value, 10) === false) {
          return;
        }
      }
      updatedErrors[10] = "";

      const manager_id = getmanager.find((item) => item.manager === Manager);
      console.log(manager_id);
      const store_id = getstore.find((item) => item.name === Store);
      console.log(store_id);
      var dt = null;
      if (hire_date) {
        dt = hire_date;
      }
      var mag = null;
      if (manager_id != undefined) {
        mag = manager_id.employee_id;
      }
      const response = await AddEmployeeApi(
        name,
        email.value,
        contact.value,
        dt,
        mag,
        salary.value,
        store_id.store_id,
        street_address,
        city.value,
        state.value,
        postal_code.value,
        1101,
        acc_notes,
        opening_balance.value
      );
      console.log(response, "Response");
      if (response.status === 200) {
        navigate("/employee");
        alert("Employee added successfully.");
      } else {
        alert("Employee failed to add.");
      }
    } catch (ex) {}
  };

  useEffect(() => {
    async function fetchData() {
      await CheckEmpNameExist(name)
        .then((resp) => {
          console.log(resp.data);
          setaexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [name]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllStores()
        .then((resp) => {
          setGetStore(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      GetAllManagers()
        .then((resp) => {
          setGetManager(resp.data || []);
          console.log(resp.data);
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
          <Header title="ADD EMPLOYEE" />
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
                        <label style={{ fontWeight: "bold" }}>Name:</label>
                        <br />
                        <input
                          required
                          type="text"
                          className="input"
                          value={name}
                          onChange={handleChangeName}
                          name="name"
                          placeholder="Name"
                          style={{ marginTop: "10px" }}
                          autoFocus
                          onBlur={(e) => validName1(e.target.value, 0)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {` `}*
                        </span>
                        {ValError[0] && (
                          <p style={{ color: "red" }}>{ValError[0]}</p>
                        )}
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
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validPhone1(e.target.value, 1)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
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
                        <label style={{ fontWeight: "bold" }}>Email: </label>
                        <br />
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validateEmail1(e.target.value, 2)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
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
                        <label style={{ fontWeight: "bold" }}>Salary: </label>
                        <br />
                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          defaultValue={0}
                          name="salary"
                          placeholder="Salary"
                          className="input"
                          style={{ marginTop: "10px" }}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {` `}*
                        </span>
                        {ValError[3] && (
                          <p style={{ color: "red" }}>{ValError[3]}</p>
                        )}
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
                          value={formData.hire_date}
                          className="input"
                          onChange={handleChangeHireDate}
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
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
                          CONTINUE...{" "}
                        </b>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }} htmlFor="Store">
                          Store:{" "}
                        </label>
                        <br />
                        <select
                          style={{
                            borderWidth: "2px",
                            borderStyle: "solid",
                            padding: "8px",
                            marginTop: "10px",
                            width: "75%",
                          }}
                          id="StoreSelect"
                          value={Store}
                          onChange={handleChangeStore}
                        >
                          <option value="-1"> select </option>

                          {getstore.map((item) => (
                            <option key={item.store_id}>{item.name}</option>
                          ))}
                        </select>
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {` `}*
                        </span>
                        {ValError[4] && (
                          <p style={{ color: "red" }}>{ValError[4]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }} htmlFor="Manager">
                          Manager:{" "}
                        </label>
                        <br />
                        <select
                          id="ManagerSelect"
                          value={Manager}
                          onChange={handleChangeManager}
                          style={{
                            borderWidth: "2px",
                            borderStyle: "solid",
                            padding: "8px",
                            marginTop: "10px",
                            width: "75%",
                          }}
                        >
                          <option value="-1"> select </option>

                          {getmanager.map((item) => (
                            <option key={item.employee_id}>
                              {item.manager}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Opening Balance:{" "}
                        </label>

                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          defaultValue={0}
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          style={{ marginTop: "10px", width: "75%" }}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {` `}*
                        </span>
                        {ValError[5] && (
                          <p style={{ color: "red" }}>{ValError[5]}</p>
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
                          placeholder="Note "
                          id="noteTextarea"
                          value={acc_notes}
                          onChange={handleChangeAccNote}
                          rows="4"
                          className="textarea"
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 6)}
                        />
                        {ValError[6] && (
                          <p style={{ color: "red" }}>{ValError[6]}</p>
                        )}
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
                          onChange={handleChangeaddress}
                          rows="4"
                          className="textarea"
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 7)}
                        />
                        {ValError[7] && (
                          <p style={{ color: "red" }}>{ValError[7]}</p>
                        )}
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
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 8)}
                        />
                        {ValError[8] && (
                          <p style={{ color: "red" }}>{ValError[8]}</p>
                        )}
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
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 9)}
                        />
                        {ValError[9] && (
                          <p style={{ color: "red" }}>{ValError[9]}</p>
                        )}
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
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 10)}
                        />
                        {ValError[10] && (
                          <p style={{ color: "red" }}>{ValError[10]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
                <div class="article-employee1">
                  <div className="flex justify-center">
                    <div class="article-container-cus">
                      <div style={{ paddingLeft: "520px" }}>
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

export default AddEmployee;
