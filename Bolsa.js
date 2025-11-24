import React, { useEffect, useState } from "react";

// ============================================
// IMPORTANTE: Este é um EXEMPLO DEMONSTRATIVO
// Para usar no seu projeto real, copie o código
// e adicione as importações do Firebase
// ============================================

const CATEGORIAS = [
  { id: "armas", nome: "⚔️ Armas" },
  { id: "armaduras", nome: "🛡️ Armaduras" },
  { id: "pocoes", nome: "🧪 Poções" },
  { id: "alimentos", nome: "🍖 Alimentos" },
  { id: "ferramentas", nome: "🔧 Ferramentas" },
  { id: "materiais", nome: "💎 Materiais" },
  { id: "outros", nome: "📦 Outros" }
];

const SLOTS_EQUIPAMENTO = {
  mao_direita: "🗡️ Mão Direita",
  mao_esquerda: "🛡️ Mão Esquerda",
  cabeca: "⛑️ Cabeça",
  torso: "👕 Torso",
  pernas: "👖 Pernas",
  pes: "👞 Pés"
};

export default function BolsaAventureiro() {
  const [itens, setItens] = useState({
    armas: [
      { id: "1", nome: "Espada Longa", quantidade: 1, descricao: "Uma lâmina afiada e equilibrada" },
      { id: "2", nome: "Arco Élfico", quantidade: 1, descricao: "Feito de madeira antiga das florestas" }
    ],
    armaduras: [
      { id: "3", nome: "Escudo de Ferro", quantidade: 1, descricao: "Proteção sólida e confiável" },
      { id: "4", nome: "Elmo de Aço", quantidade: 1, descricao: "Protege a cabeça em batalhas" }
    ],
    pocoes: [
      { id: "5", nome: "Poção de Vida", quantidade: 5, descricao: "Restaura pontos de vida" }
    ],
    alimentos: [],
    ferramentas: [],
    materiais: [],
    outros: []
  });
  
  const [categoriaAtiva, setCategoriaAtiva] = useState("armas");
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [descricao, setDescricao] = useState("");
  const [carregandoIA, setCarregandoIA] = useState(false);
  const [sugestaoIA, setSugestaoIA] = useState("");
  const [equipamentos, setEquipamentos] = useState({});
  const [mostrarEquipamentos, setMostrarEquipamentos] = useState(false);

  // Gerar descrições baseadas em categorias
  function gerarDescricaoLocal(nomeItem, categoria) {
    const descricoes = {
      armas: [
        "Uma lâmina forjada nas chamas ancestrais, sussurra promessas de vitória.",
        "Arma antiga coberta de runas místicas que pulsam com poder sombrio.",
        "Empunhadura desgastada pelo tempo, mas sua lâmina ainda corta o ar com precisão mortal.",
        "Metal negro que parece absorver a luz ao redor, frio ao toque."
      ],
      armaduras: [
        "Proteção forjada por mestres ferreiros, cada placa conta uma história de batalha.",
        "Armadura imbuída com encantamentos de proteção, brilha levemente sob a lua.",
        "Couro reforçado com placas de metal, leve mas resistente.",
        "Proteção ancestral que já salvou muitas vidas em campos de batalha."
      ],
      pocoes: [
        "Líquido brilhante que borbulha suavemente, exala um aroma reconfortante.",
        "Elixir de cor vibrante, preparado com ervas raras das montanhas.",
        "Poção que pulsa com energia mágica, quente ao toque.",
        "Conteúdo misterioso em frasco antigo, suas propriedades são lendárias."
      ],
      alimentos: [
        "Preparado com ingredientes frescos, restaura corpo e alma.",
        "Alimento preservado magicamente, mantém seu sabor por eras.",
        "Ração de aventureiro, simples mas nutritiva.",
        "Comida que aquece o coração e energiza o corpo."
      ],
      ferramentas: [
        "Ferramenta robusta, essencial para qualquer aventureiro.",
        "Instrumento bem cuidado, mostra sinais de uso frequente.",
        "Utensílio prático que já salvou muitas situações difíceis.",
        "Ferramenta versátil, útil em diversas situações."
      ],
      materiais: [
        "Material raro com propriedades únicas, valioso para crafting.",
        "Recurso bruto que pulsa com potencial não explorado.",
        "Material coletado em terras distantes, essencial para artesãos.",
        "Componente mágico que brilha com luz própria."
      ],
      outros: [
        "Item curioso de origem desconhecida.",
        "Objeto misterioso que pode ter múltiplos usos.",
        "Item único que desafia categorização simples.",
        "Artefato interessante com história própria."
      ]
    };

    const lista = descricoes[categoria] || descricoes.outros;
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // Sugerir descrição com IA local
  async function sugerirDescricao() {
    if (!nome.trim()) {
      alert("Digite o nome do item primeiro!");
      return;
    }

    setCarregandoIA(true);
    setSugestaoIA("🤖 IA pensando...");
    await new Promise(resolve => setTimeout(resolve, 800));

    const descricaoGerada = gerarDescricaoLocal(nome, categoriaAtiva);
    setDescricao(descricaoGerada);
    setSugestaoIA("✅ Descrição gerada pela IA!");
    
    setTimeout(() => setSugestaoIA(""), 3000);
    setCarregandoIA(false);
  }

  // Validar se item pode ser equipado
  function validarEquipavelLocal(nomeItem, categoria) {
    const nomeMinusculo = nomeItem.toLowerCase();
    
    const mapeamento = {
      mao_direita: ["espada", "machado", "adaga", "lança", "cajado", "varinha", "arco", "martelo", "maça"],
      mao_esquerda: ["escudo", "tocha", "livro"],
      cabeca: ["elmo", "capacete", "capuz", "coroa", "tiara", "chapéu"],
      torso: ["armadura", "peitoral", "colete", "túnica", "manto", "capa"],
      pernas: ["calça", "grevas", "calças"],
      pes: ["bota", "botas", "sapato", "sandália"]
    };

    if (categoria === "armas") {
      if (nomeMinusculo.includes("escudo")) {
        return {
          equipavel: true,
          slot: "mao_esquerda",
          motivo: "Escudo equipado na mão esquerda"
        };
      }
      
      return {
        equipavel: true,
        slot: "mao_direita",
        motivo: "Arma equipada na mão direita"
      };
    }

    if (categoria === "armaduras") {
      for (const [slot, palavras] of Object.entries(mapeamento)) {
        if (palavras.some(palavra => nomeMinusculo.includes(palavra))) {
          return {
            equipavel: true,
            slot: slot,
            motivo: `Armadura equipada em ${SLOTS_EQUIPAMENTO[slot]}`
          };
        }
      }
      
      return {
        equipavel: true,
        slot: "torso",
        motivo: "Armadura equipada no torso"
      };
    }

    return {
      equipavel: false,
      slot: null,
      motivo: "Este tipo de item não pode ser equipado"
    };
  }

  // Equipar item
  async function equiparItem(item, catId) {
    setCarregandoIA(true);
    setSugestaoIA("🤖 Verificando se pode equipar...");
    await new Promise(resolve => setTimeout(resolve, 500));

    const validacao = validarEquipavelLocal(item.nome, catId);

    if (!validacao.equipavel) {
      setSugestaoIA(`❌ ${validacao.motivo}`);
      setTimeout(() => setSugestaoIA(""), 3000);
      setCarregandoIA(false);
      return;
    }

    const slot = validacao.slot;

    if (equipamentos[slot]) {
      if (!window.confirm(`Já existe "${equipamentos[slot].nome}" equipado em ${SLOTS_EQUIPAMENTO[slot]}. Substituir?`)) {
        setCarregandoIA(false);
        setSugestaoIA("");
        return;
      }
    }

    setEquipamentos(prev => ({
      ...prev,
      [slot]: {
        nome: item.nome,
        descricao: item.descricao || "",
        categoria: catId,
        itemId: item.id
      }
    }));

    setSugestaoIA(`✅ ${item.nome} equipado em ${SLOTS_EQUIPAMENTO[slot]}!`);
    setTimeout(() => setSugestaoIA(""), 3000);
    setCarregandoIA(false);
  }

  // Desequipar item
  function desequiparItem(slot) {
    if (!window.confirm(`Desequipar ${equipamentos[slot]?.nome}?`)) return;

    setEquipamentos(prev => {
      const novo = { ...prev };
      delete novo[slot];
      return novo;
    });

    setSugestaoIA("✅ Item desequipado!");
    setTimeout(() => setSugestaoIA(""), 2000);
  }

  // Adicionar item
  function adicionarItem() {
    if (!nome.trim()) return alert("Digite o nome!");
    
    const novoItem = { 
      id: Date.now().toString(),
      nome, 
      quantidade: quantidade || 1, 
      descricao
    };

    setItens(prev => ({
      ...prev,
      [categoriaAtiva]: [...prev[categoriaAtiva], novoItem]
    }));

    setNome(""); 
    setQuantidade(1); 
    setDescricao("");
    setSugestaoIA("✅ Item adicionado!");
    setTimeout(() => setSugestaoIA(""), 2000);
  }

  // Alterar quantidade
  function alterarQuantidade(catId, itemId, qtd) {
    if (qtd < 0) return;
    
    setItens(prev => ({
      ...prev,
      [catId]: prev[catId].map(item => 
        item.id === itemId ? { ...item, quantidade: qtd } : item
      )
    }));
  }

  // Remover item
  function removerItem(catId, itemId) {
    if (!window.confirm("Tem certeza?")) return;
    
    setItens(prev => ({
      ...prev,
      [catId]: prev[catId].filter(item => item.id !== itemId)
    }));
  }

  const itensAtual = itens[categoriaAtiva] || [];
  const totalItens = Object.values(itens).flat().length;

  return (
    <div className="fundo-paranormal">
      <div className="background-wrapper" aria-hidden="true">
        <img className="bg-blur" src="https://blog.coleco.com.br/wp-content/uploads/2023/05/op_m.jpg" alt="" />
        <img className="bg-main" src="https://blog.coleco.com.br/wp-content/uploads/2023/05/op_m.jpg" alt="" />
      </div>

      <div className="container-terror">
        <aside className="sidebar-info">
          <h2>📜 Informações</h2>
          <p>Total de itens: <b>{totalItens}</b></p>

          <h3>Categorias</h3>
          <ul className="lista-lateral">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <button
                  className={"categoria-btn " + (categoriaAtiva === c.id ? "ativa" : "")}
                  onClick={() => setCategoriaAtiva(c.id)}
                >
                  {c.nome}
                </button>
              </li>
            ))}
          </ul>

          <button 
            className="btn btn-equipamentos"
            onClick={() => setMostrarEquipamentos(!mostrarEquipamentos)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🎒 {mostrarEquipamentos ? "Fechar" : "Ver"} Equipamentos
          </button>

          <p className="texto-sussurro">"Esta bolsa ecoa vozes que não deveriam ser ouvidas..."</p>
        </aside>

        <main className="area-principal">
          <h1>🩸 Bolsa Amaldiçoada do Aventureiro</h1>

          {/* PAINEL DE EQUIPAMENTOS */}
          {mostrarEquipamentos && (
            <div style={{
              background: "rgba(30,58,138,0.3)",
              border: "2px solid rgba(59,130,246,0.5)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h2 style={{color: "#60a5fa", marginBottom: "15px"}}>⚔️ Equipamentos Atuais</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px"
              }}>
                {Object.entries(SLOTS_EQUIPAMENTO).map(([slot, nome]) => (
                  <div key={slot} style={{
                    background: "rgba(0,0,0,0.4)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: equipamentos[slot] ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <div style={{fontSize: "12px", color: "#94a3b8", marginBottom: "5px"}}>
                      {nome}
                    </div>
                    {equipamentos[slot] ? (
                      <>
                        <div style={{color: "#60a5fa", fontWeight: "bold", fontSize: "14px"}}>
                          {equipamentos[slot].nome}
                        </div>
                        {equipamentos[slot].descricao && (
                          <div style={{fontSize: "11px", color: "#94a3b8", marginTop: "4px", fontStyle: "italic"}}>
                            {equipamentos[slot].descricao}
                          </div>
                        )}
                        <button
                          onClick={() => desequiparItem(slot)}
                          style={{
                            marginTop: "8px",
                            padding: "4px 8px",
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "11px"
                          }}
                        >
                          Desequipar
                        </button>
                      </>
                    ) : (
                      <div style={{color: "#64748b", fontStyle: "italic", fontSize: "13px"}}>
                        Vazio
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUGESTÃO DA IA */}
          {sugestaoIA && (
            <div style={{
              padding: "12px",
              marginBottom: "15px",
              background: "rgba(16,185,129,0.2)",
              border: "1px solid rgba(16,185,129,0.5)",
              borderRadius: "8px",
              color: "#6ee7b7",
              fontWeight: "bold"
            }}>
              {sugestaoIA}
            </div>
          )}

          <div className="form-container">
            <input 
              type="text" 
              placeholder="Nome do item" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
            <div className="linha-inputs">
              <input 
                type="number" 
                value={quantidade} 
                onChange={(e) => setQuantidade(Number(e.target.value))} 
                style={{width: "80px"}}
              />
              <input 
                type="text" 
                placeholder="Descrição" 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                style={{flex: 1}}
              />
              <button
                onClick={sugerirDescricao}
                disabled={carregandoIA}
                style={{
                  padding: "10px 14px",
                  background: carregandoIA ? "#666" : "linear-gradient(135deg, #059669, #10b981)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: carregandoIA ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  whiteSpace: "nowrap"
                }}
              >
                🤖 IA Sugerir
              </button>
            </div>
            <button className="btn btn-add" onClick={adicionarItem}>➕ Adicionar</button>
          </div>

          <div className="lista-itens">
            {itensAtual.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.nome}</h3>
                {item.descricao && <p className="desc">{item.descricao}</p>}
                <p className="qtd">Quantidade: {item.quantidade}</p>
                <div className="botoes-card">
                  <button 
                    className="btn btn-sub" 
                    onClick={() => alterarQuantidade(categoriaAtiva, item.id, item.quantidade - 1)}
                  >
                    −
                  </button>
                  <button 
                    className="btn btn-plus" 
                    onClick={() => alterarQuantidade(categoriaAtiva, item.id, item.quantidade + 1)}
                  >
                    +
                  </button>
                  <button 
                    className="btn btn-del" 
                    onClick={() => removerItem(categoriaAtiva, item.id)}
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => equiparItem(item, categoriaAtiva)}
                    disabled={carregandoIA}
                    style={{
                      padding: "8px 10px",
                      background: carregandoIA ? "#666" : "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: carregandoIA ? "not-allowed" : "pointer",
                      fontSize: "12px"
                    }}
                  >
                    ⚔️ Equipar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style>{`
        .fundo-paranormal { position: relative; min-height: 100vh; }
        
        .container-terror {
          display: flex;
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          position: relative;
          z-index: 1;
        }

        .sidebar-info {
          width: 280px;
          background: rgba(10,10,10,0.75);
          backdrop-filter: blur(6px);
          border-right: 2px solid rgba(255,0,0,0.25);
          padding: 20px;
          border-radius: 8px;
          height: calc(100vh - 80px);
          position: sticky;
          top: 20px;
          align-self: flex-start;
        }

        .sidebar-info h2 { color: #ff3b3b; margin-bottom: 6px; }
        .sidebar-info h3 { color: #ff6b6b; font-size: 16px; margin-top: 20px; margin-bottom: 10px; }
        .sidebar-info p { color: #ddd; margin-bottom: 12px; }
        .lista-lateral { list-style: none; padding-left: 0; margin: 10px 0; }
        .lista-lateral li { margin-bottom: 8px; }

        .background-wrapper {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
          user-select: none;
          animation: floatBg 25s linear infinite alternate;
        }

        @keyframes floatBg {
          0% { transform: scale(1.05) translateY(0); }
          100% { transform: scale(1.05) translateY(-20px); }
        }

        .bg-blur {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(18px) brightness(0.35) contrast(1.15);
          transform: scale(1.15);
        }

        .bg-main {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          opacity: 0.92;
          animation: moveMain 32s ease-in-out infinite alternate;
        }

        @keyframes moveMain {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(0px, -15px); }
        }

        .categoria-btn {
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          color: #eee;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 6px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .categoria-btn.ativa {
          background: linear-gradient(90deg, rgba(139,0,0,0.9), rgba(180,20,20,0.85));
          box-shadow: 0 6px 18px rgba(255,0,0,0.2);
          color: #fff;
        }

        .area-principal {
          flex: 1;
          background: rgba(20,0,0,0.45);
          padding: 22px;
          border-radius: 12px;
          border: 1px solid rgba(255,0,0,0.08);
          box-shadow: 0 8px 30px rgba(0,0,0,0.6);
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }

        .area-principal h1 {
          color: #ffbcbc;
          text-shadow: 0 0 8px #7a0000;
          margin-bottom: 16px;
        }

        .form-container { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
        .form-container input { 
          padding: 10px; 
          border-radius: 8px; 
          border: 1px solid rgba(255,255,255,0.06); 
          background: rgba(0,0,0,0.5); 
          color: #fff; 
        }
        .linha-inputs { display: flex; gap: 10px; }
        .btn { padding: 10px 14px; border-radius: 8px; cursor: pointer; border: none; }
        .btn-add { 
          background: #8b0000; 
          color: white; 
          box-shadow: 0 6px 18px rgba(139,0,0,0.18);
          width: 100%;
        }

        .lista-itens { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); 
          gap: 18px; 
        }
        
        .item-card {
          background: rgba(10,0,0,0.6);
          padding: 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,0,0,0.08);
          box-shadow: 0 6px 20px rgba(0,0,0,0.6);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        
        .item-card:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 14px 40px rgba(139,0,0,0.22); 
        }

        .item-card h3 { color: #ff8b8b; margin: 0 0 6px 0; }
        .desc { font-style: italic; color: #f0dede; opacity: 0.9; font-size: 14px; margin: 6px 0; }
        .qtd { font-weight: bold; color: #ffdede; margin-top: 8px; }

        .botoes-card { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
        .btn-sub { background: #c48b00; color: white; padding: 8px 10px; border-radius: 6px; cursor: pointer; }
        .btn-plus { background: #0b8b4f; color: white; padding: 8px 10px; border-radius: 6px; cursor: pointer; }
        .btn-del { background: #8b0000; color: white; padding: 8px 10px; border-radius: 6px; cursor: pointer; }

        .texto-sussurro { 
          color: #d8cfcf; 
          font-style: italic; 
          margin-top: 12px; 
          opacity: 0.85; 
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .sidebar-info { 
            position: relative; 
            width: 100%; 
            height: auto; 
            border-right: none; 
          }
          .container-terror { flex-direction: column; padding: 16px; }
          .background-wrapper { display: none; }
        }
      `}</style>
    </div>
  );
}