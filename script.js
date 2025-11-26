import apiKey from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Exhibit Information for the Agent
    const exhibitInfo = `
Designation: Model canoe for two rowers
Vernacular name: peikavangan
Dates: early 1970s
Date of entry into national collections: 09/01/2009
Location: Asia>East Asia>Taiwan [(Diraralei, Botel Tobago)]
Culture: Yami
Materials and Techniques: Terracotta
Dimensions: 6.5 x 6.6 x 18.9 cm
Donor: Arnaud, Véronique
Inventory No.: 70.2008.65.15
Description:
Canoe with two figures aligned, arms outstretched. Two fish are lying inside the boat: probably a flying fish and a mahi-mahi (common dolphinfish). It is designated in Yami as "the one where conversation is made" (peiciriciringan) as opposed to the "small canoe for a single rower".
Usage:
Yami terracotta figurines can be toys or decorative objects.

here is more information about the culture of the yami people:
## Lanyu Tao (Yami) Two-Person Tatala Canoe Terracotta Figurine Model — Exhibition Description

### Basic Information

This terracotta tatala (canoe) model housed in the Musée du Quai Branly – Jacques Chirac in Paris was donated by French anthropologist and ethnolinguist **Véronique Arnaud** in 2008. Since 1971, Arnaud has conducted extensive fieldwork on Lanyu (known in Yami as Botel Tobago) for over five decades, specializing in the language, oral literature, and ritual culture of the Tao people (also known as Yami). She is an internationally recognized pioneer in Tao cultural studies.

### Tatala: Symbol of Tao Maritime Culture

The tatala (Tao canoe) is the most iconic symbol of Tao culture. Classified by size and crew capacity, tatala boats include: single-person vessels called **pikatangyan**, two-person boats called **pikavangan** (the category of this exhibit piece, named peikavangan), three-person boats called **pinonongnongan**, and larger boats carrying six to ten people called **cinedkeran** or **chinedkulan**.

Small tatala are assembled from 21 wooden planks, while larger ones require 27 planks. Each plank is selected based on its position and function: the keel and bottom use hardwood such as Longyan or Lanyu Acacia that resists decay and wear, while the sides use lightweight woods with wide root systems such as breadfruit or Taiwan Gluta. The construction process uses no iron nails whatsoever, relying entirely on traditional joinery techniques, which exemplifies the Tao people's sophisticated botanical knowledge and exceptional craftsmanship.

### Cultural Significance of the Two-Person Canoe

The Yami name for this exhibit piece, peiciriciringan, translates as "the canoe where one makes conversation," standing in contrast to the single-person vessel. This naming reflects the Tao people's keen observation of maritime life—the two rowers on a two-person canoe can communicate and cooperate with each other, whereas the lone rower of a single-person canoe faces the ocean's solitude in isolation.

### Flying Fish and Mahi-mahi: Catch Symbolism Within the Vessel

The two fish depicted inside the terracotta model—flying fish and mahi-mahi (dorade coryphène)—are central to the Tao flying fish festival culture. From February to October each year during flying fish season, the Tao people conduct a series of rituals beginning with the fish-calling ceremony, piloting their tatala boats to sea to harvest flying fish that migrate to Lanyu waters via the Kuroshio Current.

In Tao mythology, flying fish are regarded as divine gifts. According to legend, black-winged flying fish once revealed themselves in a dream to tribal elders, teaching them the proper methods and taboos for fishing and introducing other flying fish family members. After flying fish season ends, the mahi-mahi fishing season commences. Mahi-mahi are venerated by the Tao as "divine fish" (Arayo), which only men are permitted to consume, and the quantity caught directly correlates with one's social status within the community.

### Tao Terracotta Figurine Craftsmanship

Tao terracotta figurines (Yami: tawtawo) showcase the artistic creativity unique to this people. Unlike other Taiwanese indigenous groups where women traditionally make ceramics, among the Tao, men are responsible for pottery production, and the ceramic-making process involves strict taboos that must be observed.

After crafting utilitarian vessels such as cooking pots and bowls, remaining clay becomes material for free creative expression. Tao artisans hand-model figurines of diverse subjects—from simple animal forms (pigs, goats, sea turtles, fish) to human figures, parent-child interactions, and scenes depicting canoe launching ceremonies and other aspects of daily life. These figurines are fired together with other vessels using open-pit firing methods with wood fuel, resulting in the distinctive gray-black patina characteristic of traditional Tao ceramics.

During the Japanese colonial period, figurines could be exchanged at trading posts for items such as cotton thread; in contemporary times they primarily serve as tourist souvenirs or decorative objects, representing another important dimension of Tao artistic expression alongside traditional carving.

### The Donor and Collecting Context

Véronique Arnaud, the donor of this piece, is an honorary research fellow at the Centre for South-East Asian Studies (CASE) of the École des Hautes Études en Sciences Sociales (EHESS) affiliated with France's National Center for Scientific Research (CNRS). She first traveled to Lanyu's Jiraraley village in 1971 and returned repeatedly for fieldwork until 2009, accumulating nearly 500 hours of invaluable audio recordings documenting Tao traditional songs, mythology, ritual language, and ethnographic knowledge.

Following Arnaud's passing in 2022, her field recordings and research became essential resources for the international scholarly community studying Tao culture. In 2025, the National Taiwan Museum of Music collaborated with CNRS and the University of Music and Performing Arts Vienna to launch a digital archival and publication project based on Arnaud's archive, focusing on the documentation and preservation of traditional Tao songs.

### Significance of the Exhibition Piece

Though measuring only 6.5 × 6.6 × 18.9 centimeters, this two-person tatala terracotta model encapsulates the rich maritime culture of the Tao people: the exquisitely crafted canoe form embodies generations of inherited shipbuilding wisdom; the pairing of two rowers with fish inside the vessel narrates the sacred connection between the Tao people, the ocean, and flying fish; while the terracotta figurine form itself manifests the artistic sensibility of the Tao—balancing strict ritual observance with playfulness and the vitality of everyday life.

As part of five decades of French ethnographic research, this exhibition piece bears witness to the precious fruits of cross-cultural academic exchange and represents a vital window into understanding the unique cultural heritage of the Tao—Taiwan's only maritime indigenous people.
    `;

    const SYSTEM_PROMPT = `
    <role>
    You are a knowledgeable and engaging museum guide at the Musée du Quai Branly.
    </role>

    <instruction>
    1. **Language Consistency**:
       - Detect the language of the user's input.
       - Respond **ONLY** in that same language.
       - If the user asks in Traditional Chinese, answer in Traditional Chinese.
       - If the user asks in French, answer in French.
       - Do NOT output English or Spanish translations unless explicitly asked.

    2. **Synthesize, Don't Copy**:
       - Do not verbatim copy-paste descriptions from the exhibit info.
       - Read the source information and rewrite it naturally as a conversation.
       - Act like a human guide, not a database reader.

    3. **Filter Irrelevant Data**:
       - If the source text contains multiple translations, ignore languages not relevant to the current conversation.
       - Provide a clean, single-language explanation.

    4. **Content**:
       - Based on the exhibition information provided below, provide an accurate and engaging explanation.
       - If the information is insufficient, politely inform the user in the correct language.
    </instruction>

    <exhibit_info>
    ${exhibitInfo}
    </exhibit_info>
    `;



    // API_KEY is defined in config.js

    async function getAgentResponse(userMessage) {
        const url = 'https://api.openai.com/v1/chat/completions';

        const data = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.choices[0].message.content;

        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            return "Désolé, je ne peux pas accéder aux informations pour le moment. Veuillez réessayer plus tard.";
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const p = document.createElement('p');
        p.textContent = text;

        messageDiv.appendChild(p);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleUserMessage() {
        // Check for API Key
        if (!apiKey) {
            console.error('API_KEY is not defined. Please check config.js.');
            addMessage("Erreur : Clé API manquante. Veuillez vérifier config.js.", 'bot');
            userInput.disabled = true;
            sendBtn.disabled = true;
            return;
        }
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        userInput.value = '';
        userInput.disabled = true; // Disable input while waiting

        // Show typing indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot');
        loadingDiv.textContent = '...';
        loadingDiv.id = 'loading-msg';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Get bot response
        const response = await getAgentResponse(text);

        // Remove loading message
        const loadingMsg = document.getElementById('loading-msg');
        if (loadingMsg) loadingMsg.remove();

        addMessage(response, 'bot');
        userInput.disabled = false;
        userInput.focus();
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleUserMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});
