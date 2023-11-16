import { useState } from "react";
import { useAuth } from "../contexts/authentication.jsx";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    register(data);
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-grey-100  ">
      <div className="w-[614px] h-[600px]  bg-utils-white flex flex-col justify-center items-center rounded-lg border border-grey-200">
        <h1 className="font-Prompt text-[32px] font-[500] leading-[48px] text-blue-950">
          Register Form
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className=" flex flex-col font-Prompt"
        >
          <div className="flex flex-col w-[400px] my-5">
            Username
            <input
              className="border rounded-md p-2 w-[100%] border-grey-300"
              type="text"
              id="username"
              name="username"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              required
            />
          </div>
          <div className="flex flex-col w-[400px] my-5">
            Password
            <input
              className="border rounded-md p-2 w-[100%]"
              type="text"
              id="password"
              name="password"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-[16px] font-[500] font-Prompt leading-[24px] bg-blue-600 py-[10px] px-[24px] rounded-[8px]  mt-8 hover:drop-shadow-md"
          >
            <p className="py-[10px] text-white">Register</p>
          </button>
        </form>
        <div className="font-Prompt text-[16px] text-grey-700 mt-10">
          <span
            className="underline text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
