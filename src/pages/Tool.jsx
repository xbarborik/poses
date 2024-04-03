import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsImageSet, setImage } from "../features/canvas/canvasSlice";
import Menu from "../ui/Menu";
import Opacity from "../ui/Opacity";
import Focus from "../features/tools/Focus";
import Canvas from "../features/canvas/Canvas";
import Palette from "../features/stylePanel/Palette";
import Toolbar from "../features/toolbar/Toolbar";
import TopBar from "../ui/TopBar";
import Main from "../ui/Main";
import BottomBar from "../ui/BottomBar";
import UndoRedo from "../features/history/UndoRedo";
import { useParams } from "react-router";
import { setShowStyling } from "../features/stylePanel/styleSlice";
import { loadFromId } from "../utils/supabaseClient";
import Loader from "../ui/Loader";

function Tool() {
  const isImageSet = useSelector(getIsImageSet);
  const [isLoading, setIsLoading] = useState(false);
  const stageRef = useRef(null);
  const dispatch = useDispatch();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const poses = await loadFromId(id);

      if (poses === null) {
        console.log("failed");
      } else {
        const pose = poses[0];

        const objectsWithRelativePoints = Object.entries(pose.objects).reduce(
          (acc, [key, object]) => {
            const adjustedPoints = object.points.map((point, index) =>
              index % 2 === 0
                ? point / pose.originalSize.width
                : point / pose.originalSize.height
            );

            acc[key] = { ...object, points: adjustedPoints };
            return acc;
          },
          {}
        );

        const withRelativePoints = {
          ...pose,
          objects: objectsWithRelativePoints,
        };

        console.log(withRelativePoints);
        // console.log(pose.objects);
        // dispatch(setImage(pose));
        dispatch(setImage(withRelativePoints));
        dispatch(setShowStyling(true));
      }
      setIsLoading(false);
    }

    if (id) load();
  }, [id, dispatch]);

  return (
    <>
      <TopBar>
        <Palette />
      </TopBar>

      <Main stageRef={stageRef}>
        {!isImageSet || isLoading ? (
          <Loader />
        ) : (
          <Canvas stageRef={stageRef} setImageSize={setImageSize} />
        )}
        <Toolbar>
          <UndoRedo />
        </Toolbar>
      </Main>

      {isImageSet ? <BottomBar>{/* <Navigation /> */}</BottomBar> : null}
      <Menu stageRef={stageRef} imageSize={imageSize} />
      <Opacity />
      <Focus />
      {/* <CompleteMenu /> */}
    </>
  );
}

export default Tool;
