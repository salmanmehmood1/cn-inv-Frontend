import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../contexts/Utils";
import {
  EditProductApi,
  GetAllBrands,
  GetAllCategories,
  GetAllUnits,
  GetProductById,
  GetProductImagesById,
  EditProductImagesById,
  AddProductImage,
  GetProductVideoById,
  CheckProdNameCodeExist,
} from "../api/Api";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles/AddProduct.css";

const EditProduct = () => {
  const { currentColor } = useStateContext();
  let param = useParams();
  const fileInputRef = useRef(null);
  const fileInputImgRef1 = useRef(null);
  const fileInputImgRef2 = useRef(null);
  const fileInputImgRef3 = useRef(null);
  const fileInputImgRef4 = useRef(null);

  const [Unit, setUnit] = useState("select");
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoBlob1, setVideoBlob1] = useState(null);
  const [videoBlob2, setVideoBlob2] = useState(null);
  const [pexist, setpexist] = useState("");
  const [Category, setCategory] = useState("select");
  const [Brand, setBrand] = useState("select");
  const [loading, setLoading] = useState(false);
  const [DisplayProduct, setDisplayProduct] = useState(0);
  const [ActiveProduct, setActiveProduct] = useState(0);
  const [ProductImage, setProductImage] = useState("");
  const [getunits, setUnits] = useState([]);
  const [getbrands, setbrands] = useState([]);
  const [getcategories, setCategories] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [Details, setDetails] = useState("");
  const [UnitPrice, setUnitPrice] = useState("");
  const [Code, setCode] = useState("");
  const [Name, setName] = useState("");

  const [Code1, setCode1] = useState("");
  const [Name1, setName1] = useState("");
  const [Discount, setDiscount] = useState("");
  const [ProdImage, setProdImage] = useState("");
  const [Flag, setFlag] = useState(0);
  const [imgExist, setimgExist] = useState(0);
  const [ValError, setValError] = useState([]);
  const [flag, setflag] = useState(false);
  const [vflag, setvflag] = useState(0);
  const [visibleCard, setVisibleCard] = useState(1);
  const [images, setImages] = useState([
    // { id: 1, file: null, preview: null },
    // { id: 2, file: null, preview: null },
    // { id: 3, file: null, preview: null },
    // { id: 4, file: null, preview: null },
  ]);

  const navigate = useNavigate();

  const validName1 = (name, ii) => {
    const updatedErrors = [...ValError];
    if (name.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (validateName(name)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const handleClickRemoveVideo = () => {
    setVideoBlob(null);
    if (videoBlob1) {
      setVideoBlob1(null);
      setvflag(1);
    }
    console.log(fileInputRef);
    fileInputRef.current.value = "";
  };

  const handleClickRemoveImage = (id) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, file: null, preview: null } : image
      )
    );
    if (id === 1) {
      fileInputImgRef1.current.value = "";
    }
    if (id === 2) {
      fileInputImgRef2.current.value = "";
    }
    if (id === 3) {
      fileInputImgRef3.current.value = "";
    }
    if (id === 4) {
      fileInputImgRef4.current.value = "";
    }
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    // console.log("heh");
    if (file.size > 31457280) {
      alert("Video file max size is 30mb");
      return;
    }
    setvflag(1);
    if (file) {
      setLoading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the result to a Blob
        const blob = new Blob([reader.result], { type: file.type });
        setVideoBlob(file);
        setLoading(false);
        if (file) {
          setflag(false);
        } else {
          setVideoBlob(null);
        }
      };

      // Read the file as a binary string
      reader.readAsArrayBuffer(file);
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

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleChangeDetails = (e) => {
    setDetails(e.target.value);
  };
  const handleChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };
  const handleChangeUnitPrice = (e) => {
    setUnitPrice(e.target.value);
  };

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[4] = "";
      setValError(updatedErrors);
    }
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[5] = "";
      setValError(updatedErrors);
    }
  };
  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[6] = "";
      setValError(updatedErrors);
    }
  };
  const handleChangeDisplay = (e) => {
    setDisplayProduct((prev) => (prev === 0 ? 1 : 0));
  };
  const handleChangeActive = (e) => {
    setActiveProduct((prev) => (prev === 0 ? 1 : 0));
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/product");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange1 = (e) => {
    setProdImage("");
    setFlag(1);
    setimgExist(1);
    const file = e.target.files[0];
    setProductImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e, imageID) => {
    console.log(images);
    const file = e.target.files[0];

    const updatedImg = images.map((image) =>
      image.id === imageID
        ? {
            ...image,
            file,
            preview: file ? URL.createObjectURL(file) : null,
          }
        : image
    );
    console.log(updatedImg);
    setImages(updatedImg);

    if (imageID === visibleCard) {
      const nextVisibleCard = Math.min(visibleCard + 1, images.length);
      setVisibleCard(nextVisibleCard);
    }
  };

  const insertImage1 = async (imgg) => {
    // imgg.preventDefault();
    const response = await AddProductImage(param.p_id, imgg);
    if (response.status === 200) {
    } else {
      alert("Product image failed to add.");
    }
  };

  const insertImage = async (imgg, product_idss) => {
    // imgg.preventDefault();
    const response = await EditProductImagesById(product_idss, imgg);
    if (response.status === 200) {
    } else {
      alert("Product image failed to update.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValError([]);
    const updatedErrors = [...ValError];

    if (Name === "") {
      updatedErrors[0] = "Please enter product name.";
      setValError(updatedErrors);
      return;
    }
    if (Name !== "") {
      if (validName1(Name, 0) === false) {
        return;
      }
    }
    updatedErrors[0] = "";

    if (Code === "") {
      updatedErrors[1] = "Please enter product code.";
      setValError(updatedErrors);
      return;
    }
    if (Code !== "") {
      if (ValidText1(Code, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";
    if (Name1 != Name) {
      if (pexist[0].name === 1) {
        updatedErrors[0] = "Product name must be unique.";
        setValError(updatedErrors);
        return;
      }
      updatedErrors[0] = "";
    }
    if (Code1 != Code) {
      if (pexist[0].code === 1) {
        updatedErrors[1] = "Product code must be unique.";
        setValError(updatedErrors);
        return;
      }
      updatedErrors[1] = "";
    }

    if (UnitPrice === "") {
      updatedErrors[2] = "Please enter unit price.";
      setValError(updatedErrors);
      return;
    }
    if (UnitPrice <= 0) {
      updatedErrors[2] = "Price must be greater than 0.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[2] = "";

    if (Discount === "") {
      updatedErrors[3] = "Please enter discount.";
      setValError(updatedErrors);
      return;
    }
    if (Discount < 0) {
      updatedErrors[3] = "Discount must be 0 or greater.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[3] = "";

    if (Details !== "") {
      if (ValidText1(Details, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";

    if (Unit === "select") {
      updatedErrors[4] = "Please select unit.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[4] = "";

    if (Brand === "select") {
      updatedErrors[5] = "Please select brand.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[5] = "";

    if (Category === "select") {
      updatedErrors[6] = "Please select category.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[6] = "";

    console.log("ye " + ProdImage);
    const unit_id = getunits.find((item) => item.name === Unit);
    const brand_id = getbrands.find((item) => item.name === Brand);
    const category_id = getcategories.find((item) => item.name === Category);

    var vid = null;
    if (videoBlob) {
      vid = videoBlob;
    }
    // console.log(vid);

    const response = await EditProductApi(
      param.p_id,
      Code,
      Name,
      Details,
      UnitPrice,
      Discount,
      unit_id.unit_id,
      category_id.category_id,
      brand_id.brand_id,
      DisplayProduct,
      ActiveProduct,
      vid,
      vflag
    );
    console.log(response, "Response");
    console.log(images);
    if (response.status === 200) {
      images.forEach((element) => {
        if (element.image_id === null && element.preview !== null) {
          insertImage1(element.file);
        } else if (
          element.image_id === null &&
          element.file === null &&
          element.preview === null &&
          element.image === null
        ) {
        } else if (element.file) {
          insertImage(element.file, element.image_id);
        }
      });
      // }
      navigate("/product");
      alert("Product updated successfully.");
    } else {
      alert("Product failed to update.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      await CheckProdNameCodeExist(Name, Code)
        .then((resp) => {
          console.log(resp.data);
          setpexist(resp.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [Code, Name]);
  useEffect(() => {
    async function fetchData() {
      GetAllUnits()
        .then((resp) => {
          setUnits(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      GetAllBrands()
        .then((resp) => {
          setbrands(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      GetAllCategories()
        .then((resp) => {
          setCategories(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      console.log(param.p_id);
      const resp1 = GetProductById(param.p_id);
      resp1
        .then(function (result) {
          console.log(result.data);
          setName(result.data[0].name);
          setCode(result.data[0].code);
          setName1(result.data[0].name);
          setCode1(result.data[0].code);
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
          setvflag(0);
          // setVideoBlob2(result.data[0].video);
        })
        .catch((err) => {
          console.log(err.message);
        });

      //   const resp2 = GetProductVideoById(param.p_id);
      // resp2
      //   .then(function (result) {
      //     console.log(result.data);
      //     setVideoBlob("data:video/mp4;base64," + result.data[0].video.Blob());

      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
      //   const resp2 = GetProductImagesById(param.p_id);
      // resp2
      //   .then(function (result) {
      //     setProdImage(result.data[0].image);
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });

      GetProductImagesById(param.p_id).then(function (result) {
        console.log(result.data);
        if (result.data) {
          const productimg = result.data.map((item) => ({
            id: item.image_ids,
            file: null,
            preview: "data:image/jpeg;base64," + item.image,
            image_id: item.image_id,
            image: item.image,
            remove: "❌",
          }));
          const emptyImageCards = Array.from(
            { length: Math.max(0, 4 - productimg.length) },
            (_, index) => ({
              id: productimg.length + index + 1,
              file: null,
              preview: null,
              image_id: null,
              image: null,
              remove: "❌",
            })
          );
          console.log(productimg);
          setImages([...productimg, ...emptyImageCards]);
          setVisibleCard(productimg.length + 1);
        }
      });
    }
    fetchData();
  }, []);
  return (
    <div className="m-2 md:m-2 bg-white rounded-2xl">
      <div className="user-body">
        <Header title="EDIT PRODUCT" />
        <div className="offset-lg-3 col-md-6">
          <form className="container-product">
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
                        onChange={handleChangeName}
                        value={Name}
                        placeholder="Name"
                        className="input"
                        style={{ marginTop: "10px" }}
                        onBlur={(e) => validName1(e.target.value, 0)}
                      />
                      <span style={{ color: "red", fontSize: "26px" }}>
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
                      <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                        Code:{" "}
                      </label>
                      <br />
                      <input
                        required
                        type="text"
                        name="Code"
                        onChange={handleChangeCode}
                        value={Code}
                        placeholder="Code"
                        className="input"
                        style={{ marginTop: "10px" }}
                        onBlur={(e) => ValidText1(e.target.value, 1)}
                      />
                      <span style={{ color: "red", fontSize: "26px" }}>
                        {` `}*
                      </span>
                      {ValError[1] && (
                        <p style={{ color: "red" }}>{ValError[1]}</p>
                      )}
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
                        min="0"
                        defaultValue={0}
                        step="1.00"
                        name="UnitPrice"
                        onChange={handleChangeUnitPrice}
                        value={UnitPrice}
                        placeholder="Price"
                        className="input"
                        style={{ marginTop: "10px" }}
                      />
                      <span style={{ color: "red", fontSize: "26px" }}>
                        {` `}*
                      </span>
                      {ValError[2] && (
                        <p style={{ color: "red" }}>{ValError[2]}</p>
                      )}
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
                        min="0"
                        defaultValue={0}
                        step="1.00"
                        name="Discount"
                        onChange={handleChangeDiscount}
                        value={Discount}
                        placeholder="Discount"
                        className="input"
                        style={{ marginTop: "10px" }}
                      />
                      <span style={{ color: "red", fontSize: "26px" }}>
                        {` `}*
                      </span>
                      {ValError[3] && (
                        <p style={{ color: "red" }}>{ValError[3]}</p>
                      )}
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
                        placeholder="Description"
                        id="noteTextarea"
                        value={Details}
                        onChange={handleChangeDetails}
                        rows="4"
                        className="textarea"
                        style={{ marginTop: "10px", width: "70%" }}
                        onBlur={(e) => ValidText1(e.target.value, 7)}
                      />
                      {ValError[7] && (
                        <p style={{ color: "red" }}>{ValError[7]}</p>
                      )}
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
                      <select
                        id="UnitSelect"
                        style={{
                          width: "80%",
                          borderWidth: "2px",
                          borderStyle: "solid",
                          padding: "4px",
                          marginTop: "10px",
                        }}
                        value={Unit}
                        onChange={handleChangeUnit}
                      >
                        <option value="select"> select </option>
                        {getunits.map((item) => (
                          <option key={item.unit_id}>{item.name}</option>
                        ))}
                      </select>
                      <span style={{ color: "red", fontSize: "26px" }}>
                        {` `}*
                      </span>

                      {ValError[4] && (
                        <p style={{ color: "red" }}>{ValError[4]}</p>
                      )}
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
                      <select
                        id="BrandSelect"
                        style={{
                          width: "80%",
                          borderWidth: "2px",
                          borderStyle: "solid",
                          padding: "8px",
                          marginTop: "10px",
                        }}
                        value={Brand}
                        onChange={handleChangeBrand}
                      >
                        <option value="select"> select </option>

                        {getbrands.map((item) => (
                          <option key={item.brand_id}>{item.name}</option>
                        ))}
                      </select>
                      <span style={{ color: "red", fontSize: "26px" }}>
                        {` `}*
                      </span>

                      {ValError[5] && (
                        <p style={{ color: "red" }}>{ValError[5]}</p>
                      )}
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
                      <select
                        id="CategorySelect"
                        style={{
                          width: "80%",
                          borderWidth: "2px",
                          borderStyle: "solid",
                          padding: "8px",
                          marginTop: "10px",
                        }}
                        value={Category}
                        onChange={handleChangeCategory}
                      >
                        <option value="select"> select </option>
                        {getcategories.map((item) => (
                          <option key={item.category_id}>{item.name}</option>
                        ))}
                      </select>
                      <span style={{ color: "red", fontSize: "26px" }}>
                        {` `}*
                      </span>

                      {ValError[6] && (
                        <p style={{ color: "red" }}>{ValError[6]}</p>
                      )}
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ fontWeight: "Bold", fontSize: "18px" }}>
                        <input
                          type="checkbox"
                          value="ActiveProduct"
                          checked={ActiveProduct === 1}
                          onChange={handleChangeActive}
                        />
                        {`   `} Active Product
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
                          checked={DisplayProduct === 1}
                          onChange={handleChangeDisplay}
                        />
                        {`   `} Display Product
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
                              {loading && <p>Loading...</p>}
                              {flag && (
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
                              )}
                              {videoBlob && (
                                <div class="wrapper-product">
                                  <video
                                    controls
                                    src={URL.createObjectURL(videoBlob)}
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
                          </div>
                          <div class="article-product-card">
                            <div>
                              <button
                                style={{ paddingLeft: "220px" }}
                                type="button"
                                onClick={handleClickRemoveVideo}
                              >
                                ❌
                              </button>
                              <div className="product-image-label">
                                <label htmlFor={`videoInput`}>{`Video:`}</label>
                              </div>
                              <div className="product-image-input">
                                <input
                                  ref={fileInputRef}
                                  className="flex justify-left"
                                  type="file"
                                  accept="video/*"
                                  onChange={handleVideoFileChange}
                                />
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
                        {images.map((image) => (
                          <div
                            key={image.id}
                            className="card-product"
                            style={{
                              width: "500px",
                              height: "152px",
                              display: "flex",
                              display:
                                visibleCard >= image.id ? "flex" : "none",
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
                              <button
                                style={{
                                  paddingLeft: "260px",
                                }}
                                type="button"
                                onClick={(e) =>
                                  handleClickRemoveImage(image.id)
                                }
                              >
                                {image.remove}
                              </button>
                              <div>
                                <div className="product-image-label">
                                  <label
                                    htmlFor={`imageInput${image.id}`}
                                  >{`Image ${image.id}:`}</label>
                                </div>
                                <div className="product-image-input">
                                  {image.id === 1 && (
                                    <input
                                      ref={fileInputImgRef1}
                                      className="flex justify-left"
                                      type="file"
                                      id={`imageInput${image.id}`}
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageChange(e, image.id)
                                      }
                                    />
                                  )}
                                  {image.id === 2 && (
                                    <input
                                      ref={fileInputImgRef2}
                                      className="flex justify-left"
                                      type="file"
                                      id={`imageInput${image.id}`}
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageChange(e, image.id)
                                      }
                                    />
                                  )}
                                  {image.id === 3 && (
                                    <input
                                      ref={fileInputImgRef3}
                                      className="flex justify-left"
                                      type="file"
                                      id={`imageInput${image.id}`}
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageChange(e, image.id)
                                      }
                                    />
                                  )}
                                  {image.id === 4 && (
                                    <input
                                      ref={fileInputImgRef4}
                                      className="flex justify-left"
                                      type="file"
                                      id={`imageInput${image.id}`}
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageChange(e, image.id)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
            text="Update"
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
    </div>
  );
};

export default EditProduct;
