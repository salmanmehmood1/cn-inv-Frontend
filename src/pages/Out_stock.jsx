import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidText } from "../contexts/Utils";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  GetProductsByStoreId,
  GetAllStores,
  GetinvStock,
  Verifyopeningbalexist,
  AddOutStock,
} from "../api/Api";
import Select from "react-select";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Out_stock = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetProduct, setGetProduct] = useState([]);
  const [GetStore, setGetStore] = useState([]);
  const [product, setProducts] = useState("");
  const [p_code, setp_code] = useState("");
  const [store_ids, setstore_ids] = useState("");
  const [store, setStores] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [OldBal, setOldBal] = useState("");
  const [invExist, setinvExist] = useState(0);
  const [note, setNote] = useState("");
  const [ValError, setValError] = useState([]);

  const ValidText1 = (txt, ii) => {
    const updatedErrors = [...ValError];
    if (txt.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (ValidText(txt)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid Field!";
    setValError(updatedErrors);
    return false;
  };

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
      //setOldBal('');
      setProducts(selectedOption);
      const selectedProduct = selectedOption.value;
      setp_code(selectedProduct);

      checkBalExist(selectedOption.value, store_ids);
    }
    // setp_code(selectedProduct.split(' ')[0]);
  };
  const checkBalExist = async (pro_id, so_id) => {
    try {
      const resp = await Verifyopeningbalexist(pro_id, so_id);
      setinvExist(resp.data[0].status);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getpreviousbal = async (pro_id, so_id) => {
    try {
      const resp = await GetinvStock(pro_id, so_id);
      setOldBal(resp.data[0].unit_instock);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleChangeStore = (selectedOption) => {
    //const selectedStore = e.target.value;

    if (selectedOption && selectedOption.value) {
      const updatedErrors = [...ValError];
      updatedErrors[0] = "";
      setValError(updatedErrors);
      console.log(selectedOption.value);
      setStores(selectedOption);
      setstore_ids(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        getProductfromstore(selectedOption.value);
      } else {
        setGetProduct([]);
      }
    }
  };
  const getProductfromstore = async (selectedStore) => {
    //const storeid = GetStore.find((item) => item.name === selectedStore);

    if (selectedStore) {
      try {
        const resp = await GetProductsByStoreId(selectedStore);
        setGetProduct(resp.data || []);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/inventory");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { unit_instock } = document.forms[0];
    //const product_id = GetProduct.find(item => item.code === p_code);
    //const store_id = GetStore.find(item => item.name === store);
    setValError([]);
    const updatedErrors = [...ValError];
    if (store === "") {
      updatedErrors[0] = "Please! Select Store";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";
    if (product === "") {
      updatedErrors[1] = "Please! Select Product";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (note !== "") {
      if (ValidText1(note, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (unit_instock.value === "") {
      updatedErrors[3] = "Please! Enter Out-Stock";
      setValError(updatedErrors);
      return;
    }
    if (unit_instock.value < 1) {
      updatedErrors[3] = "Out-Stock must be greater than 0";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[3] = "";

    const response = await AddOutStock(
      store_ids,
      p_code,
      unit_instock.value,
      704,
      note
    );

    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/inventory/outstock");
      alert("Out Stock Added Successfully");
    } else {
      alert("Out Stock Failed to Add");
    }
    window.location.reload();
  };
  useEffect(() => {
    async function fetchData() {
      GetAllStores()
        .then((resp) => {
          setGetStore(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (store_ids) {
      //const storeid = GetStore.find((item) => item.name === store);
      console.log("getProductfromstore");
      console.log(store);
      GetProductsByStoreId(store_ids)
        .then((resp) => {
          console.log(resp.data);
          setGetProduct(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [store]);

  useEffect(() => {
    if (invExist === 1) {
      getpreviousbal(p_code, store_ids);
    } else {
      setOldBal("-");
    }
  }, [invExist]);

  useEffect(() => {
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        label: `${item.code} ${item.name}`,
        value: item.product_id,
      }));
      setProductOptions(fetchedProductOptions);
      checkBalExist(p_code, store_ids);
    };

    fetchProductOptions();
  }, [GetProduct, store_ids]);

  useEffect(() => {
    const fetchStoreOptions = async () => {
      const fetchedStoreOptions = GetStore.map((item) => ({
        label: `${item.name}`,
        value: item.store_id,
      }));
      setStoreOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [GetStore]);

  return (
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div style={{ paddingLeft: "100px" }}>
        <Header title="INVENTORY OUT-STOCK" />
      </div>
      <div className="user-body">
        <div className="offset-lg-3 col-lg-6">
          <form>
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div
                  className="flex justify-center"
                  // style={{ paddingLeft: "700px" }}
                >
                  {/* <div class="article-container"> */}
                  <div style={{ flex: "0 0 50%", paddingLeft: "45px" }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="StoreSelect"
                        >
                          Store :{" "}
                        </label>

                        {/* <select
          id="StoreSelect"
          value={store}
          onChange={handleChangeStore}
        >
          <option value=""> select </option>
          
          {GetStore.map((item) => (
          <option key={item.store_id}>
            {item.name}
          </option>
        ))}
        </select> */}
                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={store}
                            onChange={handleChangeStore}
                            options={storeOptions}
                            isSearchable
                            placeholder="Search Store"
                            isClearable
                            autoFocus
                          />
                        </div>

                        <span
                          style={{
                            color: "red",
                            fontSize: "26px",
                            paddingLeft: "102%",
                          }}
                        >
                          {` `}*
                        </span>

                        {ValError[0] && (
                          <p style={{ color: "red" }}>{ValError[0]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="ProductSelect"
                        >
                          Product :{" "}
                        </label>
                        <span style={{ color: "red", fontSize: "24px" }}>
                          {`  `}*
                        </span>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={product}
                            onChange={handleChangeProduct}
                            options={productOptions}
                            isSearchable
                            placeholder="Search Product"
                            isClearable
                          />
                        </div>

                        <span
                          style={{
                            color: "red",
                            fontSize: "24px",
                            paddingLeft: "102%",
                          }}
                        >
                          {`  `}*
                        </span>
                        {ValError[1] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[1]}
                          </p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Note: </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          placeholder="Note "
                          id="noteTextarea"
                          value={note}
                          onChange={handleChangeNote}
                          onBlur={(e) => ValidText1(e.target.value, 2)}
                          rows="4"
                          className="textarea"
                          style={{ width: "100%", marginTop: "10px" }}
                        />
                        {ValError[2] && (
                          <p style={{ color: "red" }}>{ValError[2]}</p>
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>

                  <div style={{ flex: "0 0 14%" }}></div>
                  <div
                    style={{
                      flex: "0 0 50%",
                      marginTop: "4px",
                      padding: "10px",
                    }}
                  >
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Previous Inventory:{" "}
                        </label>
                        <input
                          type="text"
                          step="1.00"
                          value={OldBal}
                          min="0"
                          placeholder="Previous Balance"
                          className="input"
                          readOnly
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            backgroundColor: "lightgray",
                            width: "91%",
                            marginTop: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Stock: </label>

                        <br />
                        <input
                          type="number"
                          min="0"
                          defaultValue={0}
                          step="1.00"
                          name="unit_instock"
                          placeholder="Balance"
                          className="input"
                          style={{ width: "91%", marginTop: "10px" }}
                        />
                        <span style={{ color: "red", fontSize: "24px" }}>
                          {`  `}*
                        </span>
                        {ValError[3] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[3]}
                          </p>
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div style={{ paddingLeft: "240px" }}>
                <Button
                  margin="10px"
                  padding="20px"
                  color="white"
                  className="custom-button mr-2"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                  onClick={handleSubmit}
                />
                <Button
                  margin="10px"
                  padding="20px"
                  color="white"
                  className="custom-button mr-2"
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

export default Out_stock;
