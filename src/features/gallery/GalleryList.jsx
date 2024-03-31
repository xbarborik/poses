import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllPoses } from "../../utils/supabaseClient";
import { BASE } from "../../utils/constants";

const StyledGalleryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 10px;
  overflow-y: auto;
  padding: 1rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  flex-basis: auto;
`;

const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
  height: 12rem;
  width: 10rem;
  border-radius: 5px;
`;

function GalleryList() {
  const [poses, setPoses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPoses() {
      const result = await fetchAllPoses();
      setPoses(result);
    }

    fetchPoses();
  }, []);

  function handleOpen(id) {
    navigate(`${BASE}${id}`);
  }

  return (
    <StyledGalleryList>
      {poses.map((pose) => {
        return (
          <Card key={pose.id} onClick={() => handleOpen(pose.id)}>
            <Image src={pose.path + ".png"} />
          </Card>
        );
      })}
    </StyledGalleryList>
  );
}

export default GalleryList;
