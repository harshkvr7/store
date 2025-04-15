import pool from "../db.js";

export const getAllEmployees = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

export const createEmployee = async (req, res) => {
  const { name, address, designation, contact_no, branch_id, salary } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO Employees (name, address, designation, contact_no, branch_id, salary) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, address, designation, contact_no, branch_id, salary]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating employee" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, address, designation, contact_no, branch_id, salary } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE Employees SET name=$1, address=$2, designation=$3, contact_no=$4, branch_id=$5, salary=$6 WHERE employee_id=$7 RETURNING *",
      [name, address, designation, contact_no, branch_id, salary, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating employee" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Employees WHERE employee_id = $1", [id]);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting employee" });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Employees WHERE employee_id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Employee not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employee" });
  }
};

