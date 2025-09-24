// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // ----- PERFIS -----
  const perfis = [
    { id: 1, perfil: "Comum" },
    { id: 2, perfil: "Administrador" },
    { id: 3, perfil: "Tecnico" },
    { id: 4, perfil: "Gerente" },
  ]

  for (const p of perfis) {
    await prisma.perfil.upsert({
      where: { id: p.id },
      update: {},
      create: p
    })
  }

  // ----- USUÁRIOS -----
  const usuarios = [
    { id: 1, senha: 111111, perfilId: 1 },
    { id: 2, senha: 212121, perfilId: 2 },
    { id: 3, senha: 414141, perfilId: 4 },
    { id: 4, senha: 313131, perfilId: 3 },
  ]

  for (const u of usuarios) {
    await prisma.usuario.upsert({
      where: { id: u.id },
      update: {},
      create: u
    })
  }

  // ----- EQUIPAMENTOS -----
  const equipamentos = [
    {
      id: 1,
      equipamento: "Torno Mecçnico 500mm Modelo BV20L 220V - TTM520 - Tander",
      imagem: "Torno_Mecanico_500mm.png",
      descricao: "O Torno Mecçnico Tander TTM520 ç uma ferramenta...",
      ativo: true,
      data: new Date("2019-10-01 14:54:20")
    },
    {
      id: 2,
      equipamento: "Processador Intel Core i9-7920X Skylake...",
      imagem: "Intel_Core_i9.png",
      descricao: "Com esse processador inovador...",
      ativo: true,
      data: new Date("2019-10-01 15:00:20")
    },
    {
      id: 3,
      equipamento: "Monitor, Dell, U2518D, UltraSharp...",
      imagem: "Monitor_Dell.png",
      descricao: "Dç vida ao seu trabalho com uma tela...",
      ativo: false,
      data: new Date("2018-10-01 10:00:20")
    },
    {
      id: 4,
      equipamento: "Mouse Gamer Razer Deathadder Essential...",
      imagem: "Mouse_Razer.png",
      descricao: "Nada melhor do que um mouse gamer...",
      ativo: true,
      data: new Date("2017-10-01 09:00:20")
    },
    {
      id: 5,
      equipamento: "All-in-One Media Keyboard",
      imagem: "Teclado_Microsoft.png",
      descricao: "O All-in-One Media Keyboard é o dispositivo ideal...",
      ativo: false,
      data: new Date("2017-10-01 13:00:00")
    },
  ]

  for (const e of equipamentos) {
    await prisma.equipamento.upsert({
      where: { id: e.id },
      update: {},
      create: e
    })
  }

  // ----- COMENTÁRIOS -----
  const comentarios = [
    { id: 1, comentario: "Deverá fazer o download...", equipamentoId: 2, usuarioId: 4, data: new Date("2020-09-07 18:00:00") },
    { id: 2, comentario: "Problema de aquecimento...", equipamentoId: 2, usuarioId: 2, data: new Date("2020-05-04 10:30:00") },
    { id: 3, comentario: "Problema de aquecimento...", equipamentoId: 3, usuarioId: 4, data: new Date("2021-03-04 15:30:00") },
    { id: 4, comentario: "Realizada a manutenção preventiva", equipamentoId: 3, usuarioId: 1, data: new Date("2021-06-05 09:30:00") },
    { id: 5, comentario: "Realizada a manutenção corretiva", equipamentoId: 4, usuarioId: 1, data: new Date("2021-07-10 08:00:00") },
    { id: 6, comentario: "Realizada a manutenção corretiva", equipamentoId: 5, usuarioId: 2, data: new Date("2021-07-13 09:00:00") },
    { id: 7, comentario: "Realizada a manutenção corretiva", equipamentoId: 3, usuarioId: 2, data: new Date("2021-08-10 10:00:00") },
    { id: 8, comentario: "Realizada a manutenção corretiva", equipamentoId: 4, usuarioId: 3, data: new Date("2021-09-18 17:00:00") },
    { id: 9, comentario: "Realizada a manutenção corretiva", equipamentoId: 5, usuarioId: 3, data: new Date("2021-10-11 11:00:00") },
    { id: 10, comentario: "Realizada a manutenção corretiva", equipamentoId: 3, usuarioId: 4, data: new Date("2021-11-21 12:00:00") },
    { id: 11, comentario: "Realizada a manutenção corretiva", equipamentoId: 5, usuarioId: 4, data: new Date("2021-12-22 13:00:00") },
  ]

  for (const c of comentarios) {
    await prisma.comentario.upsert({
      where: { id: c.id },
      update: {},
      create: c
    })
  }

  console.log("Banco populado com sucesso!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
