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
import { GetAllSuppliers } from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Supplier = () => {
  const [AllSuppliers, setAllSuppliers] = useState("");
  const [Supplier_id, setSupplier_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      <img
        className="rounded-full w-14 h-14"
        src={`data:image/jpeg;base64,${props.profile}`}
        alt="supplier"
        style={{ maxWidth: "80%" }}
      />
      <div>
        {/* <p>{props.name}</p> */}
        {/* <p>{props.code}</p> */}
      </div>
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },

    {
      headerTemplate: ` `,
      width: "60",
      template: customerGridImage,
      textAlign: "Center",
    },
    {
      headerText: "Name",
      width: "60",
      textAlign: "Center",
      field: "name",
    },

    { field: "phone", headerText: "Phone", width: "60", textAlign: "Center" },

    {
      field: "website",
      headerText: "Website",
      width: "60",
      textAlign: "Center",
    },

    // {
    //   field: "contact_phone",
    //   headerText: "Contact Phone",
    //   width: "70",
    //   textAlign: "Center",
    // },
    {
      field: "balance",
      headerText: "A/C Balance",
      width: "60",
      format: "C2",
      textAlign: "Center",
    },
    {
      field: "contact_name",
      headerText: "Contact Name",
      width: "70",
      textAlign: "Center",
    },
    {
      field: "city",
      headerText: "City",
      width: "60",
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
      width: "60",
      format: "C2",
      textAlign: "Center",
    },
  ];

  const handleAddSupplierClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/supplier/addSupplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditSupplierClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Supplier_id != "") {
        navigate(`/supplier/editSupplier/${Supplier_id}`);
      } else {
        alert("Please select supplier to edit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSupplierClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view supplier");
      if (Supplier_id != "") {
        navigate(`/supplier/viewSupplier/${Supplier_id}`);
      } else {
        alert("Please select supplier to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setSupplier_id(selectedRowData.vendor_id);
    console.log(selectedRowData.vendor_id);
  };

  useEffect(() => {
    const resp = GetAllSuppliers();
    resp
      .then(function (result) {
        setAllSuppliers(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="SUPPLIERS" />
      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Add New (+)"
          borderRadius="10px"
          onClick={handleAddSupplierClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Update Supplier"
          borderRadius="10px"
          onClick={handleEditSupplierClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Detail "
          borderRadius="10px"
          onClick={handleViewSupplierClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Vendor Products"
          borderRadius="10px"
          // onClick={handleViewSupplierClick}
        />
      </div>

      <GridComponent
        dataSource={AllSuppliers}
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

export default Supplier;
