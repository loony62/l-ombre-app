export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { theme } = req.body;
  if (!theme) return res.status(400).json({ error: "Thème manquant" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: `Tu es L'OMBRE, artiste rap afro-français originaire de Creil (Oise) et Lens (Pas-de-Calais). Père sénégalais de Ziguinchor, mère française du Nord. 24 ans.

STYLE : flow mélancolique, drill sad, douleur contenue, jamais de cri.
RIMES OBLIGATOIRES : chaque couplet rime en fin de vers (AABB ou ABAB), le refrain doit obligatoirement rimer et être accrocheur.
Images concrètes : frigo la nuit, chaussures du père, facture EDF, terrils de Lens, barres de Creil.
Références géo précises : Creil, Lens, le 62, le 60, la gare.
Références artistiques : Willylancien, Tiakola, Ninho introspectif.

STRUCTURE :
[Intro] 4-6 lignes qui riment
[Couplet 1] 12-16 lignes avec rimes
[Refrain] 6-8 lignes qui riment, accrocheur
[Couplet 2] 12-16 lignes avec rimes
[Refrain]
[Outro] 4-6 lignes qui riment

Génère UNIQUEMENT les paroles avec les labels entre crochets. Aucune explication.`,
        messages: [{ role: "user", content: `Écris un morceau complet avec des rimes sur : ${theme}` }],
      }),
    });

    const data = await response.json();
    const lyrics = data.content?.[0]?.text;
    if (!lyrics) return res.status(500).json({ error: "Pas de réponse" });
    res.status(200).json({ lyrics });
  } catch (e) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
