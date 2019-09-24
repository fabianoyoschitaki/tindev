import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

import api from "../services/api";
import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

export default function Main({ match }) {
  // initializing users as empty array
  const [users, setUsers] = useState([]);

  // useEffect, useState = React hooks

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

  // like
  async function handleLike(id) {
    console.log(match.params.id, "liked", id);
    // route, body and headers. will generate 2 requests, one to check permission (204 No Content) and then the actual request (200 OK)
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });

    // to refresh users (remove the disliked).
    // We never change users directly, we do that by setUsers
    setUsers(users.filter(user => user._id !== id));
  }

  // dislike
  async function handleDislike(id) {
    console.log(match.params.id, "disliked", id);
    // route, body and headers. will generate 2 requests, one to check permission (204 No Content) and then the actual request (200 OK)
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });

    // to refresh users (remove the disliked).
    // We never change users directly, we do that by setUsers
    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      {/* this makes the click in the logo redirect the user to home */}
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}
    </div>
  );
}
