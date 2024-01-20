import React, { useEffect, useState } from "react";
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
import { GetAllBrands, DeleteBrandById, AddBrandApi } from "../api/Api";
import TimeoutUtility from "../contexts/TimeoutUtility";
import Select from "react-select";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/product.css";

const AddBrandUnit = () => {
  const { currentColor } = useStateContext();
  const [brand, setBrand] = useState("");
  const [getbrands, setBrands] = useState([]);
  const [brandOptions, setbrandOptions] = useState([]);
  const [brand_id, setbrand_id] = useState("");
  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/product/addproduct");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Add Brand");
      if (window.confirm("Do you want to Add Brand?")) {
        const { brand_name } = document.forms[0];
        AddBrandApi(brand_name.value)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditbrand");
              alert("Added successfully.");
              window.location.reload();
            } else {
              alert("Fail to Add Brand.");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Delete Brand");
      if (window.confirm(`Do you want to remove '${brand.label}' Brand?`)) {
        console.log(brand_id);
        DeleteBrandById(brand_id)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditbrand");
              alert("Removed successfully.");
              window.location.reload();
            } else {
              alert("Fail to Remove Brand.");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeBrand = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setBrand(selectedOption);
      const selected_id = selectedOption.value;
      setbrand_id(selected_id);
    } else {
      setBrand(selectedOption.label);
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllBrands()
        .then((resp) => {
          setBrands(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchStoreOptions = async () => {
      const fetchedStoreOptions = getbrands.map((item) => ({
        label: `${item.name}`,
        value: item.brand_id,
      }));
      setbrandOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [getbrands]);

  return (
    <div className="user-body">
      <div className="offset-lg-3 col-lg-6">
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header title="Add / Delete Product Brand" />
          <form className="container-trans">
            <div
              className="card"
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="ProductSelect">Brand : </label>
                    <Select
                      value={brand}
                      onChange={handleChangeBrand}
                      options={brandOptions}
                      isSearchable
                      placeholder="search or delete brand ..."
                      isClearable
                    />
                  </div>
                </div>
                <br />

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Brand : </label>
                    <input
                      type="text"
                      name="brand_name"
                      placeholder="Enter brand to add"
                      className="form-control"
                    />
                  </div>
                </div>
                <br />

                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                  onClick={handleAddSubmit}
                />
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Delete"
                  borderRadius="10px"
                  onClick={handleDeleteSubmit}
                />
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Back"
                  borderRadius="10px"
                  onClick={handleBackClick}
                />
              </div>
            </div>
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default AddBrandUnit;
