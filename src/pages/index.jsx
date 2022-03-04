import Layout from "../components/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import id_16 from "id-16";
import { getAbbr } from "../utils/code";
import logo from "../assets/brand/cover-transparent.png";

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
        <div className="max-w-600 mx-auto my-4">
          <img src={logo} className="hero" alt="Collab" />
          <p>
            Join or create a coding room and dev out with other programmers!
          </p>
        </div>
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
                    <button
                      className="btn btn-success"
                      onClick={createRoom}
                      title="Create a room"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
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
                      title="Join a room"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user-plus"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
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
