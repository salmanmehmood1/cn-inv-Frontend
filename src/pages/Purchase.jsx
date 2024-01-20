import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { GetAllPurchaseByID, GetAllStores } from "../api/Api";
import Select from "react-select";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
// import NumberFormat from 'react-number-format/NumberFormat';
import { useStateContext } from "../contexts/ContextProvider";

const Purchase = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [po_id, setpo_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {/* {props.Status} */}
      {props.status === "Approved" ? (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
          <p1> Close</p1>
          {/* {props.active_product} */}
        </button>
      ) : (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
          <p1>Open</p1>

          {/* {props.active_product} */}
        </button>
      )}
    </div>
  );

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.total)}</div>
  );
  const customerGridImage = (props) => (
    <div>{formatCurrency(props.amount_pending)}</div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    { headerText: "PO#", field: "po", width: "150", textAlign: "Center" },

    {
      field: "order_date",
      headerText: "Order Date",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "vendor",
      headerText: "Vendor",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "vendor_invoice_no",
      headerText: "Vendor Inv No.",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "status",
      headerText: "Status",
      template: ProductGridactiveStatus,
      width: "150",
      textAlign: "Center",
    },

    {
      field: `total`,
      headerText: "Total",
      template: customerGridImage1,
      width: "150",
      textAlign: "Center",
    },
    // {
    //     field: "0",
    //     headerText: "Amount Paid",
    //     template: customerGridImage1,
    //     width: "150",
    //     textAlign: "Center",
    //   },
    {
      field: "amount_pending",
      template: customerGridImage,
      headerText: "Amount Pending",
      width: "150",
      textAlign: "Center",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      const baseUrl = "http://localhost:3000";
      const path = `/Purchase/addPurchaseOrder/${store_id}`;
      const url = `${baseUrl}${path}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (po_id != "") {
        const po_ids = po_id + "_" + store_id;
        const baseUrl = "http://localhost:3000";
        const path = `/Purchase/editPurchaseOrder/${po_ids}`;
        const url = `${baseUrl}${path}`;
        window.open(url, "_blank");
      } else {
        alert("Please! Select Purchase Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (po_id != "") {
        const po_ids = po_id + "_" + store_id;
        navigate(`/Purchase/Receive_Log/${po_ids}`);
      } else {
        alert("Please! Select Purchase Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSaleClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view purchaseorder");
      if (po_id != "") {
        const so_ids = po_id + "_" + store_id;
        navigate(`/Purchase/viewPurchaseOrder/${po_id}`);
      } else {
        alert("Please! Select Purchase Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setpo_id(selectedRowData.po_id);
    console.log(selectedRowData.po_id);
  };

  useEffect(() => {
    GetAllStores()
      .then((resp) => {
        setstores(resp.data || []);
        setstore(resp.data[0].name);
        setstore_id(resp.data[0].store_id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    console.log(store_id);
    GetAllPurchaseByID(store_id)
      .then((result) => {
        setAllAccounts(result.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [store, store_id]);

  return (
    <div className="user-body">
      <Header title="PURCHASE ORDERS" />
      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Add New (+)"
          borderRadius="10px"
          onClick={handleAddEmployeesClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Edit Purchase Order"
          borderRadius="10px"
          onClick={handleEditEmployeesClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Detail "
          borderRadius="10px"
          onClick={handleViewSaleClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Receive Log"
          borderRadius="10px"
          onClick={handleViewEmployeesClick}
        />

        {/* <label htmlFor="BrandSelect">Brand: </label> */}
        <br />

        {/* <select
          style={{
            width: "8%",
            borderWidth: "2px",
            borderStyle: "solid",
            fontSize: "18px",
            padding: "8px",
            margin: "7px",
          }}
        >
          <option value="1">Purchase Order</option>
          <option value="2">Estimation</option>
        </select> */}

        <select
          // id="BrandSelect"
          style={{
            width: "11%",
            borderWidth: "2px",
            borderStyle: "solid",
            fontSize: "18px",
            padding: "8px",
            margin: "7px",
          }}
          value={store}
          onChange={handleChangeStore}
        >
          {/* <option value=""> Select Store </option> */}

          {getstores.map((item) => (
            <option key={item.store_id}>{item.name}</option>
          ))}
        </select>
      </div>

      <GridComponent
        dataSource={AllAccounts}
        allowPaging={true}
        pageSettings={{ pageSize: 25 }}
        allowSorting
        allowTextWrap={true}
        toolbar={["Search"]}
        width="auto"
        rowSelected={handleRowSelected}
        height={680}
        className="custom-grid"
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Purchase;
