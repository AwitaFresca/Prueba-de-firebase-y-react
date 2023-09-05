import { useAuth } from "../context/authContext";


export function Home() {
  //Me traigo al user para poder mostrarlo
  const {user, logout, loading} = useAuth()

  const handleLogout = async () => {
    try {

      await logout();
    } catch (error) {
      console.error(error);
    }
    
  }

  if (loading) return <h1>Cargando</h1>

  return (
    <>
      <div>Bienvenido {user.displayName || user.email}</div>

      <button onClick={handleLogout}>
        Cerrar sesion
      </button>
    </>
  
  )
}

