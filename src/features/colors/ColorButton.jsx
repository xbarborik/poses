import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor, selectColor } from "./colorSlice";

const StyledColorButton = styled.button`
  display: block;
  /* flex: 1; */
  aspect-ratio: 1;
  /* max-width: 2.5rem; */
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.$isActive ? "3px solid #fff" : "3px groove #4e4c4c44"};

  @media only screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

function ColorButton({ color }) {
  const dispatch = useDispatch();
  const activeColor = useSelector(getColor);

  return (
    <StyledColorButton
      name="adjust-color"
      onClick={() => dispatch(selectColor(color))}
      color={color}
      $isActive={color === activeColor}
    />
  );
}

export default ColorButton;
