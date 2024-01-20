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
import {
  GetAllCategories,
  DeleteCategoryById,
  AddCategoryApi,
} from "../api/Api";
import Select from "react-select";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import TimeoutUtility from "../contexts/TimeoutUtility";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/product.css";

const AddEditCategory = () => {
  const { currentColor } = useStateContext();
  const [category, setCategory] = useState("");
  const [getcategorys, setCategorys] = useState([]);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [category_id, setcategory_id] = useState("");
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
      console.log("Add Category");
      if (window.confirm("Do you want to Add Category?")) {
        const { category_name } = document.forms[0];
        AddCategoryApi(category_name.value)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditcategory");
              alert("Added successfully.");
              window.location.reload();
            } else {
              alert("Fail to Add Category.");
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
      console.log("Delete Category");
      if (
        window.confirm(`Do you want to remove '${category.label}' Category?`)
      ) {
        console.log(category_id);
        DeleteCategoryById(category_id)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditcategory");
              alert("Removed successfully.");
              window.location.reload();
            } else {
              alert("Fail to Remove Category.");
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

  const handleChangeCategory = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setCategory(selectedOption);
      const selected_id = selectedOption.value;
      setcategory_id(selected_id);
    } else {
      setCategory(selectedOption.label);
      const selected_id = selectedOption.value;
      setcategory_id(selected_id);
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllCategories()
        .then((resp) => {
          setCategorys(resp.data || []);
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
      const fetchedStoreOptions = getcategorys.map((item) => ({
        label: `${item.name}`,
        value: item.category_id,
      }));
      setcategoryOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [getcategorys]);

  return (
    <div className="user-body">
      <div className="offset-lg-3 col-lg-6">
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header title="Add / Delete Product Category" />
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
                    <label htmlFor="ProductSelect">Category : </label>
                    <Select
                      value={category}
                      onChange={handleChangeCategory}
                      options={categoryOptions}
                      isSearchable
                      placeholder="search or delete category ..."
                      isClearable
                    />
                  </div>
                </div>
                <br />

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Category : </label>
                    <input
                      type="text"
                      name="category_name"
                      placeholder="Enter category to add"
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

export default AddEditCategory;
