/*


MEU NOVO GRUPO:

> 𝖇 ' 𝖝   -   𝖈 𝖍 𝖆 𝖙 
https://chat.whatsapp.com/JG5DINh26Pd3RiU9a9urtR


BASE BOT && BOT TRAVAS. BAILEYS ATUALIZADO.

 <> <> <> M e n s a g e m *  P a r a * V e n o m  M o d s  <> <> <>

 SAI DAQUI VENOM MODS ,TU VENDE BAGULHO Q QUALQUER UM FAZ...

 BOT DE BAN NEM FUNCIONA (por enquanto).

---> VENOM MODS VEiO AQ PRA PEGAR CARACTERE E CASE PQ N SABE FAZER  <---




<> <> <> M e n s a g e m *  P a r a * V e n o m  M o d s  <> <> <>

bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>
bruxelas ant venom mods <>

*/



const fs = require('fs')



////////// C o n S o l e //////////////

global.nameC = 'nuke' //nome do bot
global.perdoado = 'quem perdoa eh deus.' // mensagem embaixo do nome do BoT
global.informations = '\nSecret bot || updated base' // caso não queira nada apenas deixe as aspas.

//////////////////////////////////////


global.travaSend = '10'
global.owner = ['5512997675520']
global.packname = 'By'
global.author = 'Bruxo'
global.prefa = ['','/','.','>']
global.sessionName = './lib/qrcode'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  delete require.cache[file]
  require(file)
})
