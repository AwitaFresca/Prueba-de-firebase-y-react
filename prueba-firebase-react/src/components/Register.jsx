import { useState } from "react"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";



export function Register() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  

  const {signup} = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {

      await signup(user.email, user.password)
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
  }

  return (
    <>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="tuemail@company.ltd" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} />

        <button>Register</button>
      </form>
    </>
  )
}

