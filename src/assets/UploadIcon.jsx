import { GrYoga } from "react-icons/gr";
import styled from "styled-components";

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 90%;
`;

function UploadIcon({ size = 6 }) {
  const baseSize = 6;

  const scale = size / baseSize;

  return (
    <IconContainer>
      <svg width={`${size}rem`} height={`${size}rem`}>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="3%"
            markerHeight="3%"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <line
          x1="8%"
          x2="92%"
          y1="10%"
          y2="10%"
          stroke="black"
          strokeWidth={4 * scale}
        />
        <line
          x1="90%"
          x2="90%"
          y1="10%"
          y2="75%"
          stroke="black"
          strokeWidth={4 * scale}
        />
        <line
          x1="8%"
          x2="75%"
          y1="90%"
          y2="90%"
          stroke="black"
          strokeWidth={4 * scale}
        />
        <line
          x1="10%"
          x2="10%"
          y1="10%"
          y2="90%"
          stroke="black"
          strokeWidth={4 * scale}
        />
        <line
          x1="90%"
          x2="90%"
          y1="100%"
          y2="85%"
          stroke="black"
          strokeWidth={5 * scale}
          markerEnd="url(#arrow)"
        />
        <GrYoga x="22%" y="15%" fontSize="75%" />
        <line
          x1="10%"
          x2="90%"
          y1="70%"
          y2="70%"
          stroke="black"
          strokeWidth={2 * scale}
        />
      </svg>
    </IconContainer>
  );
}

export default UploadIcon;
