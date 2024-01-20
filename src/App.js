import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Login from "./pages/Login";
import { NavBar, Sidebar, ThemeSettings } from "./components";
import { Overview, Orders } from "./pages";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddOpeningBal";
import AddProduct from "./pages/AddProduct";
import { useStateContext } from "./contexts/ContextProvider";
import ProtectedRoute from "./contexts/ProtectedRoute";
import "./App.css";
import Out_stock from "./pages/Out_stock";
import In_stock from "./pages/In_stock";
import Stores from "./pages/Stores";
import AddStore from "./pages/AddStore";
import TimeoutUtility from "./contexts/TimeoutUtility";
import EditStore from "./pages/EditStore";
import ViewInventory from "./pages/ViewInventory";
import ViewStore from "./pages/ViewStore";
import ViewProduct from "./pages/ViewProduct";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import ViewCustomer from "./pages/ViewCustomer";
import Employee from "./pages/Employee";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import AddEditUnit from "./pages/AddEditUnit";
import AddEditBrand from "./pages/AddEditBrand";
import AddEditCategory from "./pages/AddEditCategory";
import Supplier from "./pages/Supplier";
import AddSupplier from "./pages/AddSupplier";
import EditSupplier from "./pages/EditSupplier";
import ViewSupplier from "./pages/ViewSupplier";
import Accounts from "./pages/Account";
import AddAccount from "./pages/AddAccount";
import EditAccount from "./pages/EditAccount";
import ViewAccount from "./pages/ViewAccount";
import Sales from "./pages/Sales";
import AddSaleOrder from "./pages/AddSaleOrder";
import EditSaleOrder from "./pages/EditSaleOrder";
import ViewSaleOrder from "./pages/ViewSaleOrder";
import Shipment from "./pages/Shipment";
import Purchase from "./pages/Purchase";
import AddPurchaseOrder from "./pages/AddPurchaseOrder";
import EditPurchaseOrder from "./pages/EditPurchaseOrder";
import ViewPurchaseOrder from "./pages/ViewPurchaseOrder";
import Receive_Log from "./pages/Receive_Log";
import AddEstimation from "./pages/AddEstimation";
import EditEstimation from "./pages/EditEstimation";
import ViewEstimation from "./pages/ViewEstimation";
import ConvertEstimate from "./pages/ConvertEstimate";
import Receipt from "./pages/Receipt";
import AddReceipt from "./pages/AddReceipt";
import EditReceipt from "./pages/EditReceipt";
import Payment from "./pages/Payment";
import AddPayment from "./pages/AddPayment";
import EditPayment from "./pages/EditPayment";
import Journal from "./pages/Journal";
import AddJournal from "./pages/AddJournal";
import EditJournal from "./pages/EditJournal";

function App() {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  const allowedRoutes = [
    "/",
    "/login",
    "/Overview",
    "/orders",
    "/customers",
    "/inventory",
    "/inventory/add",
    "/inventory/product",
    "/inventory/product/addproduct",
    "/inventory/product/editproduct/:p_id",
    "/inventory/instock",
    "/inventory/outstock",
    "/inventory/viewinventory/:p_id",
    "/stores",
    "/stores/add",
    "/stores/edit/:Store_id",
    "/stores/viewStore/:Store_id",
    "/inventory/product/viewproduct/:p_id",
    "/customer/addCustomer",
    "/customer/editCustomer/:Customer_id",
    "/customer/viewCustomer/:Customer_id",
    "/employee",
    "/employee/addEmployee",
    "/employee/editemployee/:Employee_id",
    "/employee/viewemployee/:Employee_id",
    "/inventory/product/AddEditCategory",
    "/inventory/product/AddEditBrand",
    "/inventory/product/AddEditUnit",
    "/supplier",
    "/supplier/addSupplier",
    "/supplier/editsupplier/:Supplier_id",
    "/supplier/viewsupplier/:Supplier_id",
    "/account",
    "/account/addaccount",
    "/account/editaccount/:Account_id",
    "/account/viewaccount/:Account_id",
    "/sales",
    "/sales/addSaleOrder/:store_id",
    "/sales/editSaleOrder/:so_ids",
    "/sales/viewSaleOrder/:so_id",
    "/sales/Shipment/:so_ids",
    "/Purchase",
    "/Purchase/addPurchaseOrder/:store_id",
    "/Purchase/editPurchaseOrder/:po_ids",
    "/Purchase/viewPurchaseOrder/:po_id",
    "/Purchase/Receive_log/:po_ids",
    "/sales/addEstimation/:store_id",
    "/sales/editEstimation/:so_ids",
    "/sales/viewEstimation/:so_id",
    "/sales/ConvertEstimate/:so_ids",
    "/receipt",
    "/receipt/AddReceipt",
    "/receipt/EditReceipt/:r_id",
    "/payment",
    "/payment/AddPayment",
    "/payment/EditPayment/:r_id",
    "/journal",
    "/journal/AddJournal",
    "/journal/EditJournal/:r_id",
  ];

  const routesWithoutSidebarAndNavbar = [];

  useEffect(() => {
    TimeoutUtility.attachEventListeners();
    TimeoutUtility.resetTimeout();
    return () => {
      TimeoutUtility.removeEventListeners();
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="*"
            element={
              // user_id1 ? (
              <>
                <div>
                  <div className={currentMode === "Dark" ? "dark" : ""}>
                    <div className="flex realative dark:bg-main-dark-bg">
                      <div
                        className="fixed right-4 bottom-4"
                        style={{ zIndex: "1000" }}
                      >
                        <TooltipComponent
                          content="Settings"
                          position="TopCenter"
                        >
                          <button
                            type="button"
                            className="text-2xl p-3 hover: drop-shadow-xl hover:bg-light-gray text-white"
                            onClick={() => setThemeSettings(true)}
                            style={{
                              background: currentColor,
                              borderRadius: "50%",
                            }}
                          >
                            <FiSettings />
                          </button>
                        </TooltipComponent>
                      </div>
                      {routesWithoutSidebarAndNavbar.includes(
                        window.location.pathname
                      ) ||
                      window.location.pathname.includes(
                        "/sales/editSaleOrder/"
                      ) ||
                      window.location.pathname.includes(
                        "/sales/addSaleOrder/"
                      ) ||
                      window.location.pathname.includes(
                        "/Purchase/addPurchaseOrder/"
                      ) ||
                      window.location.pathname.includes(
                        "/sales/addEstimation/"
                      ) ||
                      window.location.pathname.includes(
                        "/sales/editEstimation/"
                      ) ||
                      window.location.pathname.includes(
                        "/sales/ConvertEstimate/"
                      ) ||
                      window.location.pathname.includes(
                        "/Purchase/editPurchaseOrder/"
                      ) ? null : (
                        <div>
                          {activeMenu ? (
                            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                              <Sidebar />
                            </div>
                          ) : (
                            <div className="w-0 dark:bg-secondary-dark-bg">
                              <Sidebar />
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                          routesWithoutSidebarAndNavbar.includes(
                            window.location.pathname
                          ) ||
                          window.location.pathname.includes(
                            "/sales/editSaleOrder/"
                          ) ||
                          window.location.pathname.includes(
                            "/sales/addEstimation/"
                          ) ||
                          window.location.pathname.includes(
                            "/Purchase/editPurchaseOrder/"
                          ) ||
                          window.location.pathname.includes(
                            "/Purchase/addPurchaseOrder/"
                          ) ||
                          window.location.pathname.includes(
                            "/sales/editEstimation/"
                          ) ||
                          window.location.pathname.includes(
                            "/sales/ConvertEstimate/"
                          ) ||
                          window.location.pathname.includes(
                            "/sales/addSaleOrder/"
                          )
                            ? ""
                            : activeMenu
                            ? "md:ml-72"
                            : "flex-2"
                        }`}
                      >
                        {routesWithoutSidebarAndNavbar.includes(
                          window.location.pathname
                        ) ||
                        window.location.pathname.includes(
                          "/sales/editSaleOrder/"
                        ) ||
                        window.location.pathname.includes(
                          "/sales/addEstimation/"
                        ) ||
                        window.location.pathname.includes(
                          "/Purchase/editPurchaseOrder/"
                        ) ||
                        window.location.pathname.includes(
                          "/Purchase/addPurchaseOrder/"
                        ) ||
                        window.location.pathname.includes(
                          "/sales/editEstimation/"
                        ) ||
                        window.location.pathname.includes(
                          "/sales/ConvertEstimate/"
                        ) ||
                        window.location.pathname.includes(
                          "/sales/addSaleOrder/"
                        ) ? null : (
                          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            <NavBar />
                          </div>
                        )}

                        <div>
                          {themeSettings && <ThemeSettings />}
                          <Routes>
                            <Route
                              path="/Overview"
                              element={
                                <ProtectedRoute>
                                  <Overview />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/orders"
                              element={
                                <ProtectedRoute>
                                  <Orders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customers"
                              element={
                                <ProtectedRoute>
                                  <Customers />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory"
                              element={
                                <ProtectedRoute>
                                  <Inventory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/add"
                              element={
                                <ProtectedRoute>
                                  <AddInventory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/addproduct"
                              element={
                                <ProtectedRoute>
                                  <AddProduct />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/editproduct/:p_id"
                              element={
                                <ProtectedRoute>
                                  <EditProduct />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/instock"
                              element={
                                <ProtectedRoute>
                                  <In_stock />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/outstock"
                              element={
                                <ProtectedRoute>
                                  <Out_stock />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/viewinventory/:p_id"
                              element={
                                <ProtectedRoute>
                                  <ViewInventory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores"
                              element={
                                <ProtectedRoute>
                                  <Stores />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores/add"
                              element={
                                <ProtectedRoute>
                                  <AddStore />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores/edit/:Store_id"
                              element={
                                <ProtectedRoute>
                                  <EditStore />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores/viewStore/:Store_id"
                              element={
                                <ProtectedRoute>
                                  <ViewStore />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product"
                              element={
                                <ProtectedRoute>
                                  <Products />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/viewproduct/:p_id"
                              element={
                                <ProtectedRoute>
                                  <ViewProduct />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/addCustomer"
                              element={
                                <ProtectedRoute>
                                  <AddCustomer />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/editCustomer/:Customer_id"
                              element={
                                <ProtectedRoute>
                                  <EditCustomer />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/viewCustomer/:Customer_id"
                              element={
                                <ProtectedRoute>
                                  <ViewCustomer />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee"
                              element={
                                <ProtectedRoute>
                                  <Employee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee/addEmployee"
                              element={
                                <ProtectedRoute>
                                  <AddEmployee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee/editemployee/:Employee_id"
                              element={
                                <ProtectedRoute>
                                  <EditEmployee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee/viewemployee/:Employee_id"
                              element={
                                <ProtectedRoute>
                                  <ViewEmployee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/AddEditCategory"
                              element={
                                <ProtectedRoute>
                                  <AddEditCategory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/AddEditBrand"
                              element={
                                <ProtectedRoute>
                                  <AddEditBrand />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/AddEditUnit"
                              element={
                                <ProtectedRoute>
                                  <AddEditUnit />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier"
                              element={
                                <ProtectedRoute>
                                  <Supplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/addSupplier"
                              element={
                                <ProtectedRoute>
                                  <AddSupplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/editsupplier/:Supplier_id"
                              element={
                                <ProtectedRoute>
                                  <EditSupplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/viewsupplier/:Supplier_id"
                              element={
                                <ProtectedRoute>
                                  <ViewSupplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account"
                              element={
                                <ProtectedRoute>
                                  <Accounts />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account/addaccount"
                              element={
                                <ProtectedRoute>
                                  <AddAccount />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account/editaccount/:Account_id"
                              element={
                                <ProtectedRoute>
                                  <EditAccount />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account/viewaccount/:Account_id"
                              element={
                                <ProtectedRoute>
                                  <ViewAccount />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales"
                              element={
                                <ProtectedRoute>
                                  <Sales />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/addSaleOrder/:store_id"
                              element={
                                <ProtectedRoute>
                                  <AddSaleOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/editSaleOrder/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <EditSaleOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/viewSaleOrder/:so_id"
                              element={
                                <ProtectedRoute>
                                  <ViewSaleOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/Shipment/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <Shipment />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/Purchase"
                              element={
                                <ProtectedRoute>
                                  <Purchase />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/addPurchaseOrder/:store_id"
                              element={
                                <ProtectedRoute>
                                  <AddPurchaseOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/editPurchaseOrder/:po_ids"
                              element={
                                <ProtectedRoute>
                                  <EditPurchaseOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/viewPurchaseOrder/:po_id"
                              element={
                                <ProtectedRoute>
                                  <ViewPurchaseOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/Receive_log/:po_ids"
                              element={
                                <ProtectedRoute>
                                  <Receive_Log />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/sales/addEstimation/:store_id"
                              element={
                                <ProtectedRoute>
                                  <AddEstimation />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/editEstimation/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <EditEstimation />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/viewEstimation/:so_id"
                              element={
                                <ProtectedRoute>
                                  <ViewEstimation />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/sales/ConvertEstimate/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <ConvertEstimate />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/receipt"
                              element={
                                <ProtectedRoute>
                                  <Receipt />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/receipt/AddReceipt"
                              element={
                                <ProtectedRoute>
                                  <AddReceipt />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/receipt/EditReceipt/:r_id"
                              element={
                                <ProtectedRoute>
                                  <EditReceipt />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/payment"
                              element={
                                <ProtectedRoute>
                                  <Payment />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/payment/AddPayment"
                              element={
                                <ProtectedRoute>
                                  <AddPayment />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/payment/EditPayment/:r_id"
                              element={
                                <ProtectedRoute>
                                  <EditPayment />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/journal"
                              element={
                                <ProtectedRoute>
                                  <Journal />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/journal/AddJournal"
                              element={
                                <ProtectedRoute>
                                  <AddJournal />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/journal/EditJournal/:r_id"
                              element={
                                <ProtectedRoute>
                                  <EditJournal />
                                </ProtectedRoute>
                              }
                            />

                            {/* Apps */}
                            {/* <Route path='/kanban' element={<Kanban />} /> */}
                            {/* <Route path='/editor' element={<Editor />} /> */}
                            {/* <Route path='/calendar' element={<Calendar />} /> */}
                            {/* <Route path='/color-picker' element={<ColorPicker />} /> */}

                            {/* Charts */}
                            {/* <Route path='/line' element={<Line />} /> */}
                            {/* <Route path='/area' element={<Area />} /> */}
                            {/* <Route path='/bar' element={<Bar />} /> */}
                            {/* <Route path='/pie' element={<Pie />} /> */}
                            {/* <Route path='/financial' element={<Financial />} /> */}
                            {/* <Route path='/color-mapping' element={<ColorMapping />} /> */}
                            {/* <Route path='/pyramid' element={<pyramid />} /> */}
                            {/* <Route path='/stacked' element={<Stacked />} /> */}
                          </Routes>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              // ) : (
              //   <Navigate to="/login" />
              // )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
