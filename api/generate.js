export default async function handler(req, res) {
  res.status(200).json({ test: "ok", method: req.method, body: req.body });
}
