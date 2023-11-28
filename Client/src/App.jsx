import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';


function App() {
  const [firebaseConfig, setFirebaseConfig] = useState(null);


  const signInWithGoogle = async () => {
    try {
      // Obtener la configuración de Firebase desde el servidor utilizando Axios
      const response = await axios.get('http://localhost:5000/api/firebase-config');

      if (!response.data) {
        throw new Error('Empty response from server');
      }

      // Almacena la configuración en el estado
      setFirebaseConfig(response.data);

      // Inicializar Firebase en el cliente con la configuración obtenida
      const app = initializeApp(response.data);
      const auth = getAuth(app);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Usuario autenticado con éxito
      const user = result.user;
      console.log('Usuario autenticado:', user);
      console.log('PRUEBA USER TOKEN: ',user.accessToken) //propiedad accesToken
      const token = await user.getIdToken(); // metodo para pedir el token
      console.log('Token de usuario logueado: ', token);



      // Hacer una solicitud GET a la ruta /contacto con el token
      const contactoResponse = await axios.get('http://localhost:5000/api/contacto', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Respuesta de la ruta /contacto:', contactoResponse.data);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const contactohandler = async () => {
    // Hacer una solicitud GET a la ruta /contacto con el token
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9yZ2UgTG96YW5vIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pqLURhNHpaQ3U0b0hCSDJiSjVPYkw5TTZvNnBicmEzYm0zSHlrUUUzUzJ1WHQ9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXZlbnR3YXZlLWFyIiwiYXVkIjoiZXZlbnR3YXZlLWFyIiwiYXV0aF90aW1lIjoxNzAxMjEyODIwLCJ1c2VyX2lkIjoiaGZPSk85TFI3aVdBYzg5THJIcjBUeTZFcjFFMiIsInN1YiI6ImhmT0pPOUxSN2lXQWM4OUxySHIwVHk2RXIxRTIiLCJpYXQiOjE3MDEyMTI4MjAsImV4cCI6MTcwMTIxNjQyMCwiZW1haWwiOiJwdW50b25ldGF6dWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDg5MTY3NzAzNzEwOTQ1NjczMzAiXSwiZW1haWwiOlsicHVudG9uZXRhenVsQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.jhC_xeeVUlY8gGhAes8kEsoBlyylvyVBFPBO7YCo3JOuTWiACs-YZ1noUGISfA3iY4SRC8Co7JTPGi41-C14I-xhqbc_ullN9uvwyW4-KLdpKszb5D2B8V0zEVQ6guPk8ryeXhTOzBmF9eJhYDoNtSzhtRLBWT6Du1_zeBUFqqLiJELjJrv1RUakYU6_hO90L9Zhy0Evv9GkSYpupN2M4b-AFZrOQY5T8iMlzr8270o5F_XL51l6B83Tw_IhVTVniD7O2fk_sOSR9_fHSlksGW1G3l0pYtu8XScF1PheK_RBoCRvslfnHof0v_oaFFjx14Rzx3FwHzEF1DA9RxgACQ'
    try {
      const contactoResponse = await axios.get('http://localhost:5000/api/contacto', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Respuesta de la ruta /contacto:', contactoResponse.data);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
    
  }
  return (
    <div className="App">
      <h1>EventWave ATR</h1>
      <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
      <button onClick={contactohandler}>contacto</button>
    </div>
  );
}

export default App;
