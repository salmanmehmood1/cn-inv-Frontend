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
import {
  GetAllPaymentDetail,
  deleteJournalById,
  getAllJournals,
} from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Journal = () => {
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

  const customerGridImage2 = (props) => <div>{"J" + props.journal_id}</div>;

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.opening_balance)}</div>
  );
  const customerGridImage = (props) => (
    <div>{formatCurrency(props.balance)}</div>
  );

  const customersGrid = [
    {
      headerText: "ID",
      field: "journal_id",
      template: customerGridImage2,
      width: "80",
      textAlign: "Center",
    },

    {
      field: "datetime",
      headerText: "DateTime",
      width: "130",
      textAlign: "Center",
    },

    {
      field: "account",
      headerText: "Account",
      width: "100",
      textAlign: "Center",
    },

    {
      field: "amount",
      headerText: "Amount",
      format: "C2",
      width: "80",
      textAlign: "Center",
    },
    {
      field: "notes",
      headerText: "Note",
      width: "200",
      textAlign: "Center",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Journal/AddJournal");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (r_id != "") {
        navigate(`/Journal/EditJournal/${r_id}`);
      } else {
        alert("Please select journal to edit.");
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
          window.confirm(`Are you sure you want to delete J${r_id} journal?`)
        ) {
          const resp = await deleteJournalById(r_id);
          if (resp.status === 200) {
            navigate("/journal");
            alert("Journal deleted successfully.");
          } else {
            alert("Journal failed to delete.");
          }
        } else {
        }
      } else {
        alert("Please select journal to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setr_id(selectedRowData.journal_id);
    console.log(selectedRowData.journal_id);
  };

  useEffect(() => {
    const resp = getAllJournals();
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
      <Header title="JOURNAL" />
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
          text="Update Journal"
          borderRadius="10px"
          onClick={handleEditEmployeesClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Delete Journal"
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

export default Journal;
