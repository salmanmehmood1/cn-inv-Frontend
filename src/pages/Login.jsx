import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { Ecommerce } from "../pages";
import { ContextProvider } from "../contexts/ContextProvider";
import { LoginApi } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import default_img from "../data/username_icon.png";
import default_img1 from "../data/password_icon.png";
import default_img2 from "../data/background-img.jpg";
import default_img3 from "../data/logo-CN.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [ValError, setValError] = useState([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    console.log("hello");
    setPasswordVisible(!passwordVisible);
    // setPassword(password);
  };

  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setPasswordVisible(false);
    setValError([]);
    const updatedErrors = [...ValError];
    if (username === "") {
      updatedErrors[0] = "Please enter username.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";
    if (password === "") {
      updatedErrors[1] = "Please enter password.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";
    const response = await LoginApi(username, password);

    if (response.status === 200) {
      if (response.data[0].user_id) {
        const userData = {
          user_id: response.data[0].user_id,
          role: response.data[0].role_desc,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        return navigate("/Overview");
      }
      return navigate("/login");
    } else {
      updatedErrors[2] = "Incorrect Username / Password.";
      setValError(updatedErrors);
      return console.log("Login Failed");
    }
  };
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      const userData = {
        user_id: null,
        role: null,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      return navigate("/login");
    }

    const userData1 = JSON.parse(userDataString);
    if (!userData1) {
      // window.location.reload();
      return navigate("/login");
    }
  }, []);

  return (
    <div
      className="user-body"
      style={{
        marginTop: "90px",
        paddingLeft: "240px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "900px", width: "1900px" }}>
        <div class="article-container-login">
          <div className="flex justify-center">
            <div class="article-login">
              <form onSubmit={handleLogin}>
                <Card
                  style={{
                    height: "840px",
                    width: "600px",
                    margin: "1px",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ margin: "10px", paddingLeft: "50px" }}></div>
                  <div style={{ height: "130px" }}>
                    {" "}
                    <img
                      src={default_img3}
                      alt="Description"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div style={{ paddingLeft: "200px", marginTop: "50px" }}>
                    <label
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      Sign In
                    </label>
                  </div>

                  <div className="col-lg-12" style={{ paddingLeft: "40px" }}>
                    <div class="input-container">
                      <div className="form-group" style={{ marginTop: "60px" }}>
                        <div class="input-icon">
                          <img
                            src={default_img}
                            alt="Email Icon"
                            width="30px"
                          ></img>
                        </div>

                        <input
                          class="input-field"
                          // required
                          type="text"
                          value={username}
                          name="name"
                          placeholder="Username"
                          autoFocus
                          style={{
                            width: "470px",
                            height: "60px",
                            fontSize: "22px",
                          }}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    {ValError[0] && (
                      <card style={{ color: "red", fontSize: "18px" }}>
                        {ValError[0]}
                      </card>
                    )}
                  </div>

                  <div className="col-lg-12" style={{ paddingLeft: "40px" }}>
                    <div class="input-container">
                      <div className="form-group" style={{ marginTop: "44px" }}>
                        <span style={{ position: "relative" }}>
                          <div class="input-icon">
                            <img
                              src={default_img1}
                              alt="Password Icon"
                              width="30px"
                            ></img>
                          </div>
                          <button
                            className="password-toggle-button"
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "20px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              zIndex: "2",
                            }}
                          >
                            {passwordVisible ? (
                              <div style={{ fontSize: "24px" }}>
                                <FaEye />
                              </div>
                            ) : (
                              <div style={{ fontSize: "24px" }}>
                                <FaEyeSlash />
                              </div>
                            )}
                          </button>

                          <input
                            class="input-field"
                            // required
                            type={passwordVisible ? "text" : "password"}
                            name="name"
                            value={password}
                            placeholder="Password"
                            style={{
                              width: "470px",
                              height: "60px",
                              fontSize: "22px",
                            }}
                            onChange={onchangePassword}
                          />
                        </span>
                      </div>
                    </div>
                    {ValError[1] && (
                      <card style={{ color: "red", fontSize: "18px" }}>
                        {ValError[1]}
                      </card>
                    )}
                    <div
                      style={{
                        paddingLeft: "314px",
                        marginTop: "20px",
                        fontSize: "18px",
                        color: "#FF7A33",
                      }}
                    >
                      <a>Forget Password ? </a>
                    </div>
                  </div>
                  <div style={{ paddingLeft: "130px", marginTop: "20px" }}>
                    {ValError[2] && (
                      <card style={{ color: "red", fontSize: "18px" }}>
                        {ValError[2]}
                      </card>
                    )}
                  </div>

                  <div style={{ paddingTop: "60px", paddingLeft: "120px" }}>
                    <button
                      style={{
                        padding: "14px",
                        backgroundColor: "#FF7A33",
                        color: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        margin: "3px",
                        fontSize: "30px",
                        fontWeight: "bold",
                        width: "280px",
                        height: "70px",
                      }}
                      color="white"
                      borderRadius="10px"
                      text="Login"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </Card>
              </form>
            </div>
            <div class="article-login">
              <div
                style={{
                  height: "840px",
                  width: "1250px",
                }}
              >
                <img
                  src={default_img2}
                  alt="Description"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: "30%",
                    // transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      fontSize: "60px",
                      fontWeight: "bold",
                      paddingLeft: "400px",
                    }}
                  >
                    Welcome to CodeNexus
                  </div>

                  <div
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontFamily: "-moz-initial",
                      paddingLeft: "500px",
                    }}
                  >
                    <label>Online Inventory Management System</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
