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
import { GetAllAccounts, CheckDefaultAcc } from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Account = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [Account_id, setAccount_id] = useState("");
  const [defaultacc, setdefaultacc] = useState(0);
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage2 = (props) => <div>{"A" + props.account_id}</div>;

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.opening_balance)}</div>
  );
  const customerGridImage = (props) => (
    <div>{formatCurrency(props.balance)}</div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50",  },
    {
      headerText: "ID",
      field: "account_id",
      width: "150",
      template: customerGridImage2,
      textAlign: "Center",
    },
    {
      headerText: "Account Name",
      field: "name",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "description",
      headerText: "Description",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "balance",
      headerText: "A/C Balance",
      template: customerGridImage,
      width: "150",
      textAlign: "Center",
    },

    { field: "type", headerText: "Type", width: "150", textAlign: "Center" },

    {
      field: "opening_balance",
      template: customerGridImage1,
      headerText: "Opening Balance",
      width: "150",
      textAlign: "Center",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Add new");
      navigate("/account/addaccount");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("edit new");
      // if (defaultacc === 0) {
      if (Account_id != "") {
        navigate(`/account/editaccount/${Account_id}`);
      } else {
        alert("Please select account to edit.");
      }
      // } else {
      //   alert(`A${Account_id} is Defualt account.\nIt is not editable.`);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("view account");
      if (Account_id != "") {
        navigate(`/account/viewaccount/${Account_id}`);
      } else {
        alert("Please select account to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    TimeoutUtility.resetTimeout();
    const selectedRowData = args.data;
    setAccount_id(selectedRowData.account_id);
    console.log(selectedRowData.account_id);
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const resp = GetAllAccounts();
    resp
      .then(function (result) {
        console.log(result.data);
        setAllAccounts(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const settings = { checkboxMode: "ResetOnRowClick" };

  return (
    <div className="user-body">
      <Header title="GENERAL ACCOUNTS" />
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
          text="Update Account"
          borderRadius="10px"
          onClick={handleEditEmployeesClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Detail "
          borderRadius="10px"
          onClick={handleViewEmployeesClick}
        />
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
        height={700}
        className="custom-grid"
        selectionSettings={settings}
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

export default Account;
