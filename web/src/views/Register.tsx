import InputText from "../components/InputText";
import logo from "../assets/logo.svg";
import { style } from "../style/LoginRegister.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { col1, col2 } from "../theme/colors";
import request from "../request";
import { useState } from "react";
import { baseServerUrl } from "../config";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

function Register() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Email is not valid");
      return;
    }
    if (password !== comfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    var data: any;
    var userId: string;
    var token: string;

    try {
      data = await request(`${baseServerUrl}/user/register/`, "POST", {
        username: username,
        email: email,
        password: password,
      });

      userId = data.id;
      token = data.token;

      if (authContext !== null) {
        authContext.setAuth({ userId, token });
      } else {
        throw new Error("AuthContext is null");
      }
    } catch (error) {
      alert("An error occured: " + error);
      return;
    }
    navigate("/home");
    console.log(data);
  }

  return (
    <main style={style.main}>
      <div style={style.contentDiv}>
        <img style={style.logo} src={logo} alt="Logo FindMyMates" />
        <p style={style.desc}>
          Create a account with your email, your username and a secure password.
        </p>

        <form style={style.form} onSubmit={handleSubmit}>
          <div style={style.formField}>
            <label style={{ color: col2 }} htmlFor="">
              Username
            </label>
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={style.formField}>
            <label style={{ color: col2 }} htmlFor="">
              Email
            </label>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={style.formField}>
            <label style={{ color: col2 }} htmlFor="">
              Password
            </label>
            <InputText
              password={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={style.formField}>
            <label style={{ color: col2 }} htmlFor="">
              Comfirm Password
            </label>
            <InputText
              password={true}
              value={password}
              onChange={(e) => setComfirmPassword(e.target.value)}
            />
          </div>
          <Button
            text="Sign Up"
            style={{
              fontSize: "1rem",
              padding: "0.75rem 7rem",
              marginBottom: "0.2rem",
              marginTop: "0.5rem",
            }}
            type="submit"
          />
          <p style={{ color: col2 }}>
            Have already an account ?{" "}
            <a href="/login" style={{ color: col1 }}>
              Sign in
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
