import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllPoses } from "../../utils/supabaseClient";
import { BASE } from "../../utils/constants";
import { themes } from "../../utils/themes";
import Loader from "../../ui/Loader";

const StyledGalleryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 10px;
  padding: 1rem;
  background-color: ${themes.background};
  border-radius: 15px;
  grid-auto-rows: 1fr;
`;

//https://css-tricks.com/a-grid-of-logos-in-squares/
const Card = styled.div`
  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 5px;
`;

function GalleryList() {
  const [poses, setPoses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPoses() {
      setIsLoading(true);
      const result = await fetchAllPoses();
      setPoses(result);
      setIsLoading(false);
    }

    fetchPoses();
  }, []);

  function handleOpen(id) {
    navigate(`${BASE}image/${id}`);
  }

  return (
    <StyledGalleryList>
      {isLoading ? (
        <Loader />
      ) : (
        poses.map((pose) => {
          return (
            <Card key={pose.id} onClick={() => handleOpen(pose.id)}>
              <Image src={pose.path + ".png"} />
            </Card>
          );
        })
      )}
    </StyledGalleryList>
  );
}

export default GalleryList;
