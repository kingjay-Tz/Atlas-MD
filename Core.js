const { QuickDB } = require("quick.db");
const { MongoDriver } = require("mongo-driver");
const axios = require("axios");

module.exports = async (Atlas, m, store) => {
    try {
        const { type, from, body, sender, isGroup } = m;
        const botNumber = await Atlas.decodeJid(Atlas.user.id);
        
        // 1. METADATA SETUP
        const groupMetadata = isGroup ? await Atlas.groupMetadata(from) : '';
        const participants = isGroup ? groupMetadata.participants : [];
        const groupAdmins = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : [];
        const isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmin = isGroup ? groupAdmins.includes(sender) : false;
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender);

        // 2. DATABASE (Using your MongoDB link from Koyeb environment)
        const mongoDriver = new MongoDriver(process.env.MONGODB);
        await mongoDriver.connect();
        const db = new QuickDB({ driver: mongoDriver });

        // 3. GHOST ANTILINK (Silent Delete)
        const linkPatterns = [/chat.whatsapp.com/gi, /http:\/\//gi, /https:\/\//gi];
        if (isGroup && isBotAdmin && !isAdmin && !isCreator) {
            if (linkPatterns.some(pattern => pattern.test(body))) {
                return await Atlas.sendMessage(from, { delete: m.key });
            }
        }

        // 4. GHOST NSFW FILTER (5-Strike Rule)
        if (isGroup && type === "imageMessage" && isBotAdmin && !isAdmin && !isCreator) {
            const imageData = await m.download();
            const base64Image = imageData.toString('base64');
            
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
            const payload = {
                contents: [{
                    parts: [
                        { text: "Is this photo naked, sexually explicit, or NSFW? Answer only 'Yes' or 'No'." },
                        { inline_data: { mime_type: "image/jpeg", data: base64Image } }
                    ]
                }]
            };

            try {
                const response = await axios.post(geminiUrl, payload);
                const aiResult = response.data.candidates[0].content.parts[0].text.trim();

                if (aiResult.toLowerCase().includes("yes")) {
                    // Action: Delete Photo
                    await Atlas.sendMessage(from, { delete: m.key });

                    // Action: Update Strikes
                    let strikes = await db.get(`strikes_${sender}_${from}`) || 0;
                    strikes++;
                    await db.set(`strikes_${sender}_${from}`, strikes);

                    // Action: Kick on 5th strike
                    if (strikes >= 5) {
                        await Atlas.groupParticipantsUpdate(from, [sender], 'remove');
                        await db.delete(`strikes_${sender}_${from}`);
                    }
                }
            } catch (e) {
                // Keep it silent if AI fails
            }
        }

        // 5. TOTAL SILENCE (No command responses allowed)
        return;

    } catch (err) {
        // Errors only show in your Koyeb logs, never in the WhatsApp group
        console.error("Ghost Logic Error:", err);
    }
};
