import pdf from "pdf-parse";
import axios from "axios";

export const uploadResume = async (req, res) => {
  try {
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: resumeText },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    res.json({
      message: "Resume analyzed successfully",
      analysis: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};