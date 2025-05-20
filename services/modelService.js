import axios from "axios";
import FormData from "form-data";

export const getPrediction = async (file) => {
  try {
    const formData = new FormData();

    // Directly append the buffer as file data
    formData.append("image", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      `https://alzhimer-backend-1.onrender.com/predict`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Model Service Error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error getting prediction");
  }
};

export const getRiskAnalysis = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.MODEL_SERVER_URL}/api/predict/risk/XGBoost`,
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Model Service Error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error getting prediction");
  }
};

export const getFaceEmotion = async (file) => {
  try {
    const formData = new FormData();

    // Directly append the buffer as file data
    formData.append("image", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      `${process.env.MODEL_SERVER_URL}/api/face/predict_face_emotion`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Model Service Error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error getting prediction");
  }
};

export const getSpeechEmotion = async (file) => {
  try {
    const formData = new FormData();

    // Directly append the buffer as file data
    formData.append("audio", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      `${process.env.MODEL_SERVER_URL}/api/speech/predict_speech_emotion`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Model Service Error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Error getting prediction");
  }
};
