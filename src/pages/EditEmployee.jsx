import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  GetEmployeeById,
  GetAllStores,
  getAllManagersByID,
  EditEmployeeApi,
  CheckEmpNameExist,
} from "../api/Api";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../contexts/Utils";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Employee.css";

const EditEmployee = () => {
  const { currentColor } = useStateContext();
  const [street_address, setStreet_Address] = useState("");
  const [hire_date, sethire_date] = useState("");
  const [getstore, setGetStore] = useState([]);
  const [getmanager, setGetManager] = useState([]);
  const [aexist, setaexist] = useState("");
  const [Store, setStore] = useState("select");
  const [Manager, setManager] = useState("select");
  let param = useParams();
  const [ValError, setValError] = useState([]);

  const [first_name, setfirst_name] = useState("");
  const [first_name1, setfirst_name1] = useState("");
  const [Email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const [salary, setsalary] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [location_id, setlocation_id] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [acc_type_id, setacc_type_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [ledger_date, setledger_date] = useState("");

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
  const handleChangefirstName = (e) => {
    setfirst_name(e.target.value);
  };
  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };
  const handleChangeAccName = (e) => {
    setAccName(e.target.value);
  };
  const handleChangeAccDesc = (e) => {
    setAccDesc(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeContact = (e) => {
    setcontact(e.target.value);
  };
  const handleChangeSalary = (e) => {
    setsalary(e.target.value);
  };
  const handleChangeCity = (e) => {
    setcity(e.target.value);
  };
  const handleChangeState = (e) => {
    setstate(e.target.value);
  };
  const handleChangepostalcode = (e) => {
    setpostalcode(e.target.value);
  };
  const handleChangeLedgerNote = (e) => {
    setLedgerNotes(e.target.value);
  };

  const handleChangeOpeningBalance = (e) => {
    setOpeningBal(e.target.value);
  };

  const validName1 = (name, ii) => {
    const updatedErrors = [...ValError];
    if (name.trim().length === 0) {
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

  const handleChangeLedgerDate = (e) => {
    const inputDate = new Date(e.target.value);

    inputDate.setUTCHours(12);

    const formattedDate = inputDate.toISOString().split("T")[0];
    setledger_date(formattedDate);
  };

  const handleChangeHireDate = (e) => {
    const inputDate = new Date(e.target.value);

    inputDate.setUTCHours(12);

    const formattedDate = inputDate.toISOString().split("T")[0];
    sethire_date(formattedDate);
  };
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

  const handleChangeaddress = (e) => {
    setStreet_Address(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, contact, salary, city, state, postal_code } =
      document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (first_name === "") {
      updatedErrors[0] = "Please enter name.";
      setValError(updatedErrors);
      return;
    }
    if (first_name !== "") {
      if (validName1(first_name, 0) === false) {
        return;
      }
    }
    if (first_name1 != first_name) {
      if (aexist === 1) {
        updatedErrors[0] = "Employee name must be unique.";
        setValError(updatedErrors);
        return;
      }
    }
    updatedErrors[0] = "";

    if (contact.value === "") {
      updatedErrors[1] = "Please enter contact no.";
      setValError(updatedErrors);
      return;
    }
    if (contact.value !== "") {
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
    if (email.value !== "") {
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

    if (OpeningBal === "") {
      updatedErrors[5] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[5] = "";

    if (acc_notes !== "") {
      if (ValidText1(acc_notes, 6) === false) {
        return;
      }
    }
    updatedErrors[6] = "";

    if (street_address !== "") {
      if (ValidText1(street_address, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";

    if (city.value !== "") {
      if (ValidText1(city.value, 8) === false) {
        return;
      }
    }
    updatedErrors[8] = "";

    if (state.value !== "") {
      if (ValidText1(state.value, 9) === false) {
        return;
      }
    }
    updatedErrors[9] = "";

    if (postal_code.value !== "") {
      if (ValidText1(postal_code.value, 10) === false) {
        return;
      }
    }
    updatedErrors[10] = "";

    const manager_ids = getmanager.find((item) => item.manager === Manager);
    const store_id = getstore.find((item) => item.name === Store);

    var dt = null;
    if (hire_date) {
      dt = hire_date;
    }
    var mag = null;
    if (manager_ids != undefined) {
      mag = manager_ids.employee_id;
    }

    const response = await EditEmployeeApi(
      param.Employee_id,
      first_name,
      email.value,
      contact.value,
      dt,
      mag,
      salary.value,
      location_id,
      store_id.store_id,
      street_address,
      city.value,
      state.value,
      postal_code.value,
      acc_id,
      acc_type_id,
      acc_notes,
      OpeningBal,
      900
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/employee");
      alert("Employee updated successfully.");
    } else {
      alert("Employee failed to update.");
    }
  };
  useEffect(() => {
    async function fetchData() {
      await CheckEmpNameExist(first_name)
        .then((resp) => {
          console.log(resp.data);
          setaexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [first_name]);

  useEffect(() => {
    async function fetchData() {
      GetAllStores()
        .then((resp) => {
          setGetStore(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      getAllManagersByID(param.Employee_id)
        .then((resp) => {
          setGetManager(resp.data || []);
          //console.log(resp.data)
        })
        .catch((err) => {
          console.log(err.message);
        });

      GetEmployeeById(param.Employee_id)
        .then((resp) => {
          console.log(resp.data);
          setfirst_name(resp.data[0][0].name);
          setfirst_name1(resp.data[0][0].name);
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
          setAccNotes(resp.data[0][0].acc_notes);
          setManager(resp.data[0][0].Manager);
          setStore(resp.data[0][0].store);
          setlocation_id(resp.data[0][0].location_id);
          setsalary(resp.data[0][0].salary);
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
          <Header title="EDIT EMPLOYEE" />
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
                          onChange={handleChangefirstName}
                          onBlur={(e) => validName1(e.target.value, 0)}
                          style={{ marginTop: "10px" }}
                          autoFocus
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
                          value={contact}
                          onChange={handleChangeContact}
                          onBlur={(e) => validPhone1(e.target.value, 1)}
                          style={{ marginTop: "10px" }}
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
                        <label style={{ fontWeight: "bold" }}>Email: </label>
                        <br />
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="input"
                          value={Email}
                          onChange={handleChangeEmail}
                          onBlur={(e) => validateEmail1(e.target.value, 2)}
                          style={{ marginTop: "10px" }}
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
                          value={salary}
                          onChange={handleChangeSalary}
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
                          value={hire_date}
                          className="input"
                          onChange={handleChangeHireDate}
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
                        <label style={{ fontWeight: "bold" }} htmlFor="Store">
                          Store:{" "}
                        </label>
                        <br />
                        <select
                          style={{
                            width: "75%",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            padding: "8px",
                          }}
                          id="StoreSelect"
                          value={Store}
                          onChange={handleChangeStore}
                        >
                          <option value="select"> select </option>

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
                          style={{
                            width: "75%",
                            borderWidth: "2px",
                            borderStyle: "solid",
                            padding: "8px",
                          }}
                          id="ManagerSelect"
                          value={Manager}
                          onChange={handleChangeManager}
                        >
                          <option value="select"> select </option>

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
                        <br />
                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          defaultValue={0}
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          value={OpeningBal}
                          onChange={handleChangeOpeningBalance}
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
                        <br />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          placeholder="Note "
                          id="noteTextarea"
                          value={acc_notes}
                          onChange={handleChangeAccNote}
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 6)}
                          rows="4"
                          className="textarea"
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
                          style={{ marginTop: "10px", width: "75%" }}
                          rows="4"
                          className="textarea"
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
                          value={city}
                          onChange={handleChangeCity}
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
                          value={state}
                          onChange={handleChangeState}
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
                          value={postalcode}
                          onChange={handleChangepostalcode}
                          style={{ marginTop: "10px", width: "75%" }}
                          onBlur={(e) => ValidText1(e.target.value, 10)}
                        />
                        {ValError[10] && (
                          <p style={{ color: "red" }}>{ValError[10]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="article-employee1">
                  <div className="flex justify-center">
                    <div class="article-container-cus">
                      <div style={{ paddingLeft: "400px" }}>
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

export default EditEmployee;
