/**
 * File: SpeechToText.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Microphone with speech to text built by using react-speech-recognition hook
 */

import { FaMicrophoneAlt, FaMicrophoneAltSlash } from "react-icons/fa";
import ControlButton from "./ControlButton";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import styled from "styled-components";

const ToggleButton = styled(ControlButton)`
  position: static;
  margin-left: 10px;
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
`;

// Docs: https://www.npmjs.com/package/react-speech-recognition
const SpeechToText = ({ setText, resetCondition }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    resetTranscript();
    SpeechRecognition.stopListening();
    return () => {
      resetTranscript();
      SpeechRecognition.stopListening();
    };
  }, [resetCondition, resetTranscript]);

  useEffect(() => {
    if (!listening && transcript.length > 0) {
      setText(transcript);
      resetTranscript();
    }
  }, [transcript, listening, setText, resetTranscript]);

  function handleToggle() {
    if (listening) SpeechRecognition.stopListening();
    else {
      resetTranscript();
      SpeechRecognition.startListening({ language: "sk-SK" });
    }
  }

  return (
    <>
      <ToggleButton
        name="adjust"
        onClick={handleToggle}
        disabled={browserSupportsSpeechRecognition === false}
      >
        {listening ? (
          <FaMicrophoneAltSlash style={{ pointerEvents: "none" }} />
        ) : (
          <FaMicrophoneAlt style={{ pointerEvents: "none" }} />
        )}
      </ToggleButton>
    </>
  );
};

export default SpeechToText;
