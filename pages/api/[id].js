import { buildFeedbackPath, extractFeedback } from "./feedback";

export default function handler(req, res) {
  //   if (req.method === "DELETE") {
  //     //
  //   }
  const feedbackId = req.query.id;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const targetFeedback = data.find((item) => item.id === feedbackId);
  res.status(200).json({ feedback: targetFeedback });
}
