import React, { useEffect, useState } from "react";
import "./Main.css";

import api from "../services/api";
import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

export default function Main({ match }) {
  // initializing users as empty array
  const [users, setUsers] = useState([]);

  // executed only once when empty array
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id
        }
      });
      // console.log(response.data);
      setUsers(response.data);
    }
    loadUsers();
  }, [match.params.id]);

  //like and dislike
  async function handleLike(id) {}

  return (
    <div className="main-container">
      <img src={logo} alt="Tindev" />
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt="" />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button">
                <img src={dislike} alt="Dislike" />
              </button>
              <button type="button">
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
