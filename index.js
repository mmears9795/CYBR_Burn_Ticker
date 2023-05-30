import Web3 from 'web3';
import { Client, Intents, Guild, BitField } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const botToken = process.env.BOT_TOKEN;

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on("ready", () => {
    console.log("The bot is ready");

    bot.user.setActivity("CYBR Burn", {type: 'WATCHING'}); 
    const burnAmountInterval = setInterval (async function () {
	  let guilds = bot.guilds.cache.map(guild => guild.id);

    let totalBurned = await getBurnAmount();

    console.log("Total burned: " + totalBurned);

	  guilds.forEach(async (id) => {
		let guild = bot.guilds.cache.get(id);
	        guild.me.setNickname(totalBurned);
	});
    }, 30000);

});


async function getBurnAmount() {
  try {
    const url = "https://thecyberenterprise.com/api/get_info.php";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
    }).then((response) => {
	    return response.json();
    });
    const data = await response;

    return data.burnedAmmount;
  } catch(error) {
    console.log(error);
	  // getBurnAmount();
  }
}

bot.login(process.env.DISCORD_BOT_TOKEN);
