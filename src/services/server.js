const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importa el paquete de CORS

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gestion',
    password: '1234',
    port: 5432,
});

app.use(express.json());
app.use(cors()); // Agrega el middleware de CORS

app.get('/api/producto', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto')
    return res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener producto:', error)
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})

app.get('/api/producto/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('SELECT * FROM producto WHERE id = $1', [id])
    return res.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener producto:', error)
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})

app.post('/api/producto', async (req, res) => {
  const { id_producto, nombre, categoria, cantidad, min_cantidad, precio_venta } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO producto VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id_producto, nombre, categoria, cantidad, min_cantidad, precio_venta]
    )
    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al agregar producto:', error)
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})

app.put('/api/producto/:id', async (req, res) => {
  const { id } = req.params;
  const { id_producto, nombre, categoria, cantidad, min_cantidad, precio_venta } = req.body;
  try {
    const result = await pool.query(
      'UPDATE producto SET id_producto = $1, nombre = $2, categoria = $3, cantidad = $4, min_cantidad = $5, precio_venta = $6 WHERE id_producto = $7 RETURNING *',
      [id_producto, nombre, categoria, cantidad, min_cantidad, precio_venta, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.delete('/api/producto/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM producto WHERE id_producto = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    return res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
