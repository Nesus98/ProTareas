import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

// Carga las variables de entorno desde un archivo .env a process.env
dotenv.config()

// Conecta a la base de datos usando la función connectDB definida en ./config/db
connectDB()

// Crea una instancia de una aplicación Express
const app = express()

//Leer valores json en el body
app.use(express.json())

//Routes
app.use('/api/projects', projectRoutes)

// Exporta la instancia de la aplicación para poder usarla en otros archivos
export default app