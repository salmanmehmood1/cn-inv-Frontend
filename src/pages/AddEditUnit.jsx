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
import { GetAllUnits, DeleteUnitById, AddUnitApi } from "../api/Api";
import Select from "react-select";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import TimeoutUtility from "../contexts/TimeoutUtility";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/product.css";

const AddEditUnit = () => {
  const { currentColor } = useStateContext();
  const [unit, setUnit] = useState("");
  const [getunits, setUnits] = useState([]);
  const [unitOptions, setunitOptions] = useState([]);
  const [unit_id, setunit_id] = useState("");
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
      console.log("Add Unit");
      if (window.confirm("Do you want to Add Unit?")) {
        const { unit_name } = document.forms[0];
        AddUnitApi(unit_name.value)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditunit");
              alert("Added successfully.");
              window.location.reload();
            } else {
              alert("Fail to Add Unit.");
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
      console.log("Delete Unit");
      if (window.confirm(`Do you want to remove '${unit.label}' Unit?`)) {
        console.log(unit_id);
        DeleteUnitById(unit_id)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditunit");
              alert("Removed successfully.");
              window.location.reload();
            } else {
              alert("Fail to Remove Unit.");
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

  const handleChangeUnit = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setUnit(selectedOption);
      const selected_id = selectedOption.value;
      setunit_id(selected_id);
    } else {
      setUnit(selectedOption.label);
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllUnits()
        .then((resp) => {
          setUnits(resp.data || []);
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
      const fetchedStoreOptions = getunits.map((item) => ({
        label: `${item.name}`,
        value: item.unit_id,
      }));
      setunitOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [getunits]);

  return (
    <div className="user-body">
      <div className="offset-lg-3 col-lg-6">
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header title="Add / Delete Product Unit" />
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
                    <label htmlFor="ProductSelect">Unit : </label>
                    <Select
                      value={unit}
                      onChange={handleChangeUnit}
                      options={unitOptions}
                      isSearchable
                      placeholder="search or delete unit ..."
                      isClearable
                    />
                  </div>
                </div>
                <br />

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Unit : </label>
                    <input
                      type="text"
                      name="unit_name"
                      placeholder="Enter unit to add"
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

export default AddEditUnit;
