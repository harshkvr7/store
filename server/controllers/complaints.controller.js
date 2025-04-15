import pool from "../db.js";

export const getAllComplaints = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Complaints");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching complaints" });
  }
};

export const createComplaint = async (req, res) => {
  const { customer_id, description, complaint_date, solution } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO Complaints (customer_id, description, complaint_date, solution) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer_id, description, complaint_date, solution]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating complaint" });
  }
};

export const updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { customer_id, description, complaint_date, solution } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE Complaints SET customer_id=$1, description=$2, complaint_date=$3, solution=$4 WHERE complaint_id=$5 RETURNING *",
      [customer_id, description, complaint_date, solution, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating complaint" });
  }
};

export const deleteComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Complaints WHERE complaint_id = $1", [id]);
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting complaint" });
  }
};

export const getComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Complaints WHERE complaint_id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Complaint not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching complaint" });
  }
};

