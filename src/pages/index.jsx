import Layout from "../components/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import id_16 from "id-16";
import { getAbbr } from "../utils/code";

export default function Home() {
  const [language, setLanguage] = useState("javascript");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();
  const id_generator = id_16.generator(6);

  const createRoom = () => {
    navigate(`/editor/${getAbbr(language)}-${id_generator()}`);
  };

  const joinRoom = async () => {
    navigate(`/editor/${roomId}`);
  };

  return (
    <Layout>
      <div className="container text-center">
        <h1>Welcome to Collab! 👋</h1>
        <p>
          This is a place where you can create a coding room and dev out with
          another programmer!
        </p>
        <hr />
        <h2>What would you like to do?</h2>
        <div className="row my-3">
          <div className="col-sm-6">
            <div className="card shadow card-dark">
              <div className="card-body">
                <h3 className="h3 mb-3">Create a room</h3>
                <label htmlFor="languageSelect">
                  Select a programming language:
                </label>
                <div className="input-group my-3">
                  <select
                    aria-label="Select a programming language"
                    className="form-control custom-select"
                    id="languageSelect"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="javascript">JS</option>
                    <option value="typescript">TS</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>
                  <div className="input-group-append">
                    <button className="btn btn-success" onClick={createRoom}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card shadow card-dark">
              <div className="card-body">
                <h3 className="h3 mb-3">Join a room</h3>
                <label htmlFor="roomId">
                  What's the room ID you're looking to join?
                </label>
                <div className="input-group my-3">
                  <input
                    className="form-control"
                    type="text"
                    name="roomId"
                    id="roomId"
                    max-length={9}
                    min-length={9}
                    required
                    aria-label="Room Id to Join"
                    placeholder="js-Def567"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      disabled={roomId.length > 9 || roomId.length < 9}
                      onClick={joinRoom}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
