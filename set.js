const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5XanlKd1NlWGkyKzBuRmhMZGcvSFVsL00wY3pxN2o1d3dzOE9VWisyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NKUm5LZWo0M3R2Y0pwL2M0UTVJRVp5QTcxZkQ4YW9yMUF6SVlFOTNRdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSXpzbWZ4Q0pYRHg0LytOYU9hREdGajlqNmRMUE1sSk4zR0hDeUNERzEwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3Q2U0NnBOSktzTDNoYnh6dDNKMHVtQitHRUp1YjF6d3pDVVpKVUtneUVRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGdVAxK0lSSnd3VWxEKzFBYmxxemtoSGZYWTYyVXVIbHVBdjFuckE1bk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkM5MlRjNDlBdExPQk5tTU1FcW5ZRDhEUys5aDBhUTJCS3pCdjVQbEJCemM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUN1eVM5Ry9TMi8vVlE0cHJvNkV2c3RuOU1KZlJBUmNTNmdaQjVKaklVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0d5L2I1d2VOMkloRXE5ZVZTby9SWTVSMnZCbTYrT1M4ektUTzJEb0Fqcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRUMVdxbGt6aTBXNE14TGZBYUs2SXVtQ3dSaFc5VGU5Mm1QSmxvUWdiOXM4Q21oUXlBd0tYN3pETXNNQ25ZbVd1OGxpWGFLckZyTGZORE1lMGhjcGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJBLy9kSmxmbTJTT2kzcmV5bk56TzcyVlN2VDJHSE5HRS84VTB2TXdOWnlNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyNjY1NzUzMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBN0U0NEMzRjgyRTY4NTUwRDUzOTlFRDlEREM2NEJDMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MTk5MDE2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MjY2NTc1MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTU2QkIwNEJDNkE0QjZCNDMxOTA4RDUyMTVGNTY3QjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODE5OTAyMX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzI2NjU3NTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE3MjlGRTNFRkQ0MTIxNzVGRUZCQjY5QTJCRTc2QjQ0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgxOTkwNDR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjFCNDlFMjM4IiwibWUiOnsiaWQiOiIyNTQ3MjY2NTc1MzE6NTRAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNTM3NTU0NTkxMDkwMTM6NTRAbGlkIiwibmFtZSI6Ii7gvJIq4pyeWmFjaOKcnirgvJIuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKZS80WXdHRU1YTXpjRUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOM21SakMvWDF2dXhBcFZDZkpDTjgvQzZQOFJBWDVSK2I3RmJOME5ORkNFPSIsImFjY291bnRTaWduYXR1cmUiOiIrNmFWRlcxQ0tlTnhhVW43SGZvaEZOK2lyT3JrN0ExZEdheHJrWXIvbE95cUQyai93UzdiOENBVnF3YWlnalpYYlprMnZvM0p6ZWxyVUtZTXowZXpEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiT3NQSzZ4TXNMNk1SSVc3bzhtWmVtQ1VyRmFpTUtCM0trWkNNK2Zrb01ldVRwYUdpemVnOGlSRml4dW1hOUVSWk9NcGhKQ3JDZjNFbzRCbWlCcUVSZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MjY2NTc1MzE6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGQ1a1l3djE5YjdzUUtWUW55UWpmUHd1ai9FUUYrVWZtK3hXemREVFJRaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4MTk4OTk2LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpwMiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

