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
  addJournalApi,
  getAccNamesCash,
  getAccNameCusVen,
  getAcc1BalFrom,
} from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/Journal.css";
import Select from "react-select";

const AddJournal = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [acc_notes, setAccNotes] = useState("");
  const [AllAccounts, setAllAccounts] = useState("");
  const [r_id, setr_id] = useState("");
  const [to_acc, setto_acc] = useState("");
  const [amount_paid, setamount_paid] = useState(0);
  const [to_acc_Options, setto_acc_Options] = useState([]);
  const [GetAccount_To, setGetAccount_To] = useState([]);
  const [from_acc, setfrom_acc] = useState("");
  const [from_acc_Options, setfrom_acc_Options] = useState([]);
  const [ValError, setValError] = useState([]);
  const [to_acc_bal, setto_acc_bal] = useState("");
  const [from_acc_bal, setfrom_acc_bal] = useState("");
  const [flag, setflag] = useState(0);
  const [acc_from_id, setacc_from_id] = useState(null);
  const [acc_to_id, setacc_to_id] = useState(null);

  const [Journal, setJournal] = useState({
    journal: [],
  });

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setamount_paid(e.target.value);
  };

  const handleChangeAcc_To = async (selectedOption) => {
    // selectedOption.preventDefault();
    setto_acc_bal("");
    if (selectedOption.label !== "") {
      const updatedErrors = [...ValError];
      updatedErrors[0] = "";
      setValError(updatedErrors);
    }
    if (selectedOption && selectedOption.value) {
      if (selectedOption.value) {
        // try {
        //   const resp = await getAcc1BalFrom(selectedOption.value);
        setto_acc_bal(selectedOption.bal);
        // } catch (err) {
        //   console.log(err.message);
        // }
        setto_acc(selectedOption);
        setacc_to_id(selectedOption.value);
      }
    }
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

  const handleRowSelected = (args) => {
    TimeoutUtility.resetTimeout();
    const selectedRowData = args.data;
    setr_id(selectedRowData.journal_id);
    console.log(selectedRowData.journal_id);
    const updatedAccounts = [...AllAccounts];
    updatedAccounts.splice(args.rowIndex, 1);
    setAllAccounts([...updatedAccounts]);
    console.log(updatedAccounts);
  };

  const customersGrid = [
    {
      field: "account",
      headerText: "Account",
      width: "110",
      textAlign: "Center",
    },

    {
      field: "credit",
      headerText: "Credit",
      width: "100",
      format: "C2",
      textAlign: "Center",
    },
    {
      field: "debit",
      headerText: "Debit",
      width: "100",
      format: "C2",
      textAlign: "Center",
    },

    {
      field: "note",
      headerText: "Note",

      // template: customerGridImage,
      width: "200",
      textAlign: "Center",
    },
  ];

  const handleChangeAcc_From = async (selectedOption) => {
    // selectedOption.preventDefault();
    setfrom_acc_bal("");
    if (selectedOption.label !== "") {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
    }
    if (selectedOption && selectedOption.value) {
      if (selectedOption.value) {
        // try {
        //   const resp = await getAcc1BalFrom(selectedOption.value);
        setfrom_acc_bal(selectedOption.bal);
        // } catch (err) {
        //   console.log(err.message);
        // }

        setfrom_acc(selectedOption);
        setacc_from_id(selectedOption.value);
      }
    }
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/journal");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddItem1 = async (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    setValError([]);
    const updatedErrors = [...ValError];

    if (!to_acc) {
      updatedErrors[0] = "Please select account.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (!from_acc) {
      updatedErrors[1] = "Please select type.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (amount_paid === "" || amount_paid === "0" || amount_paid === 0) {
      updatedErrors[2] = "Amount must be greater than 0.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[2] = "";

    if (acc_notes) {
      if (ValidText1(acc_notes, 3) === false) {
        return;
      }
    }
    updatedErrors[3] = "";

    const updatedItem = [...AllAccounts];
    var a = 0,
      b = 0;
    if (from_acc.value === "902") {
      a = parseFloat(amount_paid);
    } else {
      b = parseFloat(amount_paid);
    }
    const newitem = {
      account: to_acc.label,
      credit: a,
      debit: b,
      note: acc_notes,
      type_id: from_acc.value,
      acc_id: to_acc.value,
    };
    setAllAccounts([...updatedItem, newitem]);
    setfrom_acc("");
    setAccNotes("");
    setto_acc("");
    setamount_paid(0);
    setto_acc_bal("");
    setflag(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    const journallist = { ...Journal };
    journallist.journal = [];
    // console.log(AllAccounts.length);
    // return;
    if (AllAccounts.length < 1) {
      alert("Journal vouchar is empty.");
      return;
    }
    var a = 0,
      b = 0;
    AllAccounts.forEach((element, index) => {
      a = a + parseFloat(element.credit);
      b = b + parseFloat(element.debit);
    });

    if (a !== b) {
      alert("Credit and debit are not equal");
      return;
    }

    AllAccounts.forEach((element, index) => {
      var d = 0;
      if (parseFloat(element.credit) > 0) {
        d = parseFloat(element.credit);
      }
      if (parseFloat(element.debit) > 0) {
        d = parseFloat(element.debit);
      }
      const newitem1 = {
        account_id: element.acc_id,
        amount_paid: d,
        type_id: element.type_id,
        note: element.note,
      };
      journallist.journal.push(newitem1);
    });
    console.log(journallist);

    const response = await addJournalApi(journallist);
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/journal");
      alert("Journal Ledger Added Successfully");
    } else {
      alert("Journal Ledger Failed to Add");
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchAcc_ToOptions = async () => {
      const fetchedProductOptions = GetAccount_To.map((item) => ({
        label: item.name,
        value: item.account_id,
        bal: item.end_balance,
      }));
      setto_acc_Options(fetchedProductOptions);
    };
    fetchAcc_ToOptions();
  }, [GetAccount_To, to_acc]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      getAccNamesCash()
        .then((resp) => {
          setGetAccount_To(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      const ba = [
        { label: "Credit", value: "902", bal: "0" },
        {
          label: "Debit",
          value: "901",
          bal: "0",
        },
      ];
      setfrom_acc_Options(ba);
    }
    fetchData();
  }, []);
  const settings = { checkboxMode: "ResetOnRowClick" };
  return (
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div className="user-body">
        <div style={{ paddingLeft: "12px" }}>
          <Header title="ADD JOURNAL" />
        </div>
        <div className="offset-lg-3 col-lg-6">
          <form>
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container-cus">
                <div className="flex justify-left">
                  <div class="article-employee">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="ProductSelect"
                        >
                          Account:{" "}
                        </label>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={to_acc}
                            onChange={handleChangeAcc_To}
                            options={to_acc_Options}
                            isSearchable
                            placeholder="Select Account"
                            isClearable
                            styles={{ width: "200%" }}
                          />
                        </div>
                        <br />
                        <div>
                          {ValError[0] && (
                            <p style={{ color: "red" }}>{ValError[0]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "bold" }}
                          htmlFor="ProductSelect"
                        >
                          Type:{" "}
                        </label>

                        <div style={{ marginTop: "8px" }}>
                          <Select
                            value={from_acc}
                            onChange={handleChangeAcc_From}
                            options={from_acc_Options}
                            isSearchable
                            placeholder="Select Type"
                            isClearable
                          />
                        </div>
                        <div>Bal: {formatCurrency(from_acc_bal)}</div>

                        <div>
                          {ValError[1] && (
                            <p style={{ color: "red" }}>{ValError[1]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Amount Paid:{" "}
                        </label>

                        <br />
                        <input
                          type="number"
                          step="1.00"
                          min="0"
                          value={amount_paid}
                          onChange={handleChangeAmount}
                          defaultValue={0.0}
                          name="amount_paid"
                          placeholder="Amount Paid"
                          className="input"
                          style={{ marginTop: "10px", width: "100%" }}
                        />
                        <div>
                          {ValError[2] && (
                            <p style={{ color: "red" }}>{ValError[2]}</p>
                          )}
                        </div>
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
                          placeholder="Enter Note "
                          id="noteTextarea"
                          value={acc_notes}
                          onChange={handleChangeAccNote}
                          rows="4"
                          className="textarea"
                          style={{ width: "100%", marginTop: "10px" }}
                          onBlur={(e) => ValidText1(e.target.value, 3)}
                        />
                        {ValError[3] && (
                          <p style={{ color: "red" }}>{ValError[3]}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div class="article-container-cus">
                      <div style={{ paddingLeft: "100px" }}>
                        <Button
                          margin="10px"
                          padding="20px"
                          color="white"
                          className="custom-button ml-2"
                          bgColor={currentColor}
                          text="Insert"
                          borderRadius="10px"
                          onClick={handleAddItem1}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div style={{ paddingLeft: "70px" }}></div> */}
                  <div class="article-employee">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <div
                          style={{
                            color: "black",
                            fontSize: "20px",
                            marginTop: "36px",
                          }}
                        >
                          <label style={{ maxWidth: "100%" }}>
                            Bal: {formatCurrency(to_acc_bal)}
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                  <div class="article-journal">
                    <GridComponent
                      dataSource={AllAccounts}
                      allowPaging={true}
                      pageSettings={{ pageSize: 25 }}
                      allowSorting
                      allowTextWrap={true}
                      toolbar={["Search"]}
                      width="auto"
                      rowSelected={handleRowSelected}
                      height={500}
                      className="custom-grid"
                      selectionSettings={settings}
                    >
                      <ColumnsDirective>
                        {customersGrid.map((item, index) => (
                          <ColumnDirective key={index} {...item} />
                        ))}
                      </ColumnsDirective>
                      <Inject
                        services={[
                          Page,
                          Toolbar,
                          Selection,
                          Edit,
                          Sort,
                          Filter,
                        ]}
                      />
                    </GridComponent>
                  </div>
                </div>

                <div class="article-employee">
                  <div className="flex justify-left"></div>
                </div>
                <div
                  className="flex justify-left"
                  style={{ marginTop: "100px", paddingLeft: "280px" }}
                >
                  <div>
                    <Button
                      margin="10px"
                      padding="20px"
                      color="white"
                      className="custom-button ml-2"
                      bgColor={currentColor}
                      text="Add"
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
                </div>
              </div>
            </div>
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default AddJournal;
