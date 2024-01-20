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
import { GetAllEmployees } from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Employee = () => {
  const [AllEmployees, setAllEmployees] = useState("");
  const [Employee_id, setEmployee_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.salary)}</div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "Name",
      field: "name",
      width: "70",
      textAlign: "Center",
    },
    { field: "email", headerText: "Email", width: "70", textAlign: "Center" },
    {
      field: "contact",
      headerText: "Contact",
      width: "70",
      textAlign: "Center",
    },
    {
      field: "salary",
      headerText: "Salary",
      template: customerGridImage1,
      width: "60",
      textAlign: "Center",
    },
    {
      field: "Manager",
      headerText: "Manager",
      width: "70",
      textAlign: "Center",
    },
    {
      field: "store",
      headerText: "Store",
      width: "70",
      textAlign: "Center",
    },
    {
      field: "city",
      headerText: "City",
      width: "70",
      textAlign: "Center",
    },
    {
      field: "balance",
      headerText: "Opening Balance",
      format: "C2",
      width: "80",
      textAlign: "Center",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/employee/addEmployee");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Employee_id != "") {
        navigate(`/employee/editEmployee/${Employee_id}`);
      } else {
        alert("Please select employee to edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view employee");
      if (Employee_id != "") {
        navigate(`/employee/viewemployee/${Employee_id}`);
      } else {
        alert("Please select employee to view");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setEmployee_id(selectedRowData.employee_id);
    console.log(selectedRowData.employee_id);
  };

  useEffect(() => {
    const resp = GetAllEmployees();
    resp
      .then(function (result) {
        console.log(result.data[0]);
        setAllEmployees(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="EMPLOYEES" />
      <div className="flex justify-end">
        <Button
          color="white"
          margin="7px"
          bgColor={currentColor}
          text="Add New (+)"
          borderRadius="10px"
          onClick={handleAddEmployeesClick}
        />
        <Button
          color="white"
          margin="7px"
          bgColor={currentColor}
          text="Update Employee"
          borderRadius="10px"
          onClick={handleEditEmployeesClick}
        />
        <Button
          color="white"
          margin="7px"
          bgColor={currentColor}
          text="View Detail "
          borderRadius="10px"
          onClick={handleViewEmployeesClick}
        />
      </div>

      <GridComponent
        dataSource={AllEmployees}
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

export default Employee;
