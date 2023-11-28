const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();

// Configuración de Firebase Admin SDK
const serviceAccount = require('../Server/eventwave-ar-firebase-adminsdk-i8suk-1b96ec4c0c.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

// Middleware para verificar el token en cada solicitud
const authenticateToken = async (req, res, next) => {
  try {
    const idToken = req.header('Authorization').split(' ')[1];
    await admin.auth().verifyIdToken(idToken);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Ruta para obtener la configuración de Firebase
app.get('/api/firebase-config', (req, res) => {
  const config = {
    apiKey: "AIzaSyDSP-uPfjsK1HyyIZu7bggsRRowAdtaUpg",
    authDomain: "eventwave-ar.firebaseapp.com",
    projectId: "eventwave-ar",
    storageBucket: "eventwave-ar.appspot.com",
    messagingSenderId: "757346690931",
    appId: "1:757346690931:web:caecc58aa042b491b94706",
    measurementId: "G-2QKZHDXHJC"
  };

  res.json(config);
});

// Ruta protegida por token
app.get('/api/contacto', authenticateToken, (req, res) => {
  // Lógica para manejar la solicitud protegida
  res.json({ telefono: '99999999',
             email: 'email@email.com' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
