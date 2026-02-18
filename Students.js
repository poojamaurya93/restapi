import React, { useEffect, useState } from "react";
import API from "./api";

function Students() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        API.get("students/").then((res) => setStudents(res.data));
    }, []);

    const addStudent = async () => {
        const res = await API.post("students/", { name, email });
        setStudents([...students, res.data]);
    };

    return (
        <div>
            <h2>Students</h2>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={addStudent}>Add</button>

            <ul>
                {students.map((s) => (
                    <li key={s.id}>{s.name} - {s.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default Students;
