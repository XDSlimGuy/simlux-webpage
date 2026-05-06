import "./index.css";
import { Composition, Folder } from "remotion";
import {
  OfficeLedLookaround,
  ProductCarouselScene,
  SimluxDemoVideo,
} from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Scenes">
        <Composition
          id="OfficeLedLookaround"
          component={OfficeLedLookaround}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ProductCarouselScene"
          component={ProductCarouselScene}
          durationInFrames={240}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Composition
        id="SimluxDemoVideo"
        component={SimluxDemoVideo}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
