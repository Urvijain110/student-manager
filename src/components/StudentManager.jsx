import React, { useState } from "react";
import "./StudentManager.css";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", age: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.id || !form.name || !form.email || !form.age) {
      return alert("All fields are required");
    }

    if (!form.email.includes("@") || !form.email.includes(".com")) {
      return alert("Enter a valid email address");
    }

    if (isNaN(form.age)) {
      return alert("Age must be a number");
    }

    if (students.some((s) => s.id === form.id)) {
      return alert("Student ID must be unique");
    }

    setStudents([...students, form]);
    setForm({ id: "", name: "", email: "", age: "" });
  };

  const handleUpdate = () => {
    if (!form.email.includes("@") || !form.email.includes(".com")) {
      return alert("Enter a valid email address");
    }

    if (isNaN(form.age)) {
      return alert("Age must be a number");
    }

    setStudents(students.map((s) => (s.id === form.id ? form : s)));
    setForm({ id: "", name: "", email: "", age: "" });
    setIsEditing(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="student-container">
      <h2>Student Manager</h2>
      <div className="form">
        <input name="id" placeholder="Student ID" value={form.id} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <button onClick={isEditing ? handleUpdate : handleAdd}>
          {isEditing ? "Update Student" : "Add Student"}
        </button>
      </div>

      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students yet</p>
      ) : (
        <ul className="student-list">
          {students.map((s) => (
            <li key={s.id} className="student-card">
              <div>
                <p><strong>ID:</strong> {s.id}</p>
                <p><strong>Name:</strong> {s.name}</p>
                <p><strong>Email:</strong> {s.email}</p>
                <p><strong>Age:</strong> {s.age}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(s)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentManager;
