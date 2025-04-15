import pool from "../db.js";

export const getAllClothes = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Clothes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching clothes" });
  }
};

export const createCloth = async (req, res) => {
  const { type, fabric, colour, size, price, mfd, sold_date, designer_id, branch_id, customer_id } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO Clothes (type, fabric, colour, size, price, mfd, sold_date, designer_id, branch_id, customer_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [type, fabric, colour, size, price, mfd, sold_date, designer_id, branch_id, customer_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating cloth" });
  }
};

export const updateCloth = async (req, res) => {
  const { id } = req.params;
  const { type, fabric, colour, size, price, mfd, sold_date, designer_id, branch_id, customer_id } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE Clothes SET type=$1, fabric=$2, colour=$3, size=$4, price=$5, mfd=$6, sold_date=$7,
       designer_id=$8, branch_id=$9, customer_id=$10 WHERE cloth_id=$11 RETURNING *`,
      [type, fabric, colour, size, price, mfd, sold_date, designer_id, branch_id, customer_id, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating cloth" });
  }
};

export const deleteCloth = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Clothes WHERE cloth_id = $1", [id]);
    res.json({ message: "Cloth deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting cloth" });
  }
};


export const getClothById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Clothes WHERE cloth_id = $1", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Cloth not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cloth" });
  }
};
