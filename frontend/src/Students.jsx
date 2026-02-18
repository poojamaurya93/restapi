import { useEffect, useState } from "react";
import API from "./api";

function Students() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);




  // GET students
  useEffect(() => {
    API.get("students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // POST student
const addStudent = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);

    if (photo) {
      formData.append("photo", photo);
    }

    const res = await API.post("students/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setStudents([...students, res.data]);

    setName("");
    setEmail("");
    setAge("");
    setPhoto(null);
  } catch (err) {
    console.error("Error adding student:", err);
  }
};


// update student
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("students/");
    setStudents(res.data);
  };

  const startEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
  };

  const updateStudent = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("age", age);

      if (photo) {
        formData.append("photo", photo);
      }

      await API.put(`students/${editId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditId(null);
      setPhoto(null);
      fetchStudents();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };



//   delete student
const deleteStudent = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    await API.delete(`students/${id}/`);
    setStudents(students.filter((s) => s.id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <div className="form-section">
      <h2>Students</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

      <button className="btn add" onClick={addStudent}>
        Add Student
      </button>

      {editId && (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button className="btn update" onClick={updateStudent}>
            Update
          </button>
        </>
      )}

      <hr />
      <table border="1">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>
                {s.photo && (
                  <img
                    src={`https://restapi1-vw8t.onrender.com/api/${s.photo}`}
                    alt="student"
                    width="80"
                  />
                )}
              </td>

              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <button className="btn edit" onClick={() => startEdit(s)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn delete"
                  onClick={() => deleteStudent(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email} - {s.age}
            <button onClick={() => startEdit(s)}>Edit</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Students;

