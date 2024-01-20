import React, { useEffect, useState } from "react";
import TimeoutUtility from "../contexts/TimeoutUtility";
import { Link, useNavigate } from "react-router-dom";
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
import { GetAllCustomers } from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/viewCustomer.css";

const Customers = () => {
  const [AllCustomers, setAllCustomers] = useState("");
  const [Customer_id, setCustomer_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      <img
        className="rounded-full w-14 h-14"
        src={`data:image/jpeg;base64,${props.profile}`}
        style={{ maxWidth: "80%" }}
      />
      <div>{/* <p>{props.name}</p> */}</div>
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      width: "50",
      template: customerGridImage,
      textAlign: "Center",
    },
    {
      field: "name",
      headerText: "Name",
      width: "50",

      textAlign: "Center",
    },
    {
      field: "phones",
      headerText: "Phone",
      width: "60",

      textAlign: "Center",
    },
    {
      field: "email",
      headerText: "Email",
      width: "70",

      textAlign: "Center",
    },
    {
      field: "balance",
      headerText: "A/C Balance",
      width: "70",
      format: "C2",
      textAlign: "Center",
    },
    {
      field: "city",
      headerText: "City",
      width: "70",

      textAlign: "Center",
    },
    {
      field: "attention_name",
      headerText: "Attention Name",
      width: "80",
      textAlign: "Center",
    },
    {
      field: "opening_balance",
      headerText: "Opening Balance",
      width: "70",
      format: "C2",
      textAlign: "Center",
    },
  ];

  const handleAddCustomerClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/customer/addCustomer");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditCustomerClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Customer_id != "") {
        navigate(`/customer/editCustomer/${Customer_id}`);
      } else {
        alert("Please select customer to edit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewCustomerClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view store");
      if (Customer_id != "") {
        navigate(`/customer/viewCustomer/${Customer_id}`);
      } else {
        alert("Please select customer to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setCustomer_id(selectedRowData.customer_id);
    console.log(selectedRowData.customer_id);
  };

  useEffect(() => {
    const resp = GetAllCustomers();
    resp
      .then(function (result) {
        setAllCustomers(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="CUSTOMERS" />
      <div>
        <div className="flex justify-end">
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="Add New (+)"
            borderRadius="10px"
            onClick={handleAddCustomerClick}
          />
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="Update Customer"
            borderRadius="10px"
            onClick={handleEditCustomerClick}
          />
          <Button
            margin="7px"
            color="white"
            bgColor={currentColor}
            text="View Detail "
            borderRadius="10px"
            onClick={handleViewCustomerClick}
          />
        </div>
        <GridComponent
          className="custom-grid"
          dataSource={AllCustomers}
          //headerHeight={20}
          allowPaging={true}
          pageSettings={{ pageSize: 25 }}
          allowSorting
          allowTextWrap={true}
          toolbar={["Search"]}
          rowSelected={handleRowSelected}
          height={680}
          //rowHeight={80}
        >
          <ColumnsDirective>
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Customers;
