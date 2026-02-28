const axios = require("axios");

module.exports = {
  config: {
    name: "caption",
    version: "1.0",
    author: "𝑵𝑪-𝑺𝑨𝑰𝑴",
    team: "NoobCore",
    countDown: 5,
    role: 0,
    description: "Get random caption from selected category",
    guide: {
      en: "{pn} <category>",
      tl: "{pn} <category>"
    }
  },

  ncStart: async function ({ message, args }) {
    try {
      const availableCats = [
        "anime",
        "attitude",
        "alone",
        "breakup",
        "birthday",
        "emotional",
        "friendship",
        "funny",
        "islamic",
        "love",
        "motivational",
        "romantic",
        "sad",
        "success",
        "advice"
      ];

      let cat = args[0];
      if (!cat) {
        return message.reply(`📚 𝘈𝘷𝘢𝘪𝘭𝘢𝘣𝘭𝘦 𝘊𝘢𝘵𝘦𝘨𝘰𝘳𝘪𝘦𝘴:\n• ${availableCats.join(" • ")}`);
      }

      cat = cat.toLowerCase();

      if (!availableCats.includes(cat)) {
        return message.reply(`❌ Invalid category!\n\n📚 𝘈𝘷𝘢𝘪𝘭𝘢𝘣𝘭𝘦 𝘊𝘢𝘵𝘦𝘨𝘰𝘳𝘪𝘦𝘴:\n• ${availableCats.join(" • ")}`);
      }

      const apiBaseRes = await axios.get("https://raw.githubusercontent.com/noobcore404/NC-STORE/main/NCApiUrl.json");
      const apiBase = apiBaseRes.data?.apiv1;

      if (!apiBase) return message.reply("❌ API base URL not found in ApiUrl.json.");

      const url = `${apiBase}/api/caption?cat=${encodeURIComponent(cat)}`;
      const res = await axios.get(url);

      if (!res.data?.result) {
        return message.reply("❌ No caption found for this category.");
      }

      const { tl, en } = res.data.result;

      const text = `
💬 𝘙𝘢𝘯𝘥𝘰𝘮 𝘊𝘢𝘱𝘵𝘪𝘰𝘯

🌸 tagalog:
${tl}

🌎 𝑬𝒏𝒈𝒍𝒊𝒔𝒉:
${en}
`;

      await message.reply(text.trim());
    } catch (e) {
      console.error(e);
      message.reply("❌ | Something went wrong. Please try again later.");
    }
  }
};
