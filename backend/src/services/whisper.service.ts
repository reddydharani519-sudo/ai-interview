// Web Speech API is used on frontend
// This service handles any server-side audio processing

export const transcribeAudio = async (
  audioBuffer: Buffer
): Promise<string> => {
  try {
    // For now return empty string
    // Web Speech API handles transcription on frontend
    return "";
  } catch (error) {
    console.error("Transcribe error:", error);
    return "";
  }
};

export const processAudioFile = async (
  filePath: string
): Promise<string> => {
  try {
    return "";
  } catch (error) {
    console.error("Process audio error:", error);
    return "";
  }
};

export default { transcribeAudio, processAudioFile };