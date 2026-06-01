export default async function handler(req, res) {
  const theme = req.body?.theme || "le quartier";
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: `Écris un texte rap avec des rimes sur : ${theme}` }],
      }),
    });
    const data = await response.json();
    const lyrics = data.content?.[0]?.text;
    res.status(200).json({ lyrics: lyrics || JSON.stringify(data) });
  } catch (e) {
    res.status(500).json({ lyrics: "Erreur: " + e.message });
  }
}
