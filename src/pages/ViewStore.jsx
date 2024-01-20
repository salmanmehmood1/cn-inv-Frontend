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
import { getAllProductByStoreID, GetStoreByID } from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/AddCus.css";

const ViewStore = () => {
  const [AllStock, setAllStock] = useState("");
  const [Name, setName] = useState(" ");
  const [Email, setEmail] = useState(" ");
  const [Contact, setContact] = useState(" ");
  const [Address, setAddress] = useState(" ");
  const [City, setCity] = useState(" ");
  const [State, setState] = useState(" ");
  const [Postal, setPostal] = useState(" ");
  const [Manager, setManager] = useState(" ");

  let param = useParams();
  const navigate = useNavigate();
  const customerGridImage1 = (props) => <div>{"PORD" + props.product_id}</div>;

  const customersGrid = [
    // { type: 'checkbox', width: '20' },

    {
      headerText: "Product ID",
      field: "product_id",
      template: customerGridImage1,
      width: "150",
      textAlign: "Center",
    },

    {
      headerText: "Product Name",
      field: "productname",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "code",
      headerText: "Product Code",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "unit_instock",
      headerText: "Stock",
      width: "150",
      textAlign: "Center",
    },

    { field: "unit", headerText: "Unit", width: "150", textAlign: "Center" },

    {
      field: "opening_balance",
      headerText: "Opening Balance",
      width: "150",
      textAlign: "Center",
    },
  ];

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

  useEffect(() => {
    const resp = getAllProductByStoreID(param.Store_id);
    resp
      .then(function (result) {
        setAllStock(result.data);
        //console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const resp1 = GetStoreByID(param.Store_id);
    resp1
      .then(function (result) {
        setName(result.data[0].name);
        setEmail(result.data[0].email);
        setContact(result.data[0].contact);
        setAddress(result.data[0].street_address);
        setCity(result.data[0].city);
        setState(result.data[0].state);
        setPostal(result.data[0].postal_code);
        setManager(result.data[0].manager);
        //     setStoreDetail(result.data);
        //   console.log("hehhe" + result.data[0].name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="STORE INVENTORY" />
      <div className="m-2 md:m-4 p-1 md:p-1 bg-white rounded-2xl">
        <div className="mt-4">
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
                        <label style={{ fontWeight: "bold" }}>Name: </label>
                        <br />
                        <input
                          required
                          type="text"
                          name="name"
                          value={Name}
                          placeholder="Name"
                          className="input"
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
                          required
                          value={Email}
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="input"
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
                          type="text"
                          name="contact"
                          value={Contact}
                          placeholder="Contact"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                  <div class="article-employee2">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Manager: </label>
                        <br />
                        <input
                          type="text"
                          //step="0.01"
                          name="manager_name"
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
                        <label style={{ fontWeight: "bold" }}>City: </label>
                        <br />
                        <input
                          type="text"
                          name="city"
                          value={City}
                          placeholder="City"
                          className="input"
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
                          value={State}
                          placeholder="State"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                    </div>
                    <br />
                  </div>

                  <div class="article-employee2">
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
                          placeholder="Postal Code"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px" }}
                        />
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
                          //   value={street_address}
                          //   onChange={handleChangeAddress}
                          rows="4"
                          className="textarea"
                          readOnly
                          style={{ width: "70%", marginTop: "10px" }}
                        />
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              </div>
            </div>

            <GridComponent
              dataSource={AllStock}
              allowPaging={true}
              pageSettings={{ pageSize: 25 }}
              allowSorting
              allowTextWrap={true}
              toolbar={["Search"]}
              width="auto"
              height={380}
              className="custom-grid"
            >
              <ColumnsDirective>
                {customersGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[Page, Toolbar, Selection, Edit, Sort, Filter]}
              />
            </GridComponent>
            <div class="article-employee">
              <div className="flex justify-center">
                <div class="article-container-cus">
                  <div style={{ paddingLeft: "60px" }}>
                    <Button
                      // margin="10px"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewStore;
