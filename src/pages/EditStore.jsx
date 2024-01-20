import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidWebsite,
  ValidAmount,
  ValidText,
} from "../contexts/Utils";
import {
  GetProductByStoreID,
  GetStoreByID,
  EditStoreApi,
  GetAllManagers,
  CheckStoreNameExist,
} from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Employee.css";

const EditStore = () => {
  const [Name, setName] = useState(" ");
  const [Name1, setName1] = useState(" ");
  const [Email, setEmail] = useState(" ");
  const [Contact, setContact] = useState(" ");
  const [nexist, setnexist] = useState("");
  const [Address, setAddress] = useState(" ");
  const [City, setCity] = useState(" ");
  const [State, setState] = useState(" ");
  const [Postal, setPostal] = useState(" ");
  const [Manager, setManager] = useState("select");
  const [getmanager, setGetManager] = useState([]);
  const [Location_id, setLocation_id] = useState(" ");
  const [ValError, setValError] = useState([]);

  let param = useParams();
  const navigate = useNavigate();

  const { currentColor } = useStateContext();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/stores");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
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
    updatedErrors[ii] = "Invalid field.";
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
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const handleChangeContact = (e) => {
    setContact(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangeState = (e) => {
    setState(e.target.value);
  };
  const handleChangeManager = (e) => {
    setManager(e.target.value);
    if (e.target.value !== "select") {
      // const updatedErrors = [...ValError];
      // updatedErrors[3] = "";
      // setValError(updatedErrors);
    }
  };
  const handleChangePostal = (e) => {
    setPostal(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    // const { name, email, contact, manager_name, city,state, postal_code } = document.forms[0];
    setValError([]);
    const updatedErrors = [...ValError];

    if (Name === "") {
      updatedErrors[0] = "Please enter store name.";
      setValError(updatedErrors);
      return;
    }
    if (Name !== "") {
      if (validName1(Name, 0) === false) {
        return;
      }
    }
    if (Name1 != Name) {
      if (nexist === 1) {
        updatedErrors[0] = "Store name must be unique.";
        setValError(updatedErrors);
        return;
      }
    }
    updatedErrors[0] = "";

    if (Email === "") {
      updatedErrors[1] = "Please enter email.";
      setValError(updatedErrors);
      return;
    }
    if (Email !== "") {
      if (validateEmail1(Email, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";

    if (Contact === "") {
      updatedErrors[2] = "Please enter contact no.";
      setValError(updatedErrors);
      return;
    }
    if (Contact !== "") {
      if (validPhone1(Contact, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    // if (Manager === "select") {
    //   updatedErrors[3] = "Please select manager.";
    //   setValError(updatedErrors);
    //   return;
    // }
    // updatedErrors[3] = "";

    if (Address !== "") {
      if (ValidText1(Address, 4) === false) {
        return;
      }
    }
    updatedErrors[4] = "";

    if (City !== "") {
      if (ValidText1(City, 5) === false) {
        return;
      }
    }
    updatedErrors[5] = "";

    if (State !== "") {
      if (ValidText1(State, 6) === false) {
        return;
      }
    }
    updatedErrors[6] = "";

    if (Postal !== "") {
      if (ValidText1(Postal, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";
    const manager_id = getmanager.find((item) => item.manager === Manager);
    var mag = null;
    if (manager_id != undefined) {
      mag = manager_id.employee_id;
    }
    const response = await EditStoreApi(
      param.Store_id,
      Name,
      Email,
      Contact,
      mag,
      Location_id,
      Address,
      City,
      State,
      Postal
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/stores");
      alert("Store updated successfully.");
    } else {
      alert("Store failed to update.");
    }
  };
  useEffect(() => {
    async function fetchData() {
      await CheckStoreNameExist(Name)
        .then((resp) => {
          // console.log(resp.data);
          setnexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [Name]);
  useEffect(() => {
    fetchData();
    const resp1 = GetStoreByID(param.Store_id);
    resp1
      .then(function (result) {
        setName(result.data[0].name);
        setName1(result.data[0].name);
        setEmail(result.data[0].email);
        setContact(result.data[0].contact);
        setAddress(result.data[0].street_address);
        setCity(result.data[0].city);
        setState(result.data[0].state);
        setPostal(result.data[0].postal_code);
        setManager(result.data[0].manager_id);
        setLocation_id(result.data[0].location_id);
        setManager(result.data[0].manager);

        //     setStoreDetail(result.data);
        //   console.log("hehhe" + result.data[0].name);
      })
      .catch((err) => {
        console.log(err.message);
      });

    async function fetchData() {
      GetAllManagers()
        .then((resp) => {
          setGetManager(resp.data || []);
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div style={{ paddingLeft: "110px" }}>
        <Header title="EDIT STORE" />
      </div>
      <div className="user-body">
        <div className="offset-lg-3 col-lg-6">
          <form>
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              {/* <div className="flex justify-center"> */}
              <div class="article-container-cus">
                <div className="flex justify-left">
                  <div class="article-employee2">
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
                          value={Name}
                          onChange={handleChangeName}
                          placeholder="Name"
                          className="input"
                          style={{ marginTop: "10px" }}
                          autoFocus
                          onBlur={(e) => validName1(e.target.value, 0)}
                        />
                        <span style={{ color: "red", fontSize: "24px" }}>
                          {`  `}*
                        </span>
                        {ValError[0] && (
                          <p style={{ color: "red" }}>{ValError[0]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Email: </label>
                        <br />
                        <input
                          required
                          value={Email}
                          onChange={handleChangeEmail}
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validateEmail1(e.target.value, 1)}
                        />
                        <span style={{ color: "red", fontSize: "24px" }}>
                          {`  `}*
                        </span>
                        {ValError[1] && (
                          <p style={{ color: "red" }}>{ValError[1]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Contact: </label>
                        <br />
                        <input
                          type="text"
                          name="contact"
                          value={Contact}
                          onChange={handleChangeContact}
                          placeholder="Contact"
                          className="input"
                          onBlur={(e) => validPhone1(e.target.value, 2)}
                          style={{ marginTop: "10px" }}
                        />
                        <span style={{ color: "red", fontSize: "24px" }}>
                          {`  `}*
                        </span>
                        {ValError[2] && (
                          <p style={{ color: "red" }}>{ValError[2]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Manager: </label>
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
                            width: "70%",
                          }}
                        >
                          <option value="select"> select </option>

                          {getmanager.map((item) => (
                            <option key={item.employee_id}>
                              {item.manager}
                            </option>
                          ))}
                        </select>
                        {/* <span style={{ color: "red", fontSize: "26px" }}>
                          {` `}*
                        </span>
                        {ValError[3] && (
                          <p style={{ color: "red" }}>{ValError[3]}</p>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div class="article-employee2">
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
                          value={Address}
                          id="noteTextarea"
                          onChange={handleChangeAddress}
                          style={{
                            width: "70%",
                            height: "70px",
                            marginTop: "10px",
                          }}
                          rows="4"
                          className="textarea"
                          onBlur={(e) => ValidText1(e.target.value, 4)}
                        />
                        {ValError[4] && (
                          <p style={{ color: "red" }}>{ValError[4]}</p>
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
                          value={City}
                          onChange={handleChangeCity}
                          style={{ marginTop: "10px" }}
                          placeholder="City"
                          className="input"
                          onBlur={(e) => ValidText1(e.target.value, 5)}
                        />
                        {ValError[5] && (
                          <p style={{ color: "red" }}>{ValError[5]}</p>
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
                          value={State}
                          onChange={handleChangeState}
                          style={{ marginTop: "10px" }}
                          placeholder="State"
                          className="input"
                          onBlur={(e) => ValidText1(e.target.value, 6)}
                        />
                        {ValError[6] && (
                          <p style={{ color: "red" }}>{ValError[6]}</p>
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
                          value={Postal}
                          onChange={handleChangePostal}
                          style={{ marginTop: "10px" }}
                          placeholder="Postal Code"
                          className="input"
                          onBlur={(e) => ValidText1(e.target.value, 7)}
                        />
                        {ValError[7] && (
                          <p style={{ color: "red" }}>{ValError[7]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
      <div class="article-employee">
        <div className="flex justify-left">
          <div class="article-container-cus">
            <div style={{ paddingLeft: "330px" }}>
              <Button
                margin="10px"
                padding="20px"
                color="white"
                className="custom-button ml-2"
                bgColor={currentColor}
                text="Update"
                borderRadius="10px"
                onClick={handleUpdateClick}
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
  );
};

export default EditStore;
