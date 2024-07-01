/**
 * File: Focus.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Unused component, started development but prototypes showed that this way isn't clear.
 */

import styled from "styled-components";
import { FaCheck, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import eyebrows from "../../assets/eyebrows.png";
import nose from "../../assets/nose.png";
import belly from "../../assets/belly.png";
import hand from "../../assets/hand.png";
import thumb from "../../assets/thumb.png";
import toes from "../../assets/toes.png";
import none from "../../assets/none.png";
import up from "../../assets/up.png";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import { selectTool } from "../toolbar/toolbarSlice";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 15px;
  gap: 1rem;
  background-color: white;
`;

const DropdownMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const DropdownButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
  padding: 0.2rem;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
  width: 3.5rem;
  font-size: 2rem;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 3rem;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 0.4rem;
  border-radius: 5px;
  width: 3rem;
`;

const DropdownItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const PrimaryIcon = styled.span`
  font-size: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const DoneButton = styled.button`
  background-color: #5897ee;
  border: none;
  padding: 0.5rem;
  font-size: 1.2rem;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Watermark = styled.div`
  position: absolute;
  top: 1rem;
  left: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  gap: 0.5rem;
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.65);
  padding: 0.4rem 0.5rem 0.4rem 0.8rem;
  border-radius: 10px;
`;

const Icon = styled.img`
  width: 90%;
`;
const SelectedIcon = styled.img`
  width: 60%;
`;

const gazes = {
  none: none,
  nose: nose,
  eyebrows: eyebrows,
  belly: belly,
  hand: hand,
  thumb: thumb,
  toes: toes,
  up: up,
  left: left,
  right: right,
};

function Focus({ show }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("none");
  const dispatch = useDispatch();

  function handleSelect(option) {
    setSelectedItem(option);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    setIsMenuOpen(false);
  }, [show]);

  return (
    <>
      {selectedItem !== "none" && (
        <Watermark>
          <PrimaryIcon>
            <FaRegEye />
          </PrimaryIcon>
          <SelectedIcon src={gazes[selectedItem]} />
        </Watermark>
      )}
      {show && (
        <Container>
          <PrimaryIcon>
            <FaRegEye />
          </PrimaryIcon>
          <DropdownMenu>
            <DropdownButton onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
              <SelectedIcon src={gazes[selectedItem]} />
              <RiArrowDropDownLine />
            </DropdownButton>
            {isMenuOpen && (
              <DropdownContent>
                <DropdownItem onClick={() => handleSelect("none")}>
                  <Icon src={none} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("nose")}>
                  <Icon src={nose} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("eyebrows")}>
                  <Icon src={eyebrows} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("belly")}>
                  <Icon src={belly} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("hand")}>
                  <Icon src={hand} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("thumb")}>
                  <Icon src={thumb} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("toes")}>
                  <Icon src={toes} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("up")}>
                  <Icon src={up} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("left")}>
                  <Icon src={left} />
                </DropdownItem>
                <DropdownItem onClick={() => handleSelect("right")}>
                  <Icon src={right} />
                </DropdownItem>
              </DropdownContent>
            )}
          </DropdownMenu>
          <DoneButton onClick={() => dispatch(selectTool("none"))}>
            <FaCheck />
          </DoneButton>
        </Container>
      )}
    </>
  );
}

export default Focus;
