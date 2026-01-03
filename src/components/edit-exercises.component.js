import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function EditExercises() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then(res => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      });

    axios.get("http://localhost:5000/users/")
      .then(res => setUsers(res.data.map(u => u.username)));
  }, [id]);

  const onSubmit = e => {
    e.preventDefault();

    const exercise = { username, description, duration, date };

    axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(() => navigate("/"));
  };
    return (
      <div>
        <h3>Edite Exercise Log</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={username} onChange={e => setUsername(e.target.value)}
            >
              {users.map(user => <option key={user}>{user}</option>)}

            </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
               value={description} onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration (in Minutes): </label>
            <input
              type="number"
              className="form-control"
              value={duration} onChange={e => setDuration(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={date}
                onChange={setDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  
}
