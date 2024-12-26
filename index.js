const colors = require("colors")
console.log(colors.red('Nazax X Hydra ParingCode'))
const { default:
makeWASocket,
DisconnectReason,
BufferJSON, 
useMultiFileAuthState,

AnyMessageContent, delay,
 fetchLatestBaileysVersion, 
 getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, 
 makeInMemoryStore, 
 PHONENUMBER_MCC, proto, 
 WAMessageContent, WAMessageKey 
}=require('@whiskeysockets/baileys');

const fs = require('fs');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const axios = require('axios');
const gradient = require('gradient-string');

const NodeCache = require('node-cache');
const readline = require("readline");
const clc = require("cli-color");
const msgRetryCounterCache = new NodeCache();
const usePairingCode = process.argv.includes("--use-pairing-code");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function connectToWhatsApp () {
    const store = makeInMemoryStore({ 
        logger: pino().child({
            level: 'debug',
            stream: 'store'
        })
    });

    const { 
        state, 
        saveCreds 
    } = await useMultiFileAuthState('./lib/qrc');

    const { 
        version, 
        isLatest 
    } = await fetchLatestBaileysVersion();

    const question = (text) => new Promise((resolve) => rl.question(text, resolve));

    const sock = makeWASocket({	        
        version,
        logger: pino({ level: "silent" }),
        usePairingCode,
        printQRInTerminal: false, 
        mobile: false,
        browser: ["FireFox (linux)"],
        auth: state,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(message.buttonsMessage || message.listMessage);
            if (requiresPatch) {
                message = { 
                    viewOnceMessage: {
                        message: { 
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            }, 
                            ...message 
                        }
                    }
                };
            }
            return message;   
        }
    });

    if (!sock.authState.creds.registered) {
        do {
            console.clear();
            const phoneNumber = await question(`\n</> DIGITE O NÚMERO NESSE FORMATO EXEMPLO: 559881138214 </>\n `);
            let continueGenerating = 's';
            do {
                const numberOfCodes = parseInt(await question(`Quantos códigos você deseja subir ?\n`));
                for (let i = 0; i < numberOfCodes; i++) {
                    try {
                        const code = await sock.requestPairingCode(phoneNumber);
                        console.log(colors.green('Dispositivo acessado notificações gerada \n\n System Bug\n\n'))
                        console.log(colors.red('Hydra Bug Notificações\n\n Nazax Destroyer\n\n'))
                    } catch (error) {
                        console.error('Erro ao solicitar código de emparelhamento:', error);
                        console.log('Reiniciando conexão...');
                        await connectToWhatsApp();
                        return;
                    }
                }
                continueGenerating = await question(`Deseja subir mais códigos para o mesmo número? (s/n)\n`);
            } while (continueGenerating.toLowerCase() === 's');
        } while (continueGenerating.toLowerCase() === 's');
    }

    sock.ev.on ('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error.Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if(shouldReconnect) {
                connectToWhatsApp();
            }
        } else if(connection === 'open') {
            console.log('opened connection');
        }
    });
}

connectToWhatsApp();