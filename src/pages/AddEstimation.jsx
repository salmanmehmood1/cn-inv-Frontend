import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  GetAllCustomersName,
  GetProductNameCodeInv,
  GetProductByIdSale,
  GetSaleCustomerById,
  AddEstimationApi,
  GetProductByStoreID,
  EditSaleOrderStatus,
} from "../api/Api";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import Select from "react-select";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import default_img from "../data/default_img.jpg";
import "../styles/sale.css";
import { Card } from "react-bootstrap";

const AddEstimation = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetCustomer, setGetCustomer] = useState([]);
  const [Customer, setCustomer] = useState("");
  const [CustomerOptions, setCustomerOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [p_code, setp_code] = useState("");
  const [customer_ids, setcustomer_ids] = useState("");
  const [CardList, setcartList] = useState([]);
  const [total_amount, settotalAmount] = useState(0.0);
  const [tax, settax] = useState(0.0);
  const [totaldiscount, settotaldiscount] = useState(0.0);
  const [total_item, settotalitem] = useState(0.0);
  const [index1, setindex1] = useState("");
  const [grandtotal, setgrandtotal] = useState(0.0);
  const [note, setnote] = useState("");
  const [CustomerDetail, setCustomerDetail] = useState([]);
  const [cusPhone, setcusPhone] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [projectname1, setprojectname1] = useState("");
  const [projectname2, setprojectname2] = useState(0);
  const [shipmethod, setshipmethod] = useState("");
  const [OrderStatus, setOrderStatus] = useState("MARK AS CLOSE");
  const [orderstatuslable, setorderstatuslable] = useState("OPEN");
  const [ValError, setValError] = useState([]);

  let param = useParams();

  const [formData, setFormData] = useState({
    est_sale: "E",
    customer_id: 5,
    project_name: "Project XYZ",
    total: 500.0,
    amount_paid: 300.0,
    amount_pending: 200.0,
    user_id: 102,
    so_note: "Sale order note",
    total_price: 450.0,
    discount: 50.0,
    tax: 25.0,
    shipment: 10.0,
    store_id: 1,
    sale_products: [],
  });

  const keypadButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    ".",
    "0",
    "00",
  ];

  const [activeInput, setActiveInput] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [ship_qty, setship_qty] = useState(0);

  const handleInputClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };
  const handleShipmentClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleChangeActive = (index) => {
    const newCartList = [...CardList];
    newCartList[index].shippment = newCartList[index].shippment === 0 ? 1 : 0;
    setcartList(newCartList);
  };

  const handleKeypadClick = (value) => {
    TimeoutUtility.resetTimeout();
    if (activeInput !== null) {
      const newCartList = [...CardList];
      const indexToUpdate = index1;

      if (
        activeInput === "quantity" ||
        activeInput === "discount" ||
        activeInput === "shipment"
      ) {
        const currentValue = String(
          newCartList[indexToUpdate][activeInput] || ""
        );
        if (value === "." && currentValue.includes(".")) {
          return;
        }
        if (value === "." && !currentValue.includes(".")) {
          newCartList[indexToUpdate][activeInput] = currentValue + ".";
          setcartList(newCartList);
          return;
        }
        const newValue = currentValue + String(value);

        if (!isNaN(newValue)) {
          newCartList[indexToUpdate][activeInput] = newValue;
          newCartList[indexToUpdate].total =
            newCartList[indexToUpdate].unit_price *
            newCartList[indexToUpdate].quantity;

          setcartList(newCartList);
        }
      } else if (activeInput === "tax" && index1 === -2) {
        const currentTaxValue = String(tax || "");

        if (value === "." && currentTaxValue.includes(".")) {
          return;
        }

        const newValue = currentTaxValue + String(value || "");
        if (!isNaN(newValue)) {
          settax(newValue);
        }
      } else if (activeInput === "shipment1" && index1 === -3) {
        const currentShipmentValue = String(projectname2 || "");

        if (value === "." && currentShipmentValue.includes(".")) {
          return;
        }

        const newValue = currentShipmentValue + String(value || "");
        if (!isNaN(newValue)) {
          setprojectname2(newValue);
        }
      }
    }
  };

  const handleAddcartClick = () => {
    TimeoutUtility.resetTimeout();
    const isProductInCart = CardList.some(
      (item) => item.product_id === product.value
    );
    if (!isProductInCart && product.value) {
      const resp1 = GetProductByIdSale(p_code);
      resp1
        .then(function (result) {
          const defaultProduct = {
            product_id: result.data[0].product_id,
            name: result.data[0].name,
            code: result.data[0].code,
            unit_price: result.data[0].unit_price,
            quantity: 1,
            discount: result.data[0].discount,
            total: result.data[0].unit_price * 1,
            shipment: 0,
          };

          setcartList((prevProductList) => [
            ...prevProductList,
            defaultProduct,
          ]);
          setProducts("");
          setSelectedProduct("");

          setProductOptions((prevOptions) =>
            prevOptions.filter(
              (option) => option.value !== result.data[0].product_id
            )
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleChangeCustomer = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedCustomer(selectedOption);
      setActiveInput("customer");
      setCustomer(selectedOption);
      setcustomer_ids(selectedOption.value);
      getCustomerDetail(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        getProductsAll();
      } else {
        setGetProduct([]);
      }
      setcartList([]);
      settax(0);
      settotaldiscount(0);
      settotaldiscount(0);
      settotalitem(0);
      setSelectedProduct("");
      setnote("");
      settrackingno("");
      setprojectname("");
      setprojectname1("");
      setprojectname2(0);
      setshipmethod("");
    }
  };

  const handleChangeProduct1 = (selectedOption, event) => {
    if (event.key === "Enter" && selectedOption && selectedOption.value) {
      setSelectedProduct(selectedOption);
      setActiveInput("product");
      setProducts(selectedOption);
      const selectedProduct = selectedOption.value;
      setp_code(selectedProduct);
      handleAddcartClick();
    }
  };

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedProduct(selectedOption);
      setActiveInput("product");
      setProducts(selectedOption);
      const selectedProduct = selectedOption.value;
      setp_code(selectedProduct);
    }
  };

  const handleChangeNote = (e) => {
    setnote(e.target.value);
  };
  const handleChangeProjectName = (e) => {
    setprojectname(e.target.value);
  };
  const handleChangeProjectName1 = (e) => {
    setprojectname1(e.target.value);
  };
  const handleChangeProjectName2 = (e) => {
    setActiveInput("shipment1");
    setprojectname2(e.target.value);
    setindex1(-3);
  };
  const handleChangeTrackingNo = (e) => {
    settrackingno(e.target.value);
  };
  const handleChangeShipMethod = (e) => {
    setshipmethod(e.target.value);
  };

  const getCustomerDetail = async (id) => {
    try {
      const resp = await GetSaleCustomerById(id);
      setCustomerDetail(resp.data || []);
      console.log(resp.data[0].phone);
      setcusPhone(resp.data[0].phone);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getProductsAll = async () => {
    try {
      TimeoutUtility.resetTimeout();
      const resp = await GetProductByStoreID(param.store_id);
      setGetProduct(resp.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  const UpdateStatus = async (id) => {
    // imgg.preventDefault();
    const response = await EditSaleOrderStatus(id);
    if (response.status === 200) {
      if (response.data[0][0].result === 1) {
        alert("Sale Order Closed Successfully");
      } else {
        alert("Order Failed to Close.\nAs Order is not completely Shipped");
      }
    } else {
      alert("Failed to Update Sale Order Status");
    }
  };

  const handleSaleOrderClick = async (e) => {
    TimeoutUtility.resetTimeout();
    if (CardList.length === 0) {
      alert("Sale Order Cart is Empty!");
      return;
    }

    const updatedFormData = { ...formData };
    updatedFormData.est_sale = "E";
    updatedFormData.customer_id = customer_ids;
    updatedFormData.total = grandtotal;
    updatedFormData.amount_pending = grandtotal;
    updatedFormData.amount_paid = 0.0;
    updatedFormData.so_note = note;
    updatedFormData.total_price = grandtotal;
    updatedFormData.tax = tax;
    updatedFormData.discount = totaldiscount;
    updatedFormData.project_name = projectname;
    updatedFormData.store_id = param.store_id;
    updatedFormData.shipment = projectname2;

    updatedFormData.sale_products = [];

    CardList.forEach((product, index) => {
      const saleProduct = {
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.unit_price,
        discount: product.discount,
        item_note: "",
      };
      updatedFormData.sale_products.push(saleProduct);
    });

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    const response = await AddEstimationApi(updatedFormData);
    if (response.status === 200) {
      alert("Estimation Created Successfully");
    } else {
      alert("Estimation Failed to Add");
      return;
    }
    window.location.reload();
  };

  const handleNewClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Add new");
      const baseUrl = "http://localhost:3000";
      const path = `/sales/addEstimation/${param.store_id}`;
      const url = `${baseUrl}${path}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusClick = async (event) => {
    event.preventDefault();
    if (CardList.length === 0) {
      alert("Sale Order Cart is Empty");
      return;
    }
    var f = 0;
    CardList.forEach((element) => {
      if (parseInt(element.quantity) <= parseInt(element.shipment)) {
      } else {
        f = 0;
        alert("Order cannot be Closed.\nQuantity is not completely Shipped");
        return;
      }
      f = 1;
    });

    if (f === 1) {
      if (OrderStatus === "MARK AS OPEN") {
        setOrderStatus("MARK AS CLOSE");
        setorderstatuslable("OPEN");
      } else {
        setOrderStatus("MARK AS OPEN");
        setorderstatuslable("CLOSE");
      }
    }
  };

  const handleClearClick = async (event) => {
    TimeoutUtility.resetTimeout();
    setcartList([]);
    setshipmethod("");
    settrackingno("");
    setprojectname1("");
    setprojectname2(0);
    setprojectname("");
    settax(0);
    setProductOptions([]);
    setnote("");
    setSelectedProduct("");
    setSelectedCustomer("");
  };

  const handleBackClick = async (event) => {
    TimeoutUtility.resetTimeout();
    console.log(CardList);
    window.close();
  };

  const CalculateAllFields = () => {
    let total_amt = 0,
      total_itm = 0;
    let total_dis = 0;
    let grandTotal = 0.0;
    let taxx = 0,
      dd = 0;

    if (tax) {
      taxx = parseFloat(tax);
    }
    if (projectname2) {
      dd = parseFloat(projectname2);
    }

    for (let i = 0; i < CardList.length; i++) {
      let a = 0,
        b = 0,
        c = 0;
      if (CardList[i].total) {
        a = parseFloat(CardList[i].total);
      }
      if (CardList[i].discount) {
        b = parseFloat(CardList[i].discount);
      }
      if (CardList[i].quantity) {
        c = parseFloat(CardList[i].quantity);
      }
      total_amt = total_amt + a;
      total_dis = total_dis + b;
      total_itm = total_itm + c;

      // grandTotal = ((parseFloat(CardList[i].unit_price) - parseFloat(CardList[i].discount)) * parseFloat(CardList[i].quantity));
    }
    settotaldiscount(total_dis);
    settotalAmount(total_amt);
    settotalitem(total_itm);

    grandTotal = total_amt - total_dis + taxx + dd;

    setgrandtotal(grandTotal);
  };

  const handleQuantityChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].quantity = value;
    newCartList[index].total =
      value * parseFloat(newCartList[index].unit_price);
    setcartList(newCartList);
    setActiveInput("quantity");
    setindex1(index);
  };

  const handleShipmentChange = (index, value) => {
    const newCartList = [...CardList];
    if (value > newCartList[index].quantity) {
      if (
        window.confirm(
          `Ship qty greater than total qty.\nStill want to continue?`
        )
      ) {
        newCartList[index].shipment = value;
        setcartList(newCartList);
        setActiveInput("shipment");
        setindex1(index);
      }
    } else {
      newCartList[index].shipment = value;
      setcartList(newCartList);
      setActiveInput("shipment");
      setindex1(index);
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    // handleStatusClick();
  }, [OrderStatus]);

  const handleDiscountChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].discount = value;
    // newCartList[index].total =
    //   (newCartList[index].quantity * newCartList[index].unit_price) - value;
    setcartList(newCartList);
    setActiveInput("discount");
    setindex1(index);
  };

  const handleChangeTax = (e) => {
    setActiveInput("tax");
    settax(e.target.value);
    setindex1(-2);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleDeleteClick = (index) => {
    TimeoutUtility.resetTimeout();
    const removedProduct = CardList[index];

    setProductOptions((prevOptions) => [
      ...prevOptions,
      {
        label: `${removedProduct.code} ${removedProduct.name}`,
        value: removedProduct.product_id,
      },
    ]);
    const newCartList = [...CardList];
    newCartList.splice(index, 1);
    setcartList(newCartList);
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllCustomersName()
        .then((resp) => {
          setGetCustomer(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        label: `${item.code} ${item.productname}`,
        value: item.product_id,
      }));
      setProductOptions(fetchedProductOptions);
    };
    fetchProductOptions();
  }, [GetProduct, customer_ids]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchCustomerOptions = async () => {
      const fetchedCustomerOption = GetCustomer.map((item) => ({
        label: `${item.name}`,
        value: item.customer_id,
      }));
      setCustomerOptions(fetchedCustomerOption);
      setcartList([]);
    };
    fetchCustomerOptions();
  }, [GetCustomer]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    CalculateAllFields();
  }, [CardList, tax, projectname2]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      // fontWeight:"bold",
      fontSize: "16px", // Adjust the font size as needed
    }),
    option: (provided) => ({
      ...provided,
      //fontWeight:"bold",
      fontSize: "16px", // Adjust the font size as needed
    }),
  };

  return (
    <div className="user-body">
      <div style={{ paddingLeft: "276px" }}>
        <Header title="CREATE ESTIMATION" />
      </div>

      <div className="container_sale">
        <div class="article-container-sale">
          <div className="flex justify-center">
            <div class="article-sale">
              <div className="card-sale">
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      font: "100px",
                      fontSize: "20px",
                    }}
                    htmlFor="ProductSelect"
                  >
                    Customer:{" "}
                  </label>
                  <Select
                    className="css-13cymwt-control-sale"
                    id="customer"
                    value={selectedCustomer}
                    onChange={handleChangeCustomer}
                    options={CustomerOptions}
                    isSearchable
                    placeholder="Select Customer"
                    isClearable={true}
                  />
                  <br />
                  <label
                    htmlFor="ProductSelect"
                    style={{
                      fontWeight: "bold",
                      font: "100px",
                      fontSize: "18px",
                      marginTop: "6px",
                    }}
                  >
                    Product:{" "}
                  </label>
                  <div class="article-container-select">
                    <Select
                      className="css-13cymwt-control2"
                      id="product"
                      value={selectedProduct}
                      onChange={handleChangeProduct}
                      options={productOptions}
                      isSearchable
                      placeholder="Search Product With Name / Code"
                      isClearable
                      styles={customStyles}
                      onKeyDown={(event) =>
                        handleChangeProduct1(selectedProduct, event)
                      }
                    />

                    <button
                      // className="article-container1"
                      style={{
                        padding: "10px",
                        backgroundColor: "#03C9D7",
                        color: "#fff",
                        borderRadius: "11px",
                        marginLeft: "10px",
                        height: "42px",
                      }}
                      type="button"
                      onClick={handleAddcartClick}
                    >
                      ➕
                    </button>
                  </div>
                </div>

                <br />
                <div>
                  <div className="table-container-sale4">
                    {/* <Card > */}
                    <table className="table table-striped table-bordered">
                      <thead
                        className="thead-dark"
                        style={{
                          color: "#03C9D7",
                          textAlign: "center",
                          verticalAlign: "middle",
                          fontWeight: "bold",
                          fontSize: 14,
                          // borderSpacing: "10px",
                        }}
                      >
                        <tr
                          className="table-sale-tr"
                          style={{
                            Header: "70%",
                            color: "white",
                            backgroundColor: "#03c9d7",
                            height: "60px",
                            fontSize: "16px",
                            textAlign: "center",
                          }}
                        >
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            CODE
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            PRODUCT
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "110px",
                            }}
                          >
                            UNIT PRICE
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "110px",
                            }}
                          >
                            QTY
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            DISCOUNT
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "100px",
                            }}
                          >
                            TOTAL
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              width: "70px",
                            }}
                          >
                            DEL
                          </td>
                        </tr>
                      </thead>
                      <tbody
                        style={{
                          verticalAlign: "middle",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {CardList?.map((item, index) => (
                          <tr key={index} style={{}}>
                            <td style={{ textAlign: "center" }}>{item.code}</td>
                            <td style={{ textAlign: "center" }}>{item.name}</td>
                            <td style={{ textAlign: "center" }}>
                              {formatCurrency(item.unit_price)}
                            </td>
                            <td>
                              <div className="centered-input">
                                <input
                                  className="input"
                                  id="quantity"
                                  type="number"
                                  step="1.00"
                                  min="0"
                                  style={{
                                    textAlign: "center",
                                  }}
                                  value={item.quantity}
                                  onClick={() =>
                                    handleInputClick("quantity", index)
                                  }
                                  onChange={(e) =>
                                    handleQuantityChange(index, e.target.value)
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <div className="centered-input">
                                <input
                                  className="input"
                                  id="discount"
                                  min="0"
                                  type="number"
                                  step="0.01"
                                  value={item.discount}
                                  style={{
                                    textAlign: "center",
                                  }}
                                  onClick={() =>
                                    handleInputClick("discount", index)
                                  }
                                  onChange={(e) =>
                                    handleDiscountChange(index, e.target.value)
                                  }
                                />
                              </div>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                // backgroundColor: "#afeeee",
                                // fontWeight:"bold"
                              }}
                            >
                              {formatCurrency(item.total)}
                            </td>

                            <td>
                              <button
                                style={{
                                  textAlign: "left",
                                  marginLeft: "14px",
                                }}
                                type="button"
                                onClick={() => handleDeleteClick(index)}
                              >
                                ❌
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* </Card> */}
                  </div>

                  <div className="table-container-sale1">
                    {/* <Card > */}
                    <table className="table table-bordered">
                      <tbody>
                        <tr
                          style={{
                            width: "20px",
                          }}
                        >
                          <td
                            style={{
                              width: "140px",
                              textAlign: "right",
                              fontWeight: "bold",
                            }}
                          >
                            SUB TOTAL:
                          </td>
                          <td
                            colSpan="2"
                            style={{
                              fontSize: "20px",
                              color: "#03C9D7",
                              textAlign: "left",
                              fontWeight: "Bold",
                            }}
                          >
                            {formatCurrency(total_amount)}
                          </td>
                        </tr>
                        <tr
                          style={{
                            width: "20px",
                          }}
                        >
                          <td
                            style={{ textAlign: "right", fontWeight: "bold" }}
                          >
                            DISCOUNT:
                          </td>
                          <td
                            style={{
                              fontSize: "20px",
                              color: "#03C9D7",
                              textAlign: "left",
                              fontWeight: "Bold",
                            }}
                          >
                            {formatCurrency(totaldiscount)}
                          </td>
                          <td
                            rowSpan="4"
                            style={{
                              backgroundColor: "#03C9D7",
                              textAlign: "center",
                              fontWeight: "bold",
                              width: "60px !important",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "20px",
                                color: "black",
                                width: "60px !important",
                              }}
                            >
                              GRAND TOTAL:
                              <bar />
                              <div
                                style={{
                                  fontSize: "60px",
                                  color: "white",
                                  wordWrap: "break-word",
                                  width: "60px !important",
                                }}
                              >
                                {formatCurrency(grandtotal)}
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr
                          style={{
                            width: "100px",
                          }}
                        >
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            TAX:
                          </td>
                          <td>
                            <label
                              style={{ fontWeight: "bold", color: "#03C9D7" }}
                            >
                              {"$"}
                            </label>
                            <input
                              id="tax"
                              type="number"
                              step="1"
                              min="0"
                              max="100"
                              className="input"
                              defaultValue={0.0}
                              value={tax}
                              onClick={() => handleInputClick("tax", -2)}
                              onChange={handleChangeTax}
                              style={{
                                textAlign: "left",
                                width: "90px",
                                height: "27px",
                                fontSize: "20px",
                                color: "#03C9D7",
                                fontWeight: "Bold",
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            SHIPMENT:
                          </td>

                          <td style={{ fontWeight: "bold", color: "#03C9D7" }}>
                            <label
                              style={{ fontWeight: "bold", color: "#03C9D7" }}
                            >
                              {"$"}
                            </label>
                            <input
                              defaultValue={0.0}
                              type="number"
                              name="shipment"
                              min="0"
                              step="1.00"
                              value={projectname2}
                              onChange={handleChangeProjectName2}
                              onClick={() => handleInputClick("shipment1", -3)}
                              className="input"
                              style={{
                                textAlign: "left",
                                width: "90px",
                                height: "27px",
                                fontSize: "20px",
                                color: "#03C9D7",
                                fontWeight: "Bold",
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            TOTAL ITEMS:
                          </td>
                          <td
                            style={{
                              fontSize: "20px",
                              color: "#03C9D7",
                              textAlign: "left",
                              fontWeight: "Bold",
                            }}
                          >
                            {total_item || 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* </Card> */}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="article-sale1"
              style={{
                justifyContent: "center",
              }}
            >
              <div class="card-sale3">
                <div class="article-container-sale1">
                  <Card
                    className="keypad-button2"
                    style={{
                      width: "226px",
                      height: "120px",
                      background: "#03C9D7",
                      marginTop: "6px",
                    }}
                    onClick={handleSaleOrderClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      SAVE
                    </div>
                  </Card>
                  <Card
                    className="keypad-button2"
                    style={{
                      width: "226px",
                      height: "120px",
                      background: "#03C9D7",
                      marginTop: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      PRINT
                    </div>
                  </Card>
                </div>
                <div class="article-container-sale1">
                  <Card
                    className="keypad-button"
                    style={{
                      width: "226px",
                      height: "120px",
                      background: "#03C9D7",
                    }}
                    onClick={handleNewClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      NEW
                    </div>
                  </Card>
                  <Card
                    className="keypad-button"
                    style={{
                      width: "226px",
                      height: "120px",
                      background: "#03C9D7",
                    }}
                    onClick={handleClearClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      CLEAR
                    </div>
                  </Card>
                </div>

                <div class="article-container-sale1">
                  <Card
                    className="keypad-button"
                    style={{
                      width: "226px",
                      height: "120px",
                      background: "transparent",
                    }}
                    // onClick={handleStatusClick}
                  >
                    {/* {OrderStatus} */}
                  </Card>
                  <Card
                    className="keypad-button"
                    style={{
                      width: "226px",
                      height: "120px",
                      background: "#03C9D7",
                    }}
                    onClick={handleBackClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      CANCEL
                    </div>
                  </Card>
                </div>
                <div>
                  <div class="article-sale1">
                    <div class="article-container-sale1">
                      <tbody>
                        <tr>
                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                                paddingRight: "24px",
                              }}
                            >
                              Project Name:
                            </label>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="project name"
                              value={projectname}
                              onChange={handleChangeProjectName}
                              placeholder="Project Name"
                              className="input"
                              style={{
                                width: "300px",
                              }}
                            />
                          </td>
                          {/* <td>
                            <input
                              defaultValue={0.0}
                              type="number"
                              name="shipment"
                              min="0"
                              step="1.00"
                              value={projectname2}
                              onChange={handleChangeProjectName2}
                              onClick={() => handleInputClick("shipment1", -3)}
                              placeholder="Shipment"
                              className="input"
                              style={{
                                width: "220px",
                              }}
                            />
                          </td> */}
                        </tr>
                      </tbody>
                    </div>
                  </div>

                  <div className="article-container-sale1">
                    <div>
                      <textarea
                        placeholder="Estimation Note: "
                        id="noteTextarea"
                        value={note}
                        onChange={handleChangeNote}
                        rows="4"
                        style={{
                          // display: "flex",
                          width: "445px",
                          height: "120px",
                          margin: "10px",
                          marginBottom: "10px",
                          // marginTop: "3px",
                        }}
                        className="textarea"
                      />
                    </div>
                  </div>
                </div>
                <div className="article-container-sale1">
                  <div className="keypad-grid1">
                    {keypadButtons.map((number) => (
                      <Card
                        style={{
                          fontWeight: "Bold",
                          border: "2px solid #03C9D7",
                          margin: "2px",
                        }}
                        className="keypad-button1"
                        key={number}
                        onClick={() => handleKeypadClick(number)}
                      >
                        {number}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Button
            margin="10px"
            padding="20px"
            color="white"
            className="custom-button ml-2"
            bgColor={currentColor}
            text="Complete"
            borderRadius="10px"
            onClick={handleSaleOrderClick}
          />
          <Button
            margin="10px"
            padding="20px"
            color="white"
            className="custom-button ml-2"
            bgColor={currentColor}
            text="Close Tab"
            borderRadius="10px"
            onClick={handleBackClick}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default AddEstimation;
