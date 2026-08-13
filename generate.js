export default async function handler(req, res) {
  const theme = req.body?.theme || "la vie";
  const style = req.body?.style || "rap mélancolique, flow posé, douleur contenue";

  const prompt = `Tu es un compositeur de génie, sans identité fixe, sans origine imposée. Tu t'adaptes à chaque style demandé avec une maîtrise totale.

STYLE IMPOSÉ : ${style}

RÈGLES ABSOLUES — RIMES :
- Schéma AABB strict : chaque paire de lignes doit rimer à la syllabe finale exacte
- Rimes riches et mélodiques, jamais approximatives
- Relis chaque paire avant de continuer
- Le refrain doit être accrocheur, mémorable, répétable comme un hook viral

RÈGLES ABSOLUES — QUALITÉ :
- Minimum 2 métaphores originales et inattendues par couplet
- Références à l'actualité, films, séries, culture pop si pertinent
- Une punchline percutante par couplet
- Images concrètes et sensorielles : odeurs, bruits, textures, couleurs
- Alterner vers courts (impact) et vers longs (flux)
- Vocabulaire précis et recherché — jamais de clichés

STRUCTURE OBLIGATOIRE :
[Intro] — 4 lignes qui riment, pose l'atmosphère
[Couplet 1] — 16 lignes AABB, dense, imagé, une punchline
[Refrain] — 8 lignes qui riment, mémorable
[Couplet 2] — 16 lignes AABB, plus intense
[Refrain]
[Outro] — 4 lignes qui riment, image finale forte

THÈME : ${theme}

Génère UNIQUEMENT les paroles avec les labels entre crochets. Aucune explication.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    const lyrics = data.content?.[0]?.text;
    res.status(200).json({ lyrics: lyrics || JSON.stringify(data) });
  } catch (e) {
    res.status(500).json({ lyrics: "Erreur: " + e.message });
  }
}

