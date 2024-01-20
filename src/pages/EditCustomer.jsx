import React, { useEffect, useState, useRef } from "react";
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
  validateEmail,
  validateName,
  ValidPhone,
  ValidWebsite,
  ValidAmount,
  ValidText,
} from "../contexts/Utils";
import {
  EditCustomerApi,
  GetCustomerById,
  CheckCusNameExist,
} from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/AddCus.css";
import default_img from "../data/default_img.jpg";

const EditCustomer = () => {
  const { currentColor } = useStateContext();
  let param = useParams();
  const fileInputRef = useRef(null);
  const [Name, setName] = useState("");
  const [Name1, setName1] = useState("");
  const [aexist, setaexist] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Website, setWebsite] = useState("");
  const [Contact_name, setContact_Name] = useState("");
  const [Contact_phone, setContact_Phone] = useState("");
  const [Contact_Email, setContact_Email] = useState("");
  const [ProdImage, setProdImage] = useState("");
  const [Notes, setNotes] = useState(null);
  const [b_street, setB_street] = useState("");
  const [b_state, setB_state] = useState("");
  const [b_city, setB_city] = useState("");
  const [b_country, setB_country] = useState("");
  const [phone1, setB_phone1] = useState("");
  const [phone2, setB_phone2] = useState("");
  const [b_zip, setB_zip] = useState("");
  const [s_street, setS_street] = useState("");
  const [s_city, setS_city] = useState("");
  const [s_state, setS_state] = useState("");
  const [s_zip, setS_zip] = useState("");
  const [s_country, setS_country] = useState("");
  const [attention_name, setS_attention_name] = useState("");
  const [s_phone, setS_phone] = useState("");
  const [s_id, sets_id] = useState("");
  const [b_id, setb_id] = useState("");
  const [acc_notes, setAccNotes] = useState("0");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [acc_type_id, setacc_type_id] = useState("");
  const [type_id, settype_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");

  const [ledger_date, setledger_date] = useState("");

  const [ProductImage, setProductImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [Flag, setFlag] = useState(0);
  const [ValError, setValError] = useState([]);

  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  // const handleChangeAccNote = (e) => {
  //   setAccNotes(e.target.value);
  // };
  // const handleChangeAccName = (e) => {
  //   setAccName(e.target.value);
  // };
  // const handleChangeAccDesc = (e) => {
  //   setAccDesc(e.target.value);
  // };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeWebsite = (e) => {
    setWebsite(e.target.value);
  };
  const handleChangeContact_name = (e) => {
    setContact_Name(e.target.value);
  };
  const handleChangeContact_email = (e) => {
    setContact_Email(e.target.value);
  };
  const handleChangeContact_phone = (e) => {
    setContact_Phone(e.target.value);
  };
  const handleChangeNotes = (e) => {
    setNotes(e.target.value);
  };

  const handleCopyClick = (e) => {
    e.preventDefault();
    setS_street(b_street);
    setS_city(b_city);
    setS_state(b_state);
    setS_zip(b_zip);
    setS_phone(phone1);
    setS_country(b_country);
    setAccNotes(1);
  };
  const handleChangePhone1 = (e) => {
    setB_phone1(e.target.value);
    if (e.target.value === "") {
    }
  };
  const handleChangePhone2 = (e) => {
    setB_phone2(e.target.value);
  };
  const handleChangeAttention_Name = (e) => {
    setS_attention_name(e.target.value);
  };
  const handleChangeB_street = (e) => {
    setB_street(e.target.value);
  };
  const handleChangeB_city = (e) => {
    setB_city(e.target.value);
  };
  const handleChangeB_state = (e) => {
    setB_state(e.target.value);
  };
  const handleChangeB_zip = (e) => {
    setB_zip(e.target.value);
  };
  const handleChangeB_country = (e) => {
    setB_country(e.target.value);
  };
  const handleChangeS_street = (e) => {
    setS_street(e.target.value);
  };
  const handleChangeS_city = (e) => {
    setS_city(e.target.value);
  };
  const handleChangeS_state = (e) => {
    setS_state(e.target.value);
  };
  const handleChangeS_zip = (e) => {
    setS_zip(e.target.value);
  };
  const handleChangeS_country = (e) => {
    setS_country(e.target.value);
  };
  const handleChangeS_phone = (e) => {
    setS_phone(e.target.value);
  };
  const handleChangeLedgerNote = (e) => {
    setLedgerNotes(e.target.value);
  };
  const handleChangeOpeningBalance = (e) => {
    setOpeningBal(e.target.value);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  const [profile1, setprofile1] = useState(
    dataURLtoFile(default_img, "default_img.jpg")
  );

  const handleChangeLedgerDate = (e) => {
    const inputDate = new Date(e.target.value);

    inputDate.setUTCHours(12);

    const formattedDate = inputDate.toISOString().split("T")[0];
    setledger_date(formattedDate);
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
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const ValidWebsite1 = (web, ii) => {
    try {
      const updatedErrors = [...ValError];
      if (web.trim().length === 0) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return false;
      }
      if (ValidWebsite(web)) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return true;
      }
      updatedErrors[ii] = "Invalid field.";
      setValError(updatedErrors);
      return false;
    } catch (err) {
      return false;
    }
  };

  const ValidAmount1 = (amt, ii) => {
    const updatedErrors = [...ValError];
    if (amt.trim().length === 0) {
      return false;
    }
    if (ValidAmount(amt)) {
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
    if (txt.trim().length === 0 || txt.trim() === "") {
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

  const handleClickRemoveImage = () => {
    setProductImage(null);
    setProdImage(null);
    fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    try {
      // setProdImage("");
      setFlag(1);
      const file = e.target.files[0];
      if (!file) {
        setProductImage(default_img);
      }
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      return false;
    }
  };

  const handleBackClick = async (event) => {
    event.preventDefault();

    try {
      console.log("Back");
      navigate("/customers");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {

    //       s_street,
    //       s_city,
    //       s_state,
    //       s_zip,
    //       s_country,
    //       s_phone,
    //     } = document.forms[0];
    setValError([]);
    const updatedErrors = [...ValError];

    if (Name === "") {
      updatedErrors[0] = "Please enter name";
      setValError(updatedErrors);
      return;
    }
    if (Name) {
      if (validName1(Name, 0) === false) {
        return;
      }
    }
    if (Name1 != Name) {
      if (aexist === 1) {
        updatedErrors[0] = "Customer name must be unique.";
        setValError(updatedErrors);
        return;
      }
    }
    updatedErrors[0] = "";

    if (Phone === "") {
      updatedErrors[1] = "Please enter phone no.";
      setValError(updatedErrors);
      return;
    }
    if (Phone) {
      if (validPhone1(Phone, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";

    if (Email === "") {
      updatedErrors[2] = "Please enter email address";
      setValError(updatedErrors);
      return;
    }
    if (Email) {
      if (validateEmail1(Email, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (Website) {
      if (ValidWebsite1(Website, 3) === false) {
        return;
      }
    }
    updatedErrors[3] = "";

    if (OpeningBal === "") {
      updatedErrors[4] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[4] = "";

    if (Contact_name === "") {
      updatedErrors[5] = "Please enter contact name.";
      setValError(updatedErrors);
      return;
    }
    if (Contact_name) {
      if (validName1(Contact_name, 5) === false) {
        return;
      }
    }
    updatedErrors[5] = "";

    if (Contact_phone) {
      if (validPhone1(Contact_phone, 6) === false) {
        return;
      }
    }
    updatedErrors[6] = "";

    if (Contact_Email) {
      if (validateEmail1(Contact_Email, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";

    if (Notes) {
      if (ValidText1(Notes, 8) === false) {
        return;
      }
    }
    updatedErrors[8] = "";

    if (b_street) {
      if (ValidText1(b_street, 9) === false) {
        return;
      }
    }
    updatedErrors[9] = "";

    if (b_city) {
      if (ValidText1(b_city, 10) === false) {
        return;
      }
    }
    updatedErrors[10] = "";

    if (b_zip) {
      if (ValidText1(b_zip, 11) === false) {
        return;
      }
    }
    updatedErrors[11] = "";

    if (b_state) {
      if (ValidText1(b_state, 12) === false) {
        return;
      }
    }
    updatedErrors[12] = "";

    if (b_country) {
      if (ValidText1(b_country, 13) === false) {
        return;
      }
    }
    updatedErrors[13] = "";

    if (phone1) {
      if (validPhone1(phone1, 14) === false) {
        return;
      }
    }
    updatedErrors[14] = "";

    if (phone2) {
      if (validPhone1(phone2, 15) === false) {
        return;
      }
    }
    updatedErrors[15] = "";

    if (s_street) {
      if (ValidText1(s_street, 16) === false) {
        return;
      }
    }
    updatedErrors[16] = "";

    if (s_city) {
      if (ValidText1(s_city, 17) === false) {
        return;
      }
    }
    updatedErrors[17] = "";

    if (s_zip) {
      if (ValidText1(s_zip, 18) === false) {
        return;
      }
    }
    updatedErrors[18] = "";

    if (s_state) {
      if (ValidText1(s_state, 19) === false) {
        return;
      }
    }
    updatedErrors[19] = "";

    if (s_country) {
      if (ValidText1(s_country, 20) === false) {
        return;
      }
    }
    updatedErrors[20] = "";

    if (s_phone) {
      if (validPhone1(s_phone, 21) === false) {
        return;
      }
    }
    updatedErrors[21] = "";

    if (attention_name) {
      if (validName1(attention_name, 22) === false) {
        return;
      }
    }
    updatedErrors[22] = "";

    var z = null;
    if (ProductImage === null && ProdImage === null) {
      z = profile1;
    } else if (ProductImage === "") {
      const base64Image = ProdImage;
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      z = blob;
    } else {
      z = ProductImage;
    }
    console.log("jsjs");

    const response = await EditCustomerApi(
      param.Customer_id,
      Name,
      Phone,
      Email,
      Website,
      Contact_name,
      Contact_phone,
      Contact_Email,
      z,
      Notes,
      b_id,
      b_street,
      b_city,
      b_state,
      b_zip,
      b_country,
      phone1,
      phone2,
      s_id,
      s_street,
      s_city,
      s_state,
      s_zip,
      s_country,
      attention_name,
      s_phone,
      acc_id,
      acc_type_id,
      type_id,
      OpeningBal
    );

    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/customers");
      alert("Customer updated successfully.");
    } else {
      alert("Customer failed to update.");
    }
  };
  useEffect(() => {
    async function fetchData() {
      await CheckCusNameExist(Name)
        .then((resp) => {
          console.log(resp.data);
          setaexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [Name]);
  // useEffect(() => {
  //   setS_street(b_street);
  //   setS_city(b_city);
  //   setS_state(b_state);
  //   setS_zip(b_zip);
  //   setS_phone(phone1);
  //   setS_country(b_country);
  // }, [acc_notes]);
  useEffect(() => {
    async function fetchData() {
      // console.log(param.Customer_id);
      const resp1 = GetCustomerById(param.Customer_id);
      resp1
        .then(function (result) {
          // console.log(result.data[0][0].profile);
          setName(result.data[0][0].name);
          setName1(result.data[0][0].name);
          setPhone(result.data[0][0].phone);
          setEmail(result.data[0][0].email);
          setWebsite(result.data[0][0].website);
          setContact_Name(result.data[0][0].contact_name);
          setContact_Phone(result.data[0][0].contact_phone);
          setContact_Email(result.data[0][0].contact_email);
          setProdImage(result.data[0][0].profile);
          setNotes(result.data[0][0].notes);
          setB_street(result.data[0][0].b_street);
          setB_city(result.data[0][0].b_city);
          setB_state(result.data[0][0].b_state);
          setB_zip(result.data[0][0].b_zip);
          setB_country(result.data[0][0].b_country);
          setB_phone1(result.data[0][0].phone1);
          setB_phone2(result.data[0][0].phone2);
          setS_street(result.data[0][0].s_street);
          setS_city(result.data[0][0].s_city);
          setS_state(result.data[0][0].s_state);
          setS_zip(result.data[0][0].s_zip);
          setS_country(result.data[0][0].s_country);
          setS_attention_name(result.data[0][0].attention_name);
          setS_phone(result.data[0][0].s_phone);
          setb_id(result.data[0][0].billing_address_id);
          sets_id(result.data[0][0].shipping_address_id);
          setacc_id(result.data[0][0].account_id);
          settype_id(result.data[0][0].type_id);
          setacc_type_id(result.data[0][0].acc_type_id);
          setOpeningBal(result.data[0][0].opening_balance);
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
          <Header title="EDIT CUSTOMER" />
        </div>

        <div className="offset-lg-3 col-md-6">
          <form name="0">
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container-cus">
                <div className="flex justify-left">
                  <div class="article-cus">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          GENERAL INFOMARTION{" "}
                        </b>
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Name: </label>
                        <br />
                        <input
                          className="input"
                          required
                          type="text"
                          onChange={handleChangeName}
                          value={Name}
                          name="name"
                          placeholder="Name"
                          autoFocus
                          onBlur={(e) => validName1(e.target.value, 0)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
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
                        <label style={{ fontWeight: "bold" }}>Phone: </label>
                        <br />
                        <input
                          required
                          type="text"
                          name="phone"
                          onChange={handleChangePhone}
                          value={Phone}
                          placeholder="Phone"
                          className="input"
                          onBlur={(e) => validPhone1(e.target.value, 1)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
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
                        <label style={{ fontWeight: "bold" }}>Email: </label>
                        <br />
                        <input
                          type="text"
                          name="email"
                          onChange={handleChangeEmail}
                          value={Email}
                          placeholder="Email"
                          className="input"
                          onBlur={(e) => validateEmail1(e.target.value, 2)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
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
                        <label style={{ fontWeight: "bold" }}>Website: </label>
                        <br />
                        <input
                          type="text"
                          name="website"
                          onChange={handleChangeWebsite}
                          value={Website}
                          placeholder="Website"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidWebsite1(e.target.value, 3)}
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
                          step="1.00"
                          min="0"
                          defaultValue={0}
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          value={OpeningBal}
                          onChange={handleChangeOpeningBalance}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {`  `}*
                        </span>
                        {ValError[4] && (
                          <p style={{ color: "red" }}>{ValError[4]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div
                      className="card-cus"
                      style={{
                        width: "400px",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div class="article-cus-card">
                        <div>
                          {ProductImage ? (
                            <div class="wrapper-cus">
                              <img
                                src={uploadedImage}
                                className="box-cus"
                                alt="Customer"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          ) : (
                            <div class="wrapper-product">
                              <img
                                src={`data:image/jpeg;base64,${ProdImage}`}
                                className="box-cus"
                                alt="Customer"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="article-cus-card">
                        <div>
                          <button
                            style={{ paddingLeft: "130px" }}
                            type="button"
                            onClick={handleClickRemoveImage}
                          >
                            ❌
                          </button>
                          <div className="cus-image-label">
                            <label htmlFor="imageInput">Profile:</label>
                          </div>
                          <div className="cus-image-input">
                            <input
                              ref={fileInputRef}
                              className="flex justify-left"
                              type="file"
                              id="imageInput"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="article-cus">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          CONTACT INFORMATION{" "}
                        </b>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Contact Name:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="contact_name"
                          placeholder="Contact Name"
                          onChange={handleChangeContact_name}
                          value={Contact_name}
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validName1(e.target.value, 5)}
                        />
                        <span style={{ color: "red", fontSize: "26px" }}>
                          {`  `}*
                        </span>
                        {ValError[5] && (
                          <p style={{ color: "red" }}>{ValError[5]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Contact Phone:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="contact_phone"
                          onChange={handleChangeContact_phone}
                          value={Contact_phone}
                          placeholder="Contact Phone"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validPhone1(e.target.value, 6)}
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
                          Contact Email:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="contact_email"
                          onChange={handleChangeContact_email}
                          value={Contact_Email}
                          placeholder="Contact Email"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validateEmail1(e.target.value, 7)}
                        />
                        {ValError[7] && (
                          <p style={{ color: "red" }}>{ValError[7]}</p>
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
                          placeholder="Customer Note "
                          id="noteTextarea"
                          value={Notes}
                          onChange={handleChangeNotes}
                          rows="4"
                          style={{ marginTop: "10px", width: "72%" }}
                          onBlur={(e) => ValidText1(e.target.value, 8)}
                          className="textarea"
                        />
                        {ValError[8] && (
                          <p style={{ color: "red" }}>{ValError[8]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="article-cus">
                    <div class="article-container-cus1">
                      <div class="article-cus2">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <b
                              style={{
                                fontSize: "20px",
                                fontStyle: "bold",
                                color: "#03C9D7",
                              }}
                            >
                              BILLING ADDRESS
                            </b>
                          </div>
                        </div>
                      </div>
                      <div class="article-cus3"></div>
                      <div class="article-cus2">
                        <button
                          style={{
                            padding: "4px",
                            backgroundColor: "#03C9D7",
                            color: "#fff",
                            border: "none",
                            fontWeight: "bold",
                            width: "30px",
                          }}
                          color="white"
                          onClick={handleCopyClick}
                        >
                          C
                        </button>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Street: </label>
                        <br />
                        <input
                          type="text"
                          name="b_street"
                          onChange={handleChangeB_street}
                          value={b_street}
                          placeholder="Street"
                          className="input"
                          style={{ marginTop: "10px" }}
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
                        <label style={{ fontWeight: "bold" }}>City: </label>
                        <br />
                        <input
                          type="text"
                          name="b_city"
                          onChange={handleChangeB_city}
                          value={b_city}
                          placeholder="City"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 10)}
                        />
                        {ValError[10] && (
                          <p style={{ color: "red" }}>{ValError[10]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Zip: </label>
                        <br />
                        <input
                          type="text"
                          name="b_zip"
                          onChange={handleChangeB_zip}
                          value={b_zip}
                          placeholder="Zip"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 11)}
                        />
                        {ValError[11] && (
                          <p style={{ color: "red" }}>{ValError[11]}</p>
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
                          name="b_state"
                          onChange={handleChangeB_state}
                          value={b_state}
                          placeholder="State"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 12)}
                        />
                        {ValError[12] && (
                          <p style={{ color: "red" }}>{ValError[12]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Country: </label>
                        <br />
                        <input
                          type="text"
                          name="b_country"
                          onChange={handleChangeB_country}
                          value={b_country}
                          placeholder="Country"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 13)}
                        />
                        {ValError[13] && (
                          <p style={{ color: "red" }}>{ValError[13]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Phone 1: </label>
                        <br />
                        <input
                          type="text"
                          name="phone1"
                          onChange={handleChangePhone1}
                          value={phone1}
                          placeholder="Phone1"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validPhone1(e.target.value, 14)}
                        />
                        {ValError[14] && (
                          <p style={{ color: "red" }}>{ValError[14]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Phone 2: </label>
                        <br />
                        <input
                          type="text"
                          name="phone2"
                          onChange={handleChangePhone2}
                          value={phone2}
                          placeholder="Phone2"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validPhone1(e.target.value, 15)}
                        />
                        {ValError[15] && (
                          <p style={{ color: "red" }}>{ValError[15]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                  <div class="article-cus">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          SHIPPING ADDRESS{" "}
                        </b>
                        {/* <label >Billing Address </label> */}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Street: </label>
                        <br />
                        <input
                          type="text"
                          name="s_street"
                          placeholder="Street"
                          onChange={handleChangeS_street}
                          value={s_street}
                          className="input"
                          onBlur={(e) => ValidText1(e.target.value, 16)}
                          style={{ marginTop: "10px" }}
                        />
                        {ValError[16] && (
                          <p style={{ color: "red" }}>{ValError[16]}</p>
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
                          name="s_city"
                          onChange={handleChangeS_city}
                          value={s_city}
                          placeholder="City"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 17)}
                        />
                        {ValError[17] && (
                          <p style={{ color: "red" }}>{ValError[17]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Zip: </label>
                        <br />
                        <input
                          type="text"
                          name="s_zip"
                          onChange={handleChangeS_zip}
                          onBlur={(e) => ValidText1(e.target.value, 18)}
                          value={s_zip}
                          placeholder="Postal Code"
                          className="input"
                          style={{ marginTop: "10px" }}
                        />
                        {ValError[18] && (
                          <p style={{ color: "red" }}>{ValError[18]}</p>
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
                          name="s_state"
                          onChange={handleChangeS_state}
                          value={s_state}
                          placeholder="State"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 19)}
                        />
                        {ValError[19] && (
                          <p style={{ color: "red" }}>{ValError[19]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Country: </label>
                        <br />
                        <input
                          type="text"
                          name="s_country"
                          onChange={handleChangeS_country}
                          value={s_country}
                          placeholder="Country"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 20)}
                        />
                        {ValError[20] && (
                          <p style={{ color: "red" }}>{ValError[20]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Phone: </label>
                        <br />
                        <input
                          type="text"
                          name="s_phone"
                          onChange={handleChangeS_phone}
                          value={s_phone}
                          placeholder="Phone"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validPhone1(e.target.value, 21)}
                        />
                        {ValError[21] && (
                          <p style={{ color: "red" }}>{ValError[21]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Attention Name:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="attention_name"
                          onChange={handleChangeAttention_Name}
                          value={attention_name}
                          placeholder="Attention Name"
                          className="input"
                          style={{ marginTop: "10px" }}
                          onBlur={(e) => validName1(e.target.value, 22)}
                        />
                        {ValError[22] && (
                          <p style={{ color: "red" }}>{ValError[22]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div class="article-cus2">
              <div className="flex justify-center">
                <div class="article-container-cus">
                  <div style={{ paddingLeft: "600px" }}>
                    <Button
                      margin="10px"
                      padding="20px"
                      color="white"
                      className="custom-button mr-2"
                      bgColor={currentColor}
                      text="Update"
                      borderRadius="10px"
                      onClick={handleSubmit}
                    />
                  </div>
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
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
