import Layout from "../components/layout";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Console from "../components/Console";
import { useParams } from "react-router-dom";
import { parsePid } from "../utils/code";
import Editor from "../components/Editor";

let socket;

export default function Page() {
  const serverURL =
    process.env.REACT_APP_SERVER_URL;
  console.log(serverURL);
  const { pid } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState({ stdout: "" });
  const [language, setLanguage] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const onChange = (updatedCode) => {
    setCode(updatedCode);
    socket.emit("code-change", updatedCode);
  };

  const initializeSocket = async () => {
    const [language, roomId] = parsePid(pid);

    setLanguage(language);
    setRoomId(roomId);

    await fetch("/api/socket");
    socket = io(serverURL);

    socket.on("connect", () => {
      console.log("STATUS: connected");
      socket.emit("join-room", { pid, user: { name: "Ben" } });
      setIsConnected(true);
      socket.on("update-code", (value) => setCode(value));
      socket.on("code-run", onRun);
    });

    setIsLoaded(true);
  };

  const onRun = async (input) => {
    console.log("RUNNING CODE");
    if (!input)
      socket.emit("run-code", {
        fromName: "main",
        fromContent: code,
        fromLanguage: language,
      });

    let body = {
      name: "main" || input.fromName,
      content: code || input.fromContent,
      language: language || input.fromLanguage,
    };

    let res = await fetch(serverURL + "api/code/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let data = await res.json();
    setOutput(data);
  };

  const onReset = () => {
    setCode("");
    setOutput({ stdout: "" });
    socket.emit("code-change", "");
  };

  useEffect(() => {
    if (pid) initializeSocket();
  }, [pid]);

  if (!isLoaded) {
    return (
      <div className="full-screen">
        <Loader size={50} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h1>
          {language} room {pid}
        </h1>
        <p>
          Socket Status:{" "}
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
            <button className="btn btn-secondary" onClick={onReset}>
              Reset
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                onRun();
              }}
            >
              Run
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
