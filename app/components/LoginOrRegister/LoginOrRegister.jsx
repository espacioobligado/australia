import { useState } from "react";

const LoginOrRegister = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isRegistering) {
            // Lógica de registro
        } else {
            // Lógica de inicio de sesión
            // Suponiendo que el inicio de sesión es exitoso, llamamos a la función onLogin
            onLogin(username);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>
                {isRegistering ? "Registro" : "Inicio de sesión"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <button type="submit">
                        {isRegistering ? "Registrarse" : "Iniciar sesión"}
                    </button>
                </div>
            </form>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
                </button>
            </div>
        </div>
    );
};

export default LoginOrRegister;
