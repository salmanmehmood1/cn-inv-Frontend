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
import { GetAllPaymentDetail, deletePayment } from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Receipt = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [r_id, setr_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };
  const customerGridImage2 = (props) => <div>{"R" + props.payment_id}</div>;

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
      field: "payment_id",
      template: customerGridImage2,
      width: "150",
      textAlign: "Center",
    },

    {
      field: "datetime",
      headerText: "DateTime",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "From",
      headerText: "From",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "To",
      headerText: "To",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "amount_paid",
      headerText: "Amount",
      format: "C2",
      // template: customerGridImage,
      width: "150",
      textAlign: "Center",
    },
    {
      field: "note",
      headerText: "Note",
      width: "150",
      textAlign: "Center",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/receipt/AddReceipt");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (r_id != "") {
        navigate(`/receipt/EditReceipt/${r_id}`);
      } else {
        alert("Please select receipt to ddit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick1 = async (event) => {
    event.preventDefault();
    try {
      console.log("delete");
      if (r_id != "") {
        if (
          window.confirm(`Are you sure you want to delete R${r_id} receipt?`)
        ) {
          const resp = await deletePayment(r_id);
          if (resp.status === 200) {
            navigate("/receipt");
            alert("Receipt deleted successfully.");
          } else {
            alert("Receipt failed to delete.");
          }
        } else {
        }
      } else {
        alert("Please select receipt to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setr_id(selectedRowData.payment_id);
    console.log(selectedRowData.payment_id);
  };

  useEffect(() => {
    const resp = GetAllPaymentDetail();
    resp
      .then(function (result) {
        console.log(result.data);
        setAllAccounts(result.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const settings = { checkboxMode: "ResetOnRowClick" };

  return (
    <div className="user-body">
      <Header title="RECEIPT" />
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
          text="Update Receipt"
          borderRadius="10px"
          onClick={handleEditEmployeesClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Delete Receipt"
          borderRadius="10px"
          onClick={handleEditEmployeesClick1}
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

export default Receipt;
