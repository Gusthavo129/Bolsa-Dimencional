import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function entrar() {
    setErro("");
    
    // Validação
    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    // Remove espaços em branco
    const emailLimpo = email.trim();
    const senhaLimpa = senha.trim();

    console.log("Tentando login com:", emailLimpo); // DEBUG

    setCarregando(true);
    
    signInWithEmailAndPassword(auth, emailLimpo, senhaLimpa)
      .then((userCredential) => {
        console.log("Login bem-sucedido!", userCredential.user); // DEBUG
        onLogin();
      })
      .catch((err) => {
        console.error("Erro completo:", err); // DEBUG
        
        // Mensagens de erro amigáveis
        switch (err.code) {
          case "auth/invalid-credential":
            setErro("Email ou senha incorretos");
            break;
          case "auth/user-not-found":
            setErro("Usuário não encontrado. Verifique o email");
            break;
          case "auth/wrong-password":
            setErro("Senha incorreta");
            break;
          case "auth/invalid-email":
            setErro("Email inválido");
            break;
          case "auth/too-many-requests":
            setErro("Muitas tentativas. Tente novamente mais tarde");
            break;
          case "auth/operation-not-allowed":
            setErro("Autenticação por email/senha não está habilitada");
            break;
          default:
            setErro(`Erro: ${err.code} - ${err.message}`);
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "400px",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333"
        }}>
          🔐 Login
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#555"
          }}>
            Email
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && entrar()}
            disabled={carregando}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#555"
          }}>
            Senha
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && entrar()}
            disabled={carregando}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {erro && (
          <div style={{
            padding: "12px",
            backgroundColor: "#fee",
            color: "#c00",
            border: "1px solid #fcc",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "14px"
          }}>
            {erro}
          </div>
        )}

        <button
          onClick={entrar}
          disabled={carregando}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: carregando ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: carregando ? "not-allowed" : "pointer"
          }}
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <div style={{
          marginTop: "20px",
          padding: "12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#666",
          textAlign: "center"
        }}>
        </div>
      </div>
    </div>
  );
}
