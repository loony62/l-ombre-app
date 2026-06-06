export default async function handler(req, res) {
  const theme = req.body?.theme || "le quartier";
  const style = req.body?.style || "Drill sad mélancolique, flow lent et posé, douleur contenue";

  const prompt = `Tu es L'OMBRE, artiste rap de Creil (Oise) et Lens (Pas-de-Calais).

STYLE IMPOSÉ POUR CE MORCEAU : ${style}

RÈGLES ABSOLUES — RIMES :
- Chaque paire de lignes DOIT rimer en fin de vers (schéma AABB strict)
- Les rimes doivent être riches et mélodiques, pas des rimes pauvres
- Le refrain doit être accrocheur, répétable, mémorable — comme un hook viral
- Compte les syllabes mentalement pour que le flow soit cohérent

RÈGLES ABSOLUES — CONTENU VIRAL :
- Minimum 2 métaphores originales et inattendues par couplet
- Références à l'actualité française ou mondiale récente (IA, réseaux sociaux, politique, économie)
- Références à des films, séries ou œuvres culturelles connues (The Wire, Scarface, Lupin, Squid Game, etc.)
- Une punchline percutante par couplet
- Images ultra-concrètes et sensorielles : odeurs, bruits, textures
- Références géographiques (Creil, Lens, terrils) : maximum UNE par morceau, seulement si ça s'intègre naturellement. Ne force pas.


RÈGLES ABSOLUES — STYLE L'OMBRE :
- Douleur contenue — jamais de cri, toujours de la maîtrise
- Alterner vers courts (impact) et vers longs (flux)
- - Mots wolof : maximum UN par morceau, seulement si l'émotion le demande vraiment. Ne force jamais.

- Références : Willylancien, Tiakola, Ninho, Dosseh, Booba, Damso, Jacques Brel, 

STRUCTURE OBLIGATOIRE :
[Intro] — 4 lignes qui riment, pose l'atmosphère
[Couplet 1] — 16 lignes AABB, dense, imagé, une punchline
[Refrain] — 8 lignes qui riment, mémorable, répétable
[Couplet 2] — 16 lignes AABB, plus intense, une référence culturelle
[Refrain]
[Outro] — 4 lignes qui riment, question ouverte ou image finale forte

THÈME : ${theme}

Génère UNIQUEMENT les paroles avec les labels entre crochets. Aucune explication, aucun commentaire.`;

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
