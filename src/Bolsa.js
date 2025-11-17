import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

export default function Bolsa() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  async function carregar() {
    const snap = await getDocs(collection(db, "produtos"));
    const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setProdutos(lista);
  }

  async function adicionar() {
    await addDoc(collection(db, "produtos"), {
      nome,
      categoria,
      quantidade
    });
    carregar();
  }

  async function alterarQtd(id, novaQtd) {
    const ref = doc(db, "produtos", id);
    await updateDoc(ref, { quantidade: novaQtd });
    carregar();
  }

  async function remover(id) {
    await deleteDoc(doc(db, "produtos", id));
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h1>Estoque</h1>

      <input placeholder="Nome do Produto" onChange={e => setNome(e.target.value)} />
      <input placeholder="Categoria" onChange={e => setCategoria(e.target.value)} />
      <input type="number" placeholder="Quantidade" onChange={e => setQuantidade(Number(e.target.value))} />

      <button onClick={adicionar}>Adicionar</button>

      <hr />

      {produtos.map(p => (
        <div key={p.id}>
          <p><b>{p.nome}</b> - {p.categoria}</p>
          <p>Quantidade: {p.quantidade}</p>

          <button onClick={() => alterarQtd(p.id, p.quantidade + 1)}>+1</button>
          <button onClick={() => alterarQtd(p.id, p.quantidade - 1)}>−1</button>
          <button onClick={() => remover(p.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}
