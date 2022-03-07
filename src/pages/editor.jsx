import Layout from "../components/layout";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Console from "../components/Console";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Alert from "../components/Alert";

let socket;

export default function Page() {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const { pid } = useParams();

  const [alertMessage, setAlertMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState({ stdout: "" });
  const [members, setMembers] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [language, setLanguage] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const onChange = (updatedCode) => {
    try {
      setCode(updatedCode);
      socket.emit("code-change", updatedCode);
    } catch (e) {
      setAlertMessage("Failed to update code");
    }
  };

  const initializeSocket = async () => {
    try {
      let queryParams = "?roomId=" + pid;
      let res = await fetch(serverURL + "api/room/info" + queryParams);
      let data = await res.json();

      socket = io(serverURL);

      socket.on("connect", () => {
        console.log("STATUS: connected");
        socket.emit("join-room", { roomId: pid, user: { name: navigator.userAgent, timestamp: new Date().toString() } });
        setIsConnected(true);
        socket.on("update-code", (value) => setCode(value));
        socket.on("run-code", ({ output }) => setOutput(output));
      });

      if (data.success) {
        setMembers(data.info.members);
        setCode(data.info.code);
        setLanguage(data.info.language);
        setRoomId(data.info.roomId);
      } else {
        alert(data.message);
        setModalMessage("Couldn't connect to the room 🙁");
      }
      setIsLoaded(true);
    } catch (e) {
      setIsLoaded(true);
      setModalMessage("Can't connect right now. Try again later.");
    }
  };

  const onRun = async () => {
    console.log("RUNNING CODE");

    try {
      let body = {
        name: "main",
        content: code,
        language: language,
      };

      let res = await fetch(serverURL + "api/code/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data = await res.json();

      setOutput(data);

      socket.emit("run-code", {
        output: data,
      });
    } catch (e) {
      setAlertMessage("Failed to execute code");
    }
  };

  const onReset = () => {
    try {
      setCode("");
      setOutput({ stdout: "" });
      socket.emit("code-change", "");
    } catch (e) {
      setAlertMessage("Failed to reset code");
    }
  };

  useEffect(() => {
    if (pid) initializeSocket();
    return () => socket.removeListeners();
  }, [pid]);

  if (!isLoaded) {
    return (
      <div className="full-screen">
        <Loader size={50} />
      </div>
    );
  }

  if (modalMessage) {
    return (
      <Layout>
        <div className="max-w-600 mx-auto">
          <h1>Connection Failure</h1>
          <p>{modalMessage}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <Alert
          value={alertMessage}
          show={Boolean(alertMessage)}
          type="danger"
          onClick={() => setAlertMessage("")}
        />
        <h1>
          {language} room {roomId}
        </h1>
        <p>
          Connected:{" "}
          <sup
            style={{
              display: "inline-block",
              backgroundColor: isConnected ? "green" : "red",
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
            }}
          ></sup>
        </p>
        <div className="d-flex justify-content-end align-items-center my-1">
          <div className="btn-group">
            <button
              className="btn btn-secondary"
              onClick={onReset}
              title="Reset Code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-refresh-ccw"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                onRun();
              }}
              title="Execute Code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-play"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Editor
              value={code}
              language={language}
              onChange={onChange}
              style={{ width: "100%", minHeight: "300px" }}
            />
          </div>
          <div className="col-lg-6">
            <Console value={output.stderr || output.stdout} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
