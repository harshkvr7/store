import pool from "../db.js";

export const getAllBranches = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Branches");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching branches" });
  }
};

export const createBranch = async (req, res) => {
  const { branch_name, contact_no, manager } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO Branches (branch_name, contact_no, manager) VALUES ($1, $2, $3) RETURNING *",
      [branch_name, contact_no, manager]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating branch" });
  }
};

export const updateBranch = async (req, res) => {
  const { id } = req.params;
  const { branch_name, contact_no, manager } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE Branches SET branch_name = $1, contact_no = $2, manager = $3 WHERE branch_id = $4 RETURNING *",
      [branch_name, contact_no, manager, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating branch" });
  }
};

export const deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Branches WHERE branch_id = $1", [id]);
    res.json({ message: "Branch deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting branch" });
  }
};

export const getBranchById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Branches WHERE branch_id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Branch not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching branch" });
  }
};

