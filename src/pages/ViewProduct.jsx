import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { GetProductById, GetProductImagesById } from "../api/Api";
import { customersData } from "../data/dummy";
import { Header, Button } from "../components";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/AddProduct.css";

const ViewProduct = () => {
  const { currentColor } = useStateContext();
  let param = useParams();
  const [Unit, setUnit] = useState("");
  const [Category, setCategory] = useState("");
  const [Brand, setBrand] = useState("");
  const [DisplayProduct, setDisplayProduct] = useState(0);
  const [ActiveProduct, setActiveProduct] = useState(0);
  const [Image, setImage] = useState("");
  const [videoBlob1, setVideoBlob1] = useState(null);
  const [Details, setDetails] = useState("");
  const [UnitPrice, setUnitPrice] = useState("");
  const [Code, setCode] = useState("");
  const [Name, setName] = useState("");
  const [Discount, setDiscount] = useState("");
  const [flag, setflag] = useState(false);
  const [flag1, setflag1] = useState(true);
  const [images, setImages] = useState([
    //  { id: 1, file: null, preview: null },
    // { id: 2, file: null, preview: null },
    // { id: 3, file: null, preview: null },
    // { id: 4, file: null, preview: null },
  ]);

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/product");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(param.p_id);
    const resp1 = GetProductById(param.p_id);
    resp1
      .then(function (result) {
        console.log(result.data);
        setName(result.data[0].name);
        setCode(result.data[0].code);
        setDetails(result.data[0].details);
        setDiscount(result.data[0].discount);
        setUnitPrice(result.data[0].unit_price);
        setDiscount(result.data[0].discount);
        setDisplayProduct(result.data[0].display_product);
        setActiveProduct(result.data[0].active_product);
        setUnit(result.data[0].unit);
        setBrand(result.data[0].brand);
        setCategory(result.data[0].category);
        if (result.data[0].video !== null) {
          setflag(true);
        }
        setVideoBlob1("data:video/mp4;base64," + result.data[0].video);
        //     setStoreDetail(result.data);
        //   console.log("hehhe" + result.data[0].name);
      })
      .catch((err) => {
        console.log(err.message);
      });

    GetProductImagesById(param.p_id).then(function (result) {
      console.log(result.data);
      if (result.data) {
        setflag1(false);
        const productimg = result.data.map((item) => ({
          id: item.image_ids,
          file: null,
          preview: "data:image/jpeg;base64," + item.image,
          image_id: item.image_id,
          image: item.image,
        }));
        // const emptyImageCards = Array.from(
        //   { length: Math.max(0, 4 - productimg.length) },
        //   (_, index) => ({
        //     id: productimg.length + index + 1,
        //     file: null,
        //     preview: null,
        //     image_id: null,
        //     image: null,
        //   })
        // );
        console.log(productimg);
        setImages([...productimg]);
        // setVisibleCard(productimg.length + 1);
      }
    });
  }, []);

  return (
    <div className="m-2 md:m-2 bg-white rounded-2xl">
      <div className="user-body">
        <Header title="VIEW PRODUCT" />
        <div className="offset-lg-3 col-lg-6">
          <form className="container-product">
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container-product">
                <div className="flex justify-left">
                  <div class="article-product">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          Name:{" "}
                        </label>
                        <br />
                        <input
                          required
                          type="text"
                          name="Name"
                          placeholder="name"
                          className="input"
                          value={Name}
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          Code:{" "}
                        </label>
                        <br />
                        <input
                          required
                          type="text"
                          name="Code"
                          placeholder="Code"
                          value={Code}
                          className="input"
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          Unit Price:{" "}
                        </label>
                        <br />
                        <input
                          type="number"
                          step="1.00"
                          name="UnitPrice"
                          value={UnitPrice}
                          placeholder="Price"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          Discount:{" "}
                        </label>
                        <br />
                        <input
                          type="number"
                          step="0.01"
                          name="Discount"
                          value={Discount}
                          placeholder="Discount"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          Description:{" "}
                        </label>
                        <br />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          placeholder="Note "
                          id="noteTextarea"
                          value={Details}
                          //onChange={handleChangeNote}
                          rows="4"
                          className="textarea"
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>

                    <br />
                  </div>
                  <div class="article-product">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "Bold", fontSize: "18px" }}
                          htmlFor="UnitSelect"
                        >
                          Unit:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="Unit"
                          value={Unit}
                          placeholder="Unit"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "Bold", fontSize: "18px" }}
                          htmlFor="BrandSelect"
                        >
                          Brand:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="Brand"
                          value={Brand}
                          placeholder="Brand"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          style={{ fontWeight: "Bold", fontSize: "18px" }}
                          htmlFor="CategorySelect"
                        >
                          Category:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="Category"
                          value={Category}
                          placeholder="Category"
                          className="input"
                          readOnly
                          style={{ marginTop: "10px", width: "70%" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          <input
                            type="checkbox"
                            value="ActiveProduct"
                            checked={ActiveProduct}
                            //value={ActiveProduct}
                            //onChange={handleChangeActive}
                          />
                          {`  `}Active Product
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                          <input
                            type="checkbox"
                            value="DisplayProduct"
                            checked={DisplayProduct}
                            //onChange={handleChangeDisplay}
                          />
                          {`  `}Display Product
                        </label>
                      </div>
                    </div>
                    <br />

                    <div>
                      <div
                      // className="card-product"
                      // style={{
                      //   display: "flex",
                      //   marginTop: "30px",
                      // }}
                      >
                        <div>
                          <div
                            className="card-product01"
                            style={{
                              width: "440px",
                              height: "182px",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div class="article-product-card">
                              <div>
                                {flag ? (
                                  <div>
                                    {videoBlob1 && (
                                      <div class="wrapper-product">
                                        <video
                                          controls
                                          src={videoBlob1}
                                          type="video/mp4"
                                          className="box-product"
                                          alt={`Product Video`}
                                          style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    <h1>No Video</h1>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div class="article-product-card">
                              <div>
                                <div className="product-image-label">
                                  <label
                                    htmlFor={`videoInput`}
                                  >{`Video:`}</label>
                                </div>
                                <div className="product-image-input">
                                  {/* <input
                                    className="flex justify-left"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoFileChange}
                                  /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="article-container-product"
                    style={{ paddingLeft: "30px" }}
                  >
                    <div className="article-product1">
                      <div
                        className="card-product"
                        style={{
                          display: "flex",
                          marginTop: "30px",
                        }}
                      >
                        <div className="article-product1">
                          {images.length !== 0 ? (
                            <div>
                              {images.map((image) => (
                                <div
                                  key={image.id}
                                  className="card-product"
                                  style={{
                                    width: "500px",
                                    height: "152px",
                                    display: "flex",
                                    // display:
                                    //   visibleCard >= image.id ? "flex" : "none",
                                    flexDirection: "row",
                                  }}
                                >
                                  <div className="article-product-card">
                                    <div>
                                      {image.preview && (
                                        <div className="wrapper-product">
                                          <img
                                            src={image.preview}
                                            className="box-product"
                                            alt={`Product ${image.id}`}
                                            style={{
                                              maxWidth: "100%",
                                              maxHeight: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="article-product-card">
                                    <div>
                                      <div className="product-image-label">
                                        <label
                                          htmlFor={`imageInput${image.id}`}
                                        >{`Image ${image.id}:`}</label>
                                      </div>
                                      <div className="product-image-input">
                                        {/* <input
                                    className="flex justify-left"
                                    type="file"
                                    id={`imageInput${image.id}`}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageChange(e, image.id)
                                    }
                                  /> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              <div
                              // className="card-product"
                              // style={{
                              //   display: "flex",
                              //   marginTop: "30px",
                              // }}
                              >
                                <div
                                  // key={image.id}
                                  className="card-product"
                                  style={{
                                    width: "500px",
                                    height: "152px",
                                    display: "flex",
                                    // display:
                                    //   visibleCard >= image.id ? "flex" : "none",
                                    flexDirection: "row",
                                  }}
                                >
                                  <h1> No Image Preview</h1>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                </div>
              </div>
            </div>
          </form>
          {/* <button >Submit</button> */}
        </div>
      </div>
      <div class="article-container-product">
        <div style={{ paddingLeft: "800px" }}>
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
    </div>
  );
};

export default ViewProduct;
