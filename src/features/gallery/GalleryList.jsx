import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllPoses } from "../../utils/supabaseClient";
import { BASE } from "../../utils/constants";
import { themes } from "../../utils/themes";

const StyledGalleryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 10px;
  padding: 1rem;
  background-color: ${themes.background};
  border-radius: 15px 15px 0 0;
  flex: 5;
`;

const Card = styled.div`
  flex-basis: auto;
  height: 12rem;
  width: 10rem;

  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
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
    navigate(`${BASE}image/${id}`);
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
