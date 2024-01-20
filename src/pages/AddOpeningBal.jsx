import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../contexts/Utils";
import {
  GetProductsByStoreId,
  GetAllStores,
  AddInventoryApi,
  GetProductNameCode,
  GetopeningBal,
  Verifyopeningbalexist,
  AddOpeningBalance,
  EditOpeningBalance,
} from "../api/Api";
import Select from "react-select";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const AddOpeningBal = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [ValError, setValError] = useState([]);
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
  const [minstock, setminstock] = useState(0);
  const [maxstock, setmaxstock] = useState(0);

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
      setProducts(selectedOption);
      const selectedProduct = selectedOption.value;
      setp_code(selectedProduct);
      checkBalExist(selectedOption.value, store_ids);
    }
  };

  const checkBalExist = async (pro_id, so_id) => {
    try {
      TimeoutUtility.resetTimeout();
      const resp = await Verifyopeningbalexist(pro_id, so_id);
      setinvExist(resp.data[0].status);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getpreviousbal = async (pro_id, so_id) => {
    try {
      TimeoutUtility.resetTimeout();
      const resp = await GetopeningBal(pro_id, so_id);
      setOldBal(resp.data[0].opening_balance);
      setminstock(resp.data[0].min_stock);
      setmaxstock(resp.data[0].max_stock);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleChangeminstock = (e) => {
    setminstock(e.target.value);
  };
  const handleChangemaxstock = (e) => {
    setmaxstock(e.target.value);
  };

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
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const handleChangeStore = (selectedOption) => {
    //const selectedStore = e.target.value

    if (selectedOption && selectedOption.value) {
      const updatedErrors = [...ValError];
      updatedErrors[0] = "";
      setValError(updatedErrors);
      console.log(selectedOption.value);
      setStores(selectedOption);
      setstore_ids(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        getProductsAll();
      } else {
        setGetProduct([]);
      }
    }
  };
  const getProductsAll = async () => {
    TimeoutUtility.resetTimeout();
    //const storeid = GetStore.find((item) => item.name === selectedStore);
    try {
      const resp = await GetProductNameCode();
      setGetProduct(resp.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/inventory");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    const { opening_balance } = document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];
    if (store === "") {
      updatedErrors[0] = "Please select store.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";
    if (product === "") {
      updatedErrors[1] = "Please select product.";
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

    if (opening_balance.value === "") {
      updatedErrors[3] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    if (opening_balance.value <= 0) {
      updatedErrors[3] = "Opening balance must be 0 or greater.";
      setValError(updatedErrors);
      return;
    }

    updatedErrors[3] = "";

    if (minstock < 0) {
      updatedErrors[4] = "Min-stock must be 0 or greater";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[4] = "";

    if (maxstock < minstock) {
      updatedErrors[5] = "Max-stock must be equal or greater than min-stock";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[5] = "";

    var mx = 0,
      mn = 0;

    if (maxstock !== "") {
      mx = maxstock;
    }
    if (minstock !== "") {
      mn = minstock;
    }

    if (invExist === 0) {
      const response = await AddOpeningBalance(
        store_ids,
        p_code,
        mn,
        mx,
        opening_balance.value,
        702,
        note
      );

      console.log(response, "Response");
      if (response.status === 200) {
        navigate("/inventory");
        alert("Opening balance added successfully.");
      } else {
        alert("Opening balance failed to add.");
      }
    } else {
      const response = await EditOpeningBalance(
        store_ids,
        p_code,
        opening_balance.value,
        mn,
        mx
      );

      console.log(response, "Response");
      if (response.status === 200) {
        navigate("/inventory");
        alert("Opening balance update successfully.");
      } else {
        alert("Opening balance failed to update.");
      }
    }
    // window.location.reload();
  };
  useEffect(() => {
    TimeoutUtility.resetTimeout();
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

  //  useEffect(() => {
  //   if (store_ids) {
  //     //const storeid = GetStore.find((item) => item.name === store);
  //     console.log("getAllProduct");
  //     console.log(store);
  //     GetProductNameCode()
  //       .then((resp) => {
  //         console.log(resp.data);
  //         setGetProduct(resp.data || []);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // }, [store]);

  useEffect(() => {
    // setProducts("");
    // setGetProduct([]);
    setminstock(0);
    setmaxstock(0);
    setOldBal("-");
    const { opening_balance } = document.forms[0];
    opening_balance.value = 0;
  }, [store]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    if (invExist === 1) {
      getpreviousbal(p_code, store_ids);
    } else {
      setOldBal("-");
    }
  }, [invExist, product]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
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
    TimeoutUtility.resetTimeout();
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
    <div className="m-2 md:m-4 p-1 md:p-1 bg-white rounded-3xl">
      <div style={{ paddingLeft: "120px" }}>
        <Header title="OPENING BALANCE" />
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
              {" "}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div
                  className="flex justify-left"
                  // style={{ paddingLeft: "700px" }}
                >
                  <div style={{ flex: "0 0 50%", padding: "20px" }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="StoreSelect"
                        >
                          Store:{" "}
                        </label>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={store}
                            onChange={handleChangeStore}
                            options={storeOptions}
                            isSearchable
                            placeholder="Select Store"
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
                          Product:{" "}
                        </label>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={product}
                            onChange={handleChangeProduct}
                            options={productOptions}
                            isSearchable
                            placeholder="Select Product"
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
                        <br />
                      </div>
                    </div>
                    <br />
                    {invExist === 0 && (
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label style={{ fontWeight: "bold" }}>Note: </label>
                        </div>
                      </div>
                    )}
                    {invExist === 0 && (
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            placeholder="Note "
                            id="noteTextarea"
                            value={note}
                            onChange={handleChangeNote}
                            rows="4"
                            className="textarea"
                            style={{ width: "100%", marginTop: "10px" }}
                            onBlur={(e) => ValidText1(e.target.value, 2)}
                          />
                          {ValError[2] && (
                            <p style={{ color: "red" }}>{ValError[2]}</p>
                          )}
                        </div>
                      </div>
                    )}
                    <br />
                  </div>
                  <div style={{ flex: "0 0 14%" }}></div>
                  <div
                    style={{
                      flex: "0 0 50%",
                      marginTop: "30px",
                      padding: "10px",
                    }}
                  >
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Previous Balance:{" "}
                        </label>
                        <input
                          type="text"
                          //step="0.01"
                          value={OldBal}
                          min="0"
                          placeholder="Previous Balance"
                          className="input"
                          readOnly
                          style={{
                            color: "red",
                            backgroundColor: "lightgray",
                            width: "90%",
                            marginTop: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Opening Balance:{" "}
                        </label>

                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          defaultValue={0}
                          name="opening_balance"
                          placeholder="Opening Balance"
                          className="input"
                          style={{ width: "90%", marginTop: "10px" }}
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

                    {/* {invExist === 0 && ( */}
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Min Stock:{" "}
                        </label>
                        <input
                          type="number"
                          step="1.00"
                          value={minstock}
                          onChange={handleChangeminstock}
                          defaultValue={0}
                          min="0"
                          name="min_stock"
                          placeholder="Min Stock"
                          className="input"
                          style={{ width: "90%", marginTop: "10px" }}
                        />
                        {ValError[4] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[4]}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* )} */}
                    <br />

                    {/* {invExist === 0 && ( */}
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Max Stock:{" "}
                        </label>
                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          defaultValue={0}
                          name="max_stock"
                          value={maxstock}
                          placeholder="Max Stock"
                          onChange={handleChangemaxstock}
                          className="input"
                          style={{ width: "90%", marginTop: "10px" }}
                        />
                        {ValError[5] && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {ValError[5]}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
              <div style={{ paddingLeft: "240px" }}>
                <Button
                  margin="10px"
                  padding="20px"
                  color="white"
                  className="custom-button ml-2"
                  bgColor={currentColor}
                  text="Add / Edit"
                  borderRadius="10px"
                  onClick={handleSubmit}
                />
                <Button
                  margin="10px"
                  padding="20px"
                  color="white"
                  className="custom-button ml-2"
                  bgColor={currentColor}
                  text="Back"
                  borderRadius="10px"
                  onClick={handleBackClick}
                />
              </div>
              {/* </div> */}
            </div>
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default AddOpeningBal;
