/**
 * File: GalleryList.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Renders a grid of Cards
 */

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllPoses } from "../../utils/supabaseAPI";
import { themes } from "../../utils/themes";
import Loader from "../../ui/Loader";
import Card from "./Card";

const StyledGalleryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 10px;
  padding: 1rem;
  background-color: ${themes.background};
  border-radius: 15px;
  grid-auto-rows: 1fr;
`;

const CenteredLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: ${themes.background};
  border-radius: 15px;
`;

const StyledHeading = styled.h2`
  text-align: center;
  color: black;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: ${themes.background};
  border-radius: 15px;
`;

function GalleryList() {
  const [poses, setPoses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPoses() {
      setIsLoading(true);
      const result = await fetchAllPoses();
      if (result) {
        setPoses(result);
      } else {
        setPoses([]);
      }

      setIsLoading(false);
    }

    fetchPoses();
  }, []);

  function handleOpen(id) {
    navigate(`image/${id}`);
  }

  return (
    <>
      {isLoading ? (
        <CenteredLoader>
          <Loader />
        </CenteredLoader>
      ) : poses.length === 0 ? (
        <CenteredLoader>
          <StyledHeading>Nemáte ještě žádné nahraté fotky</StyledHeading>
        </CenteredLoader>
      ) : (
        <StyledGalleryList>
          {poses.map((pose) => {
            return (
              <Card
                key={pose.id}
                onClick={() => handleOpen(pose.id)}
                image={pose.path + ".png"}
              />
            );
          })}
        </StyledGalleryList>
      )}
    </>
  );
}

export default GalleryList;
