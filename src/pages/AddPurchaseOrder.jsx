import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  GetAllVendorsName,
  GetProductsByStoreVendorId,
  GetProductByIdSale,
  GetSaleCustomerById,
  AddPurchaseOrderApi,
  GetProductByStoreID,
  EditPurchaseStatusBYPo_id,
} from "../api/Api";
import { SuppliersData } from "../data/dummy";
import { Header, Button } from "../components";
import Select from "react-select";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import default_img from "../data/default_img.jpg";
import "../styles/sale.css";
import { Card } from "react-bootstrap";

const AddPurchaseOrder = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetSupplier, setGetSupplier] = useState([]);
  const [Supplier, setSupplier] = useState("");
  const [SupplierOptions, setSupplierOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [p_code, setp_code] = useState("");
  const [Supplier_ids, setSupplier_ids] = useState("");
  const [CardList, setcartList] = useState([]);
  const [total_amount, settotalAmount] = useState(0);
  const [tax, settax] = useState(0);
  const [totaldiscount, settotaldiscount] = useState(0.0);
  const [total_item, settotalitem] = useState(0);
  const [index1, setindex1] = useState("");
  const [grandtotal, setgrandtotal] = useState(0);
  const [note, setnote] = useState("");
  const [SupplierDetail, setSupplierDetail] = useState([]);
  const [cusPhone, setcusPhone] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [OrderStatus, setOrderStatus] = useState("MARK AS CLOSE");
  const [orderstatuslable, setorderstatuslable] = useState("OPEN");
  const [shipmethod, setshipmethod] = useState("");
  const [ValError, setValError] = useState([]);
  const [Invoice_No, setInvoice_No] = useState("");

  let param = useParams();

  const [formData, setFormData] = useState({
    vendor_id: "",
    vendor_invoice_no: "",
    user_id: 0,
    store_id: 0,
    ship_method: "",
    tracking_no: "",
    total: 0,
    amount_paid: 0,
    amount_pending: 0,
    status_id: 0,
    po_note: "",
    t_type_id: 0,
    purchase_products: [],
    receive_logs: [],
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
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handlereceiveChange = (index, value) => {
    const newCartList = [...CardList];
    if (value > newCartList[index].quantity) {
      if (
        window.confirm(
          `Receive qty greater than total qty.\nStill want to continue?`
        )
      ) {
        newCartList[index].receive = value;
        setcartList(newCartList);
        setActiveInput("receive");
        setindex1(index);
      }
    } else if (
      value < newCartList[index].quantity &&
      orderstatuslable === "CLOSE"
    ) {
      if (window.confirm(`Order is already Closed.\nStill want to continue?`)) {
        newCartList[index].receive = value;
        setcartList(newCartList);
        setActiveInput("receive");
        setindex1(index);
      }
    } else {
      newCartList[index].receive = value;
      setcartList(newCartList);
      setActiveInput("receive");
      setindex1(index);
    }
  };

  const handlereceiveClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleInputClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleChangeActive = (index) => {
    const newCartList = [...CardList];
    newCartList[index].receive = newCartList[index].receive === 0 ? 1 : 0;
    setcartList(newCartList);
  };

  const handleKeypadClick = (value) => {
    if (activeInput !== null) {
      const newCartList = [...CardList];
      const indexToUpdate = index1;

      if (
        activeInput === "quantity" ||
        activeInput === "discount" ||
        activeInput === "receive"
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
      }
    }
  };

  const handleAddcartClick = () => {
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
            receive: 0,
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

  const handleChangeSupplier = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedSupplier(selectedOption);
      console.log(selectedOption);
      setActiveInput("Supplier");
      setSupplier(selectedOption);
      setSupplier_ids(selectedOption.value);
      getSupplierDetail(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        getProductsAll(selectedOption.value);
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
  const handleChangeTrackingNo = (e) => {
    settrackingno(e.target.value);
  };
  const handleChangeShipMethod = (e) => {
    setshipmethod(e.target.value);
  };
  const handleChangeInvNo = (e) => {
    setInvoice_No(e.target.value);
  };

  const getSupplierDetail = async (id) => {
    // try {
    //   const resp = await GetcustomeById(id);
    //   setSupplierDetail(resp.data || []);
    //   console.log(resp.data[0].phone);
    //   setcusPhone(resp.data[0].phone);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  const getProductsAll = async (v) => {
    try {
      const resp = await GetProductsByStoreVendorId(param.store_id, v);
      setGetProduct(resp.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  const UpdateStatus = async (id) => {
    // imgg.preventDefault();
    const response = await EditPurchaseStatusBYPo_id(id, 72);
    if (response.status === 200) {
      // if (response.data[0][0].result === 1) {
      alert("Purchase Order Status Closed Successfully");
      //   }
      // if (orderstatuslable === "CLOSE") {
      //   }
      //   else {
      //     alert("Order Failed to Close.\nAs Order is not completely Shipped");
      //   }
    } else {
      alert("Failed to Update Purchase Order Status");
      return;
    }
  };

  const handleSaleOrderClick = async (e) => {
    if (CardList.length === 0) {
      alert("Purchase Order Cart is Empty!");
      return;
    }

    const updatedFormData = { ...formData };
    updatedFormData.vendor_id = Supplier_ids;
    updatedFormData.vendor_invoice_no = Invoice_No;
    updatedFormData.user_id = 102;
    updatedFormData.store_id = param.store_id;
    updatedFormData.ship_method = shipmethod;
    updatedFormData.tracking_no = trackingno;
    updatedFormData.total = grandtotal;
    updatedFormData.amount_paid = 0.0;
    updatedFormData.amount_pending = grandtotal;
    updatedFormData.status_id = 73;
    updatedFormData.po_note = note;
    updatedFormData.t_type_id = 705;
    updatedFormData.purchase_products = [];
    updatedFormData.receive_logs = [];

    CardList.forEach((product, index) => {
      if (product.receive > 0) {
        let a = 73;
        if (parseFloat(product.receive) >= parseFloat(product.quantity)) {
          a = 72;
        }
        const receive = {
          recv_status_id: a,
          quantity: product.quantity,
          product_id: product.product_id,
          recv_by: projectname,
          quantity_recv: product.receive,
          quantity_reject: 0,
          // mfg_date: '',
          recv_note: "",
        };
        updatedFormData.receive_logs.push(receive);
      }
      const purchaseProduct = {
        product_id: product.product_id,
        quantity: product.quantity,
        unit_price: product.unit_price,
        discount: product.discount,
        // exp_rec_date : '',
        item_note: "",
      };
      updatedFormData.purchase_products.push(purchaseProduct);
    });

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    const response = await AddPurchaseOrderApi(updatedFormData);
    if (response.status === 200) {
      if (OrderStatus === "MARK AS OPEN") {
        console.log(response.data[0][0].po_id);
        if (response.data[0][0].po_id) {
          console.log(response.data[0][0].po_id);
          UpdateStatus(response.data[0][0].po_id);
        }
      } else {
        // return;
      }
      alert("Purchase Order Added Successfully");
      window.location.reload();
    } else {
      alert("Purchase Order Failed to Add");
      return;
    }
  };

  const handleBackClick = async (event) => {
    console.log(CardList);
    window.close();
  };

  const handleNewClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      const baseUrl = "http://localhost:3000";
      const path = `/Purchase/addPurchaseOrder/${param.store_id}`;
      const url = `${baseUrl}${path}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusClick = async (event) => {
    event.preventDefault();
    if (CardList.length === 0) {
      alert("Purchase Order Cart is Empty");
      return;
    }
    if (orderstatuslable === "CLOSE") {
      if (window.confirm(`Order is already Closed?\nStill want to continue?`)) {
        setOrderStatus("MARK AS CLOSE");
        setorderstatuslable("OPEN");
        return;
      } else {
        // return;
      }
    } else {
      if (orderstatuslable === "OPEN") {
        let f = 0;
        CardList.forEach((element) => {
          if (parseInt(element.quantity) > parseInt(element.receive)) {
            f = 1;
          } else {
            setOrderStatus("MARK AS OPEN");
            setorderstatuslable("CLOSE");
            return;
          }
        });
        if (f === 1) {
          if (
            window.confirm(
              `Quantity is not completely Received.\nStill want to Continue?`
            )
          ) {
            setOrderStatus("MARK AS OPEN");
            setorderstatuslable("CLOSE");
            return;
          }
        }
      }
    }
  };

  const handleClearClick = async (event) => {
    setcartList([]);
    setshipmethod("");
    settrackingno("");
    setprojectname("");
    settax(0);
    setProductOptions([]);
    setnote("");
    setSelectedProduct("");
    setSelectedSupplier("");
    setInvoice_No("");
  };

  const CalculateAllFields = () => {
    let total_amt = 0,
      total_itm = 0;
    let total_dis = 0;
    let grandTotal = 0.0;
    let taxx = 0;

    if (tax) {
      taxx = parseFloat(tax);
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

    grandTotal = total_amt - total_dis + taxx;

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

  const handleDiscountChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].discount = value;
    // newCartList[index].total =
    //   newCartList[index].quantity * newCartList[index].unit_price -
    //   newCartList[index].quantity * newCartList[index].unit_price * value;
    setcartList(newCartList);
    setActiveInput("discount");
    setindex1(index);
  };
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleChangeTax = (e) => {
    setActiveInput("tax");
    settax(e.target.value);
    setindex1(-2);
  };

  const handleDeleteClick = (index) => {
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
    async function fetchData() {
      GetAllVendorsName()
        .then((resp) => {
          setGetSupplier(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        label: `${item.code} ${item.productname}`,
        value: item.product_id,
      }));
      setProductOptions(fetchedProductOptions);
    };
    fetchProductOptions();
  }, [GetProduct, Supplier_ids]);

  useEffect(() => {
    const fetchSupplierOptions = async () => {
      const fetchedSupplierOption = GetSupplier.map((item) => ({
        label: `${item.name}`,
        value: item.vendor_id,
      }));
      setSupplierOptions(fetchedSupplierOption);
      setcartList([]);
    };
    fetchSupplierOptions();
  }, [GetSupplier]);

  useEffect(() => {
    CalculateAllFields();
  }, [CardList, tax]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "16px",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "16px",
    }),
  };

  return (
    <div className="user-body">
      <div class="article-sale2">
        <div class="article-container-sale">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingLeft: "260px",
            }}
          >
            CREATE PURCHASE ORDER
          </label>
          {/* <Header  title="CREATE SALE ORDER" /> */}
          {/* <div style={{paddingLeft:"1630px",}}> */}
          <div style={{ paddingLeft: "1610px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: "#03C9D7",
                color: "black",
              }}
            >
              {" "}
              ORDER STATUS: {orderstatuslable}
            </label>
          </div>

          {/* </div> */}
        </div>
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
                    Supplier:{" "}
                  </label>
                  <Select
                    className="css-13cymwt-control1"
                    id="Supplier"
                    value={selectedSupplier}
                    onChange={handleChangeSupplier}
                    options={SupplierOptions}
                    isSearchable
                    placeholder="Select Supplier"
                    isClearable
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
                  <div className="table-container-sale5">
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
                              width: "110px",
                            }}
                          >
                            RCV'D QTY
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
                              <div className="centered-input">
                                <input
                                  className="input"
                                  id="receive"
                                  type="number"
                                  min="0"
                                  step="1.00"
                                  style={{
                                    textAlign: "center",
                                  }}
                                  value={item.receive}
                                  onClick={() =>
                                    handlereceiveClick("receive", index)
                                  }
                                  onChange={(e) =>
                                    handlereceiveChange(index, e.target.value)
                                  }
                                />
                              </div>
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
                        {/* <tr
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
                        </tr> */}
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
                      width: "240px",
                      height: "100px",
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
                      width: "240px",
                      height: "100px",
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
                      width: "240px",
                      height: "100px",
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
                      width: "240px",
                      height: "100px",
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
                      width: "240px",
                      height: "100px",
                      background: "#03C9D7",
                    }}
                    onClick={handleStatusClick}
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
                      {OrderStatus}
                    </div>
                  </Card>
                  <Card
                    className="keypad-button"
                    style={{
                      width: "240px",
                      height: "100px",
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
                              }}
                            >
                              Ship Method:{" "}
                            </label>
                          </td>

                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Tracking No:{" "}
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="shipmethod"
                              placeholder="Ship-Method"
                              value={shipmethod}
                              onChange={handleChangeShipMethod}
                              className="input"
                              style={{
                                width: "240px",
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              name="tracking_no"
                              value={trackingno}
                              onChange={handleChangeTrackingNo}
                              placeholder="Tracking No."
                              className="input"
                              style={{
                                width: "240px",
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Supplier Inv No:{" "}
                            </label>
                          </td>

                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Recv By:
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="Invoice No"
                              value={Invoice_No}
                              onChange={handleChangeInvNo}
                              placeholder="Supplier Invoive No."
                              className="input"
                              style={{
                                width: "240px",
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              name="project name"
                              value={projectname}
                              onChange={handleChangeProjectName}
                              placeholder="Receive By"
                              className="input"
                              style={{
                                width: "240px",
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </div>
                  </div>

                  <div className="article-container-sale1">
                    <div>
                      <textarea
                        placeholder="Purchase Order Note: "
                        id="noteTextarea"
                        value={note}
                        onChange={handleChangeNote}
                        rows="4"
                        style={{
                          display: "flex",
                          width: "480px",
                          height: "100px",
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
export default AddPurchaseOrder;
