const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true});
client.setMaxListeners(50);
const request = require("request");  
const ayarlar = require('./ayarlar.json');

const dokunma = ['634475227392376832',"978657885317914654","688117631567659093", "", "", "", "", "", ""];
const sunucu = '998877812251435019';
////////////////////////////////////////////////////////////BOTU ODAYA SOKAR////////////////////////////////////////////////////  

const strigaban = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigakick = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigarol = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigakanal = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigasunucu = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigawebhook = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigaurl = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const strigabotkoruma = '1008786759410258011'// RAPOR VERMESİ İÇİN LOG ID
const botroles = ["689766089567109158","490039330388180992"]; // BOT ROLLERI
const arr = [""];

//--------------------------BOT DURUM MESAJI - SES KANALI--------------------------\\

client.on("ready", async () => {
client.user.setPresence({ activity: { name: "Tanrısız ❤️‍ 1940" }, status: "dnd" });
})

//--------------------------BOT DURUM MESAJI - SES KANALI--------------------------\\
client.on("ready", async () => { 

let botVoiceChannel = client.channels.cache.get("1008306336230015016"); // bot ses log

if (botVoiceChannel) 

botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));

});



//-----------------------------------BAN KORUMA--------------------------------\\

client.on("guildBanAdd", async (guild, user) => {
const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
if (!dokunma.includes(id)) {
let uye = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
if (kullanici.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Sunucudan Üye Yasakladığı İçin Yasaklandı.", days: 7});
guild.members.unban(target.id);
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`), **${target.tag}** (\`${target.id}\`) kullanıcısını yasakladı. \n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım\` **${target.tag}** üyesinin banını kaldırdım. `)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigaban).send(strigaembed)
} else { };});

//-----------------------------------BAN KORUMA--------------------------------\\

//-----------------------------------KICK KORUMA--------------------------------\\

client.on("guildMemberRemove", async (uye) => {
let guild = uye.guild;
const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
if (!dokunma.includes(id)) {
if (uye.id === target.id) {
let user = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
if (kullanici.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)})});
user.ban({reason: "Sunucudan Üye Attığı İçin Yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${user} (\`${user.id}\`), **${target.tag}** (\`${target.id}\`) kullanıcısını attı. \n\n Tüm yetkileri kapatıp ${user} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigakick).send(strigaembed)
} else { };
} else { };});

//-----------------------------------KICK KORUMA--------------------------------\\


//-----------------------------------WEBHOOK KORUMA--------------------------------\\
client.on("webhookUpdate", async (channel) => {
let guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if (logs.entries.first().action === `WEBHOOK_CREATE`) {
let yetkili = logs.entries.first().executor;
let id = logs.entries.first().executor.id;
if (!dokunma.includes(id)) {
let uye = guild.members.cache.get(id);
let kullanic = guild.members.cache.get(client.user.id);
if (kullanic.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanic.roles.highest.rawPosition)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Webhookları Değiştirmekten(açmak-silmek-düzenlemek) yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Webhook Oluşturdu.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigawebhook).send(strigaembed)
} else { };
} else { };})});
//-----------------------------------WEBHOOK KORUMA--------------------------------\\



//-----------------------------------KANAL KORUMA--------------------------------\\

client.on("channelCreate", async (channel) => {
const guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `CHANNEL_CREATE`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest3.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {
console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Kanal Oluşturmaktan Yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Kanal oluşturdu.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigakanal).send(strigaembed)
} else { };} else { };});});

//-----------------------------------KANAL KORUMA--------------------------------\\


//-----------------------------------KANAL KORUMA--------------------------------\\

client.on("channelDelete", async (channel) => {
const guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if (logs.entries.first().action === `CHANNEL_DELETE`) {
const id = logs.entries.first().executor.id;
if (!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition)
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)})});
uye.ban({reason: "Kanal Silmekten Yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${channel.name} Kanalını Sildi.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigakanal).send(strigaembed)
} else { };
} else { };
})});

//-----------------------------------KANAL KORUMA--------------------------------\\




//-----------------------------------ROL KORUMA--------------------------------\\
client.on("roleDelete", async (role) => {
const guild = role.guild;
let sil = guild.roles.cache.get(role.id);
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_DELETE`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition)
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {console.log(x.name); x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Rol Silmekten Yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) (\`${role.name}\`) Rolünü sildi!\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#acaa37')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigarol).send(strigaembed)
} else { };
} else { };});});
//-----------------------------------ROL KORUMA--------------------------------\\


//-----------------------------------ROL KORUMA--------------------------------\\
client.on("roleUpdate", async (oldRole, newRole) => {
let guild = newRole.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_UPDATE`) {
let id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
if(!arr.some(a => oldRole.permissions.has(a)) && arr.some(a => newRole.permissions.has(a))) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => { return ( arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => {
console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
});
uye.ban({reason: "Rol Güncellemekten Yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${newRole.name} Rolüne Yetki Verdi.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#378fac')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigarol).send(strigaembed)
} else { };
} else { };
} else { };
});
});
//-----------------------------------ROL KORUMA--------------------------------\\


//-----------------------------------ROL KORUMA--------------------------------\\
client.on("roleCreate", async (role) => {
let guild = role.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_CREATE`) {
let id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
let uye = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(q => {
console.log(q.name);
q.edit({permissions: q.permissions.remove(arr)});});
uye.ban({reason: "Rol Oluşturmaktan Yasaklandı"});
role.delete();
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Rol Oluşturuldu.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#37ac6c')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigarol).send(strigaembed)
} else { };
} else { };});});
//-----------------------------------ROL KORUMA--------------------------------\\



//-----------------------------------BOT KORUMA--------------------------------\\
client.on("guildMemberAdd", async (member) => {
const guild = member.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `BOT_ADD`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
if(member.user.bot){
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.rawPosition < uye.roles.highest.rawPosition) return;
guild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({ reason: "Sunucuya Bot Getirdiği İçin Yasaklandı.", days: 7 });
member.ban({ reason: "Sunucuya Bot İzinsiz Çekildi.", days: 7 })
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucuya ${member} Botunu Ekledi.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#5ba4cc')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigabotkoruma).send(strigaembed)
} else { };
} else { };
} else { };});});
//-----------------------------------BOT KORUMA--------------------------------\\

//-----------------------------------SUNUCU KORUMA--------------------------------\\

client.on("guildUpdate", async (oldGuild, newGuild) => {
newGuild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `GUILD_UPDATE`) {
var yapan = logs.entries.first().executor;
let id = yapan.id;
const uye = newGuild.members.cache.get(id);
const kullanici = newGuild.members.cache.get(client.user.id);
if(oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
if(!dokunma.includes(id)) {
request({
method: "PATCH",
url: `https://discord.com/api/guilds/${newGuild.id}/vanity-url`,
headers: {
Authorization: `Bot ${client.token}`},
json: {code: `${oldGuild.vanityURLCode}`}});
newGuild.roles.cache.filter(r => { return(arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition);}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Url'yi Değiştirdiği İçin Yasaklandı.", days: 7});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucunun Urlsini Değiştirdi.\n\n Sunucunun Urlsini \`${newGuild.vanityURLCode}\` Olarak Değiştirdi, ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigaurl).send(strigaembed)
} else { };
} else if (oldGuild.name !== newGuild.name) {
if(!dokunma.includes(id)) {
newGuild.setName(oldGuild.name);
uye.ban({reason: "Sunucunun İsmini Değiştirdiği İçin Yasaklandı", days: 7});
newGuild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.rawPosition < kullanici.roles.highest.rawPosition)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
let yazı = 'Tanrısız'
const strigaembed = new MessageEmbed()
.setAuthor(yazı, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucu Ayarlarını Güncelledi.\n\n Tüm yetkileri kapatıp ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(` ❤️‍🔥 `)
client.channels.cache.get(strigasunucu).send(strigaembed)});
} else { };
} else { };
} else { };});});

process.on("uncaughtExpection", function (err) {
  if (err) console.log(err);
});

//-----------------------------------SUNUCU KORUMA--------------------------------\\
//---------------------------------DDOS KORUMASI-----------------------------\\
client.on('message', msg => {

if(client.ping > 2500) {

            let bölgeler = ['europe', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "koruma-log")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti")) 
           .catch(console.error);
}});

client.login(ayarlar.token);
//---------------------------------DDOS KORUMASI-----------------------------\\