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
import hello from "../data/default_prod2.png";
import { GetAllProducts, DeleteProductById } from "../api/Api";
import { Header, Button } from "../components";
import "../styles/viewCustomer.css";
import { useStateContext } from "../contexts/ContextProvider";

const Products = () => {
  const [AllProducts, setAllProducts] = useState("");
  const [p_id, setCode] = useState(0);
  const navigate = useNavigate();
  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      {props.image === null ? (
        <div>
          <img
            className="rounded-full w-14 h-14"
            src={hello}
            alt="product"
            style={{ maxWidth: "100%" }}
          />
        </div>
      ) : (
        <img
          className="rounded-full w-14 h-14"
          src={`data:image/jpeg;base64,${props.image}`}
          alt="product"
          style={{ maxWidth: "100%", objectFit: "contain" }}
        />
      )}
    </div>
  );

  const Removefunction = () => {
    if (window.confirm("Do you want to remove product?")) {
      DeleteProductById(p_id)
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {props.active_product == 1 ? (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
          <p1> Active</p1>
          {/* {props.active_product} */}
        </button>
      ) : (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
          <p1>InActive</p1>

          {/* {props.active_product} */}
        </button>
      )}
    </div>
  );
  const ProductGriddisplayStatus = (props) => (
    <div>
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.display_product}</p> */}
      {props.display_product == 0 ? (
        <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
          <p style={{ background: "red" }} className="rounded-full h-3 w-3" />
          <p>Disable</p>
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
          <p style={{ background: "green" }} className="rounded-full h-3 w-3" />
          <p>Enable</p>
        </div>
      )}
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      width: "80",
      template: customerGridImage,
      textAlign: "Center",
    },

    {
      headerText: "Product",
      width: "100",
      field: "name",
      // template: customerGridImage,
      textAlign: "Center",
    },
    { field: "code", headerText: "Code", width: "100", textAlign: "Center" },

    {
      field: "details",
      headerText: "Description",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "unit_id",
      headerText: "Unit",
      width: "80",
      textAlign: "Center",
    },

    {
      field: "unit_price",
      headerText: "Unit Price",
      width: "80",
      format: "C2",
      textAlign: "Center",
    },
    {
      field: "discount",
      headerText: "Discount",
      width: "80",
      format: "C2",
      textAlign: "Center",
    },

    {
      template: ProductGridactiveStatus,
      field: "active_product",
      headerText: "Active Status",
      width: "150",
      textAlign: "Center",
    },

    {
      template: ProductGriddisplayStatus,
      field: "display_product",
      headerText: "Display Status",
      width: "100",
      textAlign: "Center",
    },
  ];

  const { currentColor } = useStateContext();

  const handleAddNewProdClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/product/addproduct");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditProductClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Edit Product");
      if (p_id != "") {
        navigate(`/product/editproduct/${p_id}`);
      } else {
        alert("Please select product to edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleBackClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //     console.log("Back");
  //     navigate("/i");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleViewProductClick = async (event) => {
    event.preventDefault();
    try {
      console.log("View Product Details");
      if (p_id != "") {
        navigate(`/product/viewproduct/${p_id}`);
      } else {
        alert("Please select product to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    // const selectedRowData = args.data;
    setCode(args.data.product_id);
    //console.log(selectedRowData.product_id);
  };

  useEffect(() => {
    const resp = GetAllProducts();
    resp
      .then(function (result) {
        setAllProducts(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="PRODUCTS" />
      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Add New (+)"
          borderRadius="10px"
          onClick={handleAddNewProdClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Edit Product"
          borderRadius="10px"
          onClick={handleEditProductClick}
        />
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="View Detail"
          borderRadius="10px"
          onClick={handleViewProductClick}
        />
        {/* <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        /> */}
      </div>
      <GridComponent
        dataSource={AllProducts}
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

export default Products;
