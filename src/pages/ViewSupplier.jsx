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
import { EditSupplierApi, GetSupplierById } from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/AddCus.css";
import default_img from "../data/default_img.jpg";

const ViewSupplier = () => {
  const { currentColor } = useStateContext();
  let param = useParams();

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Website, setWebsite] = useState("");
  const [Contact_name, setContact_Name] = useState("");
  const [Contact_phone, setContact_Phone] = useState("");
  const [Contact_Email, setContact_Email] = useState("");
  const [ProdImage, setProdImage] = useState("");
  const [Notes, setNotes] = useState("");
  const [r_street, setR_street] = useState("");
  const [r_state, setR_state] = useState("");
  const [r_city, setR_city] = useState("");
  const [r_country, setR_country] = useState("");
  const [r_phone, setR_phone] = useState("");
  const [r_zip, setR_zip] = useState("");
  const [s_street, setS_street] = useState("");
  const [s_city, setS_city] = useState("");
  const [s_state, setS_state] = useState("");
  const [s_zip, setS_zip] = useState("");
  const [s_country, setS_country] = useState("");
  const [attention_name, setS_attention_name] = useState("");
  const [s_phone, setS_phone] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [acc_type_id, setacc_type_id] = useState("");
  const [type_id, settype_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [ledger_date, setledger_date] = useState(
    new Date().toISOString().split("T")[0] + " 00:00:00"
  );

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // console.log(param.Supplier_id)
      const resp1 = GetSupplierById(param.Supplier_id);
      resp1
        .then(function (result) {
          // console.log(result.data[0].profile);
          setName(result.data[0].name);
          setPhone(result.data[0].phone);
          setWebsite(result.data[0].website);
          setContact_Name(result.data[0].contact_name);
          setContact_Phone(result.data[0].contact_phone);
          setContact_Email(result.data[0].contact_email);
          setProdImage(result.data[0].profile);
          setNotes(result.data[0].notes);
          setR_street(result.data[0].r_street);
          setR_city(result.data[0].r_city);
          setR_state(result.data[0].r_state);
          setR_zip(result.data[0].r_zip);
          setR_country(result.data[0].r_country);
          setR_phone(result.data[0].r_phone);
          setS_street(result.data[0].s_street);
          setS_city(result.data[0].s_city);
          setS_state(result.data[0].s_state);
          setS_zip(result.data[0].s_zip);
          setS_country(result.data[0].s_country);
          setS_attention_name(result.data[0].attention_name);
          setS_phone(result.data[0].s_phone);
          setacc_id(result.data[0].account_id);
          settype_id(result.data[0].type_id);
          setacc_type_id(result.data[0].acc_type_id);
          setOpeningBal(result.data[0].opening_balance);
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
          <Header title="VIEW SUPPLIER" />
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
                          required
                          type="text"
                          name="name"
                          style={{ marginTop: "10px", width: "80%" }}
                          value={Name}
                          placeholder="Name"
                          className="input"
                          readOnly
                        />
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
                          value={Phone}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Enter Phone"
                          className="input"
                          readOnly
                        />
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
                          value={Website}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Website"
                          className="input"
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
                          step="1.00"
                          style={{ marginTop: "10px", width: "80%" }}
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          value={OpeningBal}
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="imageInput"
                        >
                          Profile:
                        </label>
                        {ProdImage ? (
                          <div class="wrapper">
                            <img
                              src={`data:image/jpeg;base64,${ProdImage}`}
                              className="box"
                              alt="Product"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                marginTop: "10px",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        ) : (
                          <p>No Image Available </p>
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
                          value={Contact_name}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Contact Name"
                          className="input"
                          readOnly
                        />
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
                          value={Contact_phone}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Contact Phone"
                          className="input"
                          readOnly
                        />
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
                          value={Contact_Email}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Contact Email"
                          className="input"
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
                          placeholder="Note"
                          id="noteTextarea"
                          style={{ marginTop: "10px", width: "80%" }}
                          value={Notes}
                          rows="4"
                          className="textarea"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="article-cus">
                    {/* <div class="article-container-cus"> */}
                    <div className="col-lg-12">
                      <div className="form-group">
                        <b
                          style={{
                            fontSize: "20px",
                            fontStyle: "bold",
                            color: "#03C9D7",
                          }}
                        >
                          REMITTING ADDRESS
                        </b>
                        {/* <label >Billing Address </label> */}
                      </div>
                    </div>
                    {/* </div> */}
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Street: </label>
                        <br />
                        <input
                          type="text"
                          name="r_street"
                          value={r_street}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Street"
                          className="input"
                          readOnly
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
                          name="r_city"
                          value={r_city}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="City"
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Zip: </label>
                        <br />
                        <input
                          type="text"
                          name="r_zip"
                          value={r_zip}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Zip"
                          className="input"
                          readOnly
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
                          name="r_state"
                          value={r_state}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="State"
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Country: </label>
                        <br />
                        <input
                          type="text"
                          name="r_country"
                          value={r_country}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Country"
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Phone: </label>
                        <br />
                        <input
                          type="text"
                          name="r_phone"
                          value={r_phone}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Phone"
                          className="input"
                          readOnly
                        />
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
                          value={s_street}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Street"
                          className="input"
                          readOnly
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
                          name="s_city"
                          value={s_city}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="City"
                          className="input"
                          readOnly
                        />
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
                          value={s_zip}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Zip"
                          className="input"
                          readOnly
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
                          name="s_state"
                          value={s_state}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="State"
                          className="input"
                          readOnly
                        />
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
                          value={s_country}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Country"
                          className="input"
                          readOnly
                        />
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
                          value={s_phone}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Phone"
                          className="input"
                          readOnly
                        />
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
                          value={attention_name}
                          style={{ marginTop: "10px", width: "80%" }}
                          placeholder="Attention Name"
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <div class="article-cus2">
                <div className="flex justify-center">
                  <div class="article-container-cus">
                    <div style={{ paddingLeft: "500px" }}>
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
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewSupplier;
