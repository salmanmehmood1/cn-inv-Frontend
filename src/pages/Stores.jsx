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
import { GetAllProducts, GetAllStoreDetails } from "../api/Api";
import "../styles/viewCustomer.css";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Stores = () => {
  const [AllStores, setAllStores] = useState("");
  const [Store_id, setStore_id] = useState("");
  const navigate = useNavigate();

  //   const Removefunction = () => {
  //     if (window.confirm("Do you want to remove store?")) {
  //       DeleteStoreById(Code)
  //       .then((res) => {
  //         alert("Removed successfully.");
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //         }
  //   };

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "40" },
    { headerText: "Store", field: "name", width: "150", textAlign: "Center" },
    { field: "email", headerText: "E-mail", width: "150", textAlign: "Center" },

    {
      field: "contact",
      headerText: "Contact",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "total_stock",
      headerText: "Total Stock",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "manager",
      headerText: "Manager",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "city",
      headerText: "City",
      width: "150",
      textAlign: "Center",
    },
  ];

  const { currentColor } = useStateContext();

  const handleAddStoreClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/stores/add");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditStoreClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Store_id != "") {
        navigate(`/stores/edit/${Store_id}`);
      } else {
        alert("Please! Select Store to Edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewStoreClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view store");
      if (Store_id != "") {
        navigate(`/stores/viewStore/${Store_id}`);
      } else {
        alert("Please! Select Store to View");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setStore_id(selectedRowData.store_id);
    console.log(selectedRowData.store_id);
    // console.log('Selected Product Code:', productcode);
  };

  useEffect(() => {
    const resp = GetAllStoreDetails();
    resp
      .then(function (result) {
        setAllStores(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="STORES" />
      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Add New (+)"
          borderRadius="10px"
          onClick={handleAddStoreClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Update Store"
          borderRadius="10px"
          onClick={handleEditStoreClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Detail "
          borderRadius="10px"
          onClick={handleViewStoreClick}
        />
      </div>
      <GridComponent
        dataSource={AllStores}
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
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Stores;
