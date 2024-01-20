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
import Dropdown from "react-bootstrap/Dropdown";
import { GetAllProductsInv } from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Inventory = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllInventory, setAllInventory] = useState("");
  const [p_id, setp_id] = useState("");

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage1 = (props) => <div>{"PORD" + props.product_id}</div>;

  const handleEdit = (productId) => {
    navigate("/inventory/edit");
    console.log(`Edit action for Product ID ${productId}`);
  };

  const handleView = (productId) => {
    console.log(`View action for Product ID ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete action for Product ID ${productId}`);
  };

  const InventoryGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },

    {
      field: "product_id",
      headerText: "Product ID",
      template: customerGridImage1,
      width: "80",
      textAlign: "Center",
    },
    { field: "code", headerText: "Code", width: "100", textAlign: "Center" },

    {
      field: "name",
      headerText: "Product Name",
      width: "100",
      textAlign: "Center",
    },

    {
      field: "unit_instock",
      headerText: "Stock Qty",
      width: "80",
      textAlign: "Center",
    },

    { field: "unit", headerText: "Unit", width: "60", textAlign: "Center" },

    {
      field: "opening_balance",
      // template: customerGridImage1,
      headerText: "Opening Balance",
      width: "80",
      textAlign: "Center",
    },

    // {
    //   field: 'Actions',
    //   headerText: 'Actions',
    //   width: '120',
    //   textAlign: 'Center',
    //   template: gridActionsTemplate,
    // },
  ];

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setp_id(selectedRowData.product_id);
    console.log(selectedRowData.product_id);
    // console.log('Selected Product Code:', productcode);
  };

  const handleAddInvClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/inventory/add");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInStockInvClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/inventory/instock");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOutStockInvClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/inventory/outstock");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProdDetailClick = async (event) => {
    event.preventDefault();
    try {
      console.log("View Inventory");
      if (p_id != "") {
        navigate(`/inventory/ViewInventory/${p_id}`);
      } else {
        alert("Please select product to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProdsClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Products");
      navigate(`/inventory/product`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const resp = GetAllProductsInv();
    resp
      .then(function (result) {
        setAllInventory(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="INVENTORY" />
      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Opening Balance"
          borderRadius="10px"
          onClick={handleAddInvClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="In-Stock"
          borderRadius="10px"
          onClick={handleInStockInvClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Out-Stock"
          borderRadius="10px"
          onClick={handleOutStockInvClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Inventory"
          borderRadius="10px"
          onClick={handleProdDetailClick}
        />
        {/* <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Products"
          borderRadius="10px"
          onClick={handleProdsClick}
        /> */}
      </div>
      <GridComponent
        dataSource={AllInventory}
        allowPaging={true}
        pageSettings={{ pageSize: 25 }}
        allowSorting
        allowTextWrap={true}
        toolbar={["Search"]}
        width="auto"
        height={680}
        className="custom-grid"
        rowSelected={handleRowSelected}
      >
        <ColumnsDirective>
          {InventoryGrid &&
            InventoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default Inventory;
