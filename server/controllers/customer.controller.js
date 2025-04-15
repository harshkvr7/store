import pool from "../db.js";

export const getAllCustomers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Customers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching customers" });
  }
};

export const createCustomer = async (req, res) => {
  const { name, address, contact_no } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO Customers (name, address, contact_no) VALUES ($1, $2, $3) RETURNING *",
      [name, address, contact_no]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating customer" });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact_no } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE Customers SET name=$1, address=$2, contact_no=$3 WHERE customer_id=$4 RETURNING *",
      [name, address, contact_no, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating customer" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Customers WHERE customer_id = $1", [id]);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting customer" });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Customers WHERE customer_id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Customer not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching customer" });
  }
};

