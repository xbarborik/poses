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
  border-radius: 15px 15px 0 0;
`;

const Card = styled.div`
  height: 10rem;
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
