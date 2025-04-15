import pool from "../db.js";

export const getAllDesigners = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Designers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching designers" });
  }
};

export const createDesigner = async (req, res) => {
  const { name, address, contact_no } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO Designers (name, address, contact_no) VALUES ($1, $2, $3) RETURNING *",
      [name, address, contact_no]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating designer" });
  }
};

export const updateDesigner = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact_no } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE Designers SET name=$1, address=$2, contact_no=$3 WHERE designer_id=$4 RETURNING *",
      [name, address, contact_no, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating designer" });
  }
};

export const deleteDesigner = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Designers WHERE designer_id = $1", [id]);
    res.json({ message: "Designer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting designer" });
  }
};

export const getDesignerById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Designers WHERE designer_id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Designer not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching designer" });
  }
};

