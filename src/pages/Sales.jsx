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
import { GetAllSalesByID, GetAllStores } from "../api/Api";
import Select from "react-select";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
// import NumberFormat from 'react-number-format/NumberFormat';
import { useStateContext } from "../contexts/ContextProvider";

const Sales = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [so_id, setso_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [est_sale, setest_sale] = useState("S");

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
      {props.status}
      {props.Status === "Shipped" ? (
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
    { headerText: "E-S#", field: "Q-S #", width: "150", textAlign: "Center" },

    {
      field: "Quote Date",
      headerText: "Estimate Date",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "Customer",
      headerText: "Customer",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "Customer PO",
      headerText: "Customer PO",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "Status",
      headerText: "Status",
      template: ProductGridactiveStatus,
      width: "150",
      textAlign: "Center",
    },

    {
      field: "Sale Date",
      headerText: "Sale Date",
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
      if (est_sale === "E") {
        const path = `/sales/addEstimation/${store_id}`;
        const url = `${baseUrl}${path}`;
        window.open(url, "_blank");
      } else {
        const path = `/sales/addSaleOrder/${store_id}`;
        const url = `${baseUrl}${path}`;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        const baseUrl = "http://localhost:3000";
        if (est_sale === "E") {
          const path = `/sales/editEstimation/${so_ids}`;
          const url = `${baseUrl}${path}`;
          window.open(url, "_blank");
        } else {
          const path = `/sales/editSaleOrder/${so_ids}`;
          const url = `${baseUrl}${path}`;
          window.open(url, "_blank");
        }
      } else {
        alert("Please! Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleest_saleChange = (event) => {
    setest_sale(event.target.value);
    console.log(event.target.value);

    const Sale_Est = {
      saleEst: event.target.value,
    };
    localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        navigate(`/sales/Shipment/${so_ids}`);
      } else {
        alert("Please! Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick1 = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        const baseUrl = "http://localhost:3000";
        if (est_sale === "E") {
          const path = `/sales/ConvertEstimate/${so_ids}`;
          const url = `${baseUrl}${path}`;
          window.open(url, "_blank");
        }
      } else {
        alert("Please! Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSaleClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        if (est_sale === "E") {
          navigate(`/sales/viewEstimation/${so_id}`);
        } else {
          navigate(`/sales/viewSaleOrder/${so_id}`);
        }
      } else {
        alert("Please! Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const Sale_Store = {
      SaleStore: e.target.value,
    };
    localStorage.setItem("Sale_Store", JSON.stringify(Sale_Store));
    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setso_id(selectedRowData.so_id);
    console.log(selectedRowData.so_id);
  };

  useEffect(() => {
    async function fetchData() {
      await GetAllStores()
        .then((resp) => {
          setstores(resp.data || []);
          setstore(resp.data[0].name);
          setstore_id(resp.data[0].store_id);
        })
        .catch((err) => {
          console.log(err.message);
        });
      if (!JSON.parse(localStorage.getItem("Sale_Est"))) {
        const Sale_Est = {
          saleEst: "S",
        };
        localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
      }
      if (!JSON.parse(localStorage.getItem("Sale_Store"))) {
        const Sale_Store = {
          SaleStore: "",
        };
        localStorage.setItem("Sale_Store", JSON.stringify(Sale_Store));
      }
      const Sale_Est = JSON.parse(localStorage.getItem("Sale_Est"));
      const Sale_Store = JSON.parse(localStorage.getItem("Sale_Store"));
      setest_sale(Sale_Est["saleEst"]);
      console.log(Sale_Store["SaleStore"]);

      setstore(Sale_Store["SaleStore"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(store_id);
    GetAllSalesByID(store_id, est_sale)
      .then((result) => {
        setAllAccounts(result.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [store, store_id, est_sale]);

  return (
    <div className="user-body">
      <Header title="SALE ORDERS" />
      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Add New (+)"
          borderRadius="10px"
          onClick={handleAddEmployeesClick}
        />

        {est_sale === "S" && (
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="Edit Sale Order"
            borderRadius="10px"
            onClick={handleEditEmployeesClick}
          />
        )}

        {est_sale === "E" && (
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="Edit Estimate"
            borderRadius="10px"
            onClick={handleEditEmployeesClick}
          />
        )}
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Detail "
          borderRadius="10px"
          onClick={handleViewSaleClick}
        />
        {est_sale === "S" && (
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="Shipment"
            borderRadius="10px"
            onClick={handleViewEmployeesClick}
          />
        )}

        {est_sale === "E" && (
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="Convert Estimate"
            borderRadius="10px"
            onClick={handleViewEmployeesClick1}
          />
        )}

        {/* <label htmlFor="BrandSelect">Brand: </label> */}
        <br />

        <select
          style={{
            width: "8%",
            borderWidth: "2px",
            borderStyle: "solid",
            fontSize: "18px",
            padding: "8px",
            margin: "7px",
          }}
          value={est_sale}
          onChange={handleest_saleChange}
        >
          <option value="S">Sale Orders</option>
          <option value="E">Estimations</option>
        </select>

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

export default Sales;
