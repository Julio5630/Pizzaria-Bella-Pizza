const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
//(!nome || !email || !endereco || !telefone || !senha)

let usuarios = [
  { id: 1, nome: "João Silva", email: "joao@email.com" , endereco : "Rua das Graças n 6", telefone : "(69) 94002-8922", senha : "01391474323"},
];

app.get('/usuarios', (req, res) => {
  console.log('GET /usuarios - Listando todos os usuários');
  res.json({
    mensagem: "Lista de usuários recuperada com sucesso",
    data: usuarios,
    total: usuarios.length
  });
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /usuarios/${id} - Buscando usuário específico`);
  
  const usuario = usuarios.find(u => u.id === id);
  
  if (!usuario) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado",
      error: true
    });
  }
  
  res.json({
    mensagem: "Usuário encontrado com sucesso",
    data: usuario
  });
});

app.post('/usuarios', (req, res) => {
  console.log('POST /usuarios - Criando novo usuário');
  const { nome, email, endereco, telefone, senha } = req.body;

  if (!nome || !email || !endereco || !telefone || !senha) {
    return res.status(400).json({ mensagem: 'Nome e email são obrigatórios', error: true });
  }

  const novoId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const novoUsuario = { id: novoId, nome, email, endereco, telefone, senha };
  usuarios.push(novoUsuario);

  res.status(201).json({ mensagem: 'Usuário criado com sucesso', data: novoUsuario });
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /usuarios/${id} - Atualizando usuário`);
  
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado",
      error: true
    });
  }
  
  const { nome, email, endereco, telefone, senha } = req.body;
  
  if (!nome || !email || !endereco || !telefone || !senha) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios",
      error: true
    });
  }
  
  usuarios[usuarioIndex] = { id, nome, email, endereco, telefone, senha };
  
  res.json({
    mensagem: "Usuário atualizado com sucesso",
    data: usuarios[usuarioIndex]
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /usuarios/${id} - Removendo usuário`);
  
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado",
      error: true
    });
  }
  
  const usuarioRemovido = usuarios.splice(usuarioIndex, 1)[0];
  
  res.json({
    mensagem: "Usuário removido com sucesso",
    data: usuarioRemovido
  });
});

app.get('/', (req, res) => {
  res.json({
    mensagem: "API está funcionando! 🚀",
    versao: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Endpoints disponíveis:`);
  console.log(`   GET  http://localhost:${PORT}/usuarios`);
  console.log(`   GET  http://localhost:${PORT}/usuarios/1`);
});