import { useState } from "react"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { getAnalytics, logEvent } from "firebase/analytics";


export function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const analytics = getAnalytics();
  logEvent(analytics, 'notification_received');

  const {login, loginWithGoogle} = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  //Capturamos los cambios en el formulario
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  //Enviamos los datos ingresados en el formulario
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {

      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      if (error.code === "auth/internal-error"){
        setError('Correo invalido')
      }

      if (error.code == "auth/weak-password"){
        setError('La contraseña es muy corta (debe tener 6 o mas digitos)')
      }
      //setError(error.message);
    }
  };

  const handleGoogleSignin = async() => {
    try {

      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    
  }

  return (
    //Formulario del login
    <>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="tuemail@company.ltd" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} />

        <button>Login</button>
      </form>

      <button onClick={handleGoogleSignin}>Iniciar sesion con Google</button>

    </>
  )
}



