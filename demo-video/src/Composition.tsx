import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const clampInterpolate = (
  frame: number,
  input: [number, number],
  output: [number, number],
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

const accentLights = [
  { left: 236, top: 172, width: 1180, rotate: -6, delay: 0 },
  { left: 1220, top: 286, width: 560, rotate: 4, delay: 16 },
  { left: 392, top: 352, width: 430, rotate: 90, delay: 28 },
  { left: 1472, top: 362, width: 410, rotate: 90, delay: 38 },
  { left: 702, top: 432, width: 548, rotate: 0, delay: 54 },
];

const productTiles = [
  {
    label: "Recessed linear profile",
    src: "products/recessed-linear-profile-wall.jpg",
    x: 318,
    y: 472,
    delay: 62,
  },
  {
    label: "Decorative wall bars",
    src: "products/warm-wall-light-bars.jpg",
    x: 1276,
    y: 568,
    delay: 82,
  },
  {
    label: "Aluminum LED channel",
    src: "products/silver-led-channel-profile.jpg",
    x: 830,
    y: 640,
    delay: 100,
  },
  {
    label: "Flexible white neon",
    src: "products/flexible-white-neon-loop.jpg",
    x: 586,
    y: 508,
    delay: 116,
  },
  {
    label: "Undercabinet LED strip",
    src: "products/generated-undercabinet-led-strip.png",
    x: 1478,
    y: 438,
    delay: 132,
  },
];

const carouselProducts = [
  { label: "RGB neon strip", src: "products/rgb-neon-top-bending.jpg" },
  { label: "Linear profile wall", src: "products/recessed-linear-profile-wall.jpg" },
  { label: "Flexible white neon", src: "products/flexible-white-neon-loop.jpg" },
  { label: "Aluminum strip channel", src: "products/aluminum-strip-channel-leds.jpg" },
  { label: "Warm wall bars", src: "products/warm-wall-light-bars.jpg" },
  { label: "Tube triangle light", src: "products/rgb-tube-triangle.jpg" },
  { label: "Showroom neon", src: "products/generated-flex-neon-showroom.png" },
  { label: "Recessed LED profile", src: "products/generated-recessed-led-profile.png" },
  { label: "Undercabinet LED strip", src: "products/generated-undercabinet-led-strip.png" },
  { label: "Pendant installation", src: "products/neon-pendant-installation.jpg" },
  { label: "Application collage", src: "products/led-application-collage.jpg" },
];

const LedStrip: React.FC<{
  frame: number;
  left: number;
  top: number;
  width: number;
  rotate: number;
  delay: number;
}> = ({ frame, left, top, width, rotate, delay }) => {
  const reveal = clampInterpolate(frame, [delay, delay + 42], [0, 1]);
  const shimmer = Math.sin((frame - delay) / 9) * 0.12 + 0.88;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height: 18,
        transform: `rotate(${rotate}deg) scaleX(${reveal})`,
        transformOrigin: "left center",
        borderRadius: 99,
        background:
          "linear-gradient(90deg, rgba(255,251,230,0.7), #fff5b7 45%, #9ff7ff)",
        boxShadow: `0 0 ${42 * shimmer}px rgba(130, 247, 255, ${0.55 * reveal}), 0 0 ${
          90 * shimmer
        }px rgba(255, 220, 120, ${0.32 * reveal})`,
        opacity: reveal,
      }}
    />
  );
};

const ProductTile: React.FC<{
  frame: number;
  label: string;
  src: string;
  x: number;
  y: number;
  delay: number;
}> = ({ frame, label, src, x, y, delay }) => {
  const appear = clampInterpolate(frame, [delay, delay + 24], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 262,
        height: 218,
        padding: 12,
        borderRadius: 8,
        background: "rgba(6, 18, 21, 0.82)",
        border: "1px solid rgba(190, 244, 244, 0.32)",
        boxShadow: "0 20px 64px rgba(0, 0, 0, 0.42)",
        opacity: appear,
        transform: `translateY(${(1 - appear) * 34}px)`,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: 136,
          objectFit: "cover",
          borderRadius: 6,
          filter: "saturate(1.06) contrast(1.04)",
        }}
      />
      <div
        style={{
          marginTop: 14,
          color: "#f8fbf5",
          fontSize: 21,
          fontWeight: 650,
          lineHeight: 1.05,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const OfficeLedLookaround: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;

  const intro = clampInterpolate(frame, [0, 34], [0, 1]);
  const cameraX = interpolate(frame, [0, 92, 186, 299], [-120, 86, -34, 74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const cameraY = interpolate(frame, [0, 120, 299], [34, -28, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const cameraScale = interpolate(frame, [0, 130, 299], [1.08, 1.16, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const headline = clampInterpolate(frame, [34, 64], [0, 1]);
  const endGlow = clampInterpolate(frame, [220, 284], [0, 1]);

  return (
    <AbsoluteFill style={{ background: "#071015", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(255, 232, 161, 0.16), transparent 28%), radial-gradient(circle at 76% 42%, rgba(109, 241, 255, 0.18), transparent 34%), linear-gradient(180deg, #0f1b1b 0%, #102022 45%, #071015 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -90,
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -180,
            top: 0,
            width: 2300,
            height: 392,
            background:
              "linear-gradient(150deg, #203036 0%, #172528 36%, #2f2b22 37%, #181f20 72%, #0d1619 100%)",
            clipPath: "polygon(0 0, 100% 0, 91% 100%, 9% 100%)",
          }}
        />
        {[0, 1, 2, 3, 4, 5].map((slat) => (
          <div
            key={`ceiling-${slat}`}
            style={{
              position: "absolute",
              left: 260 + slat * 268,
              top: 44 + slat * 5,
              width: 34,
              height: 315,
              background: "linear-gradient(180deg, rgba(255, 226, 160, 0.34), rgba(255,255,255,0.03))",
              transform: "skewX(-22deg)",
              opacity: 0.72,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: -130,
            top: 366,
            width: 2220,
            height: 714,
            background:
              "linear-gradient(90deg, #111d20 0%, #1d2b2e 22%, #253231 47%, #1b292e 72%, #0d171b 100%)",
            clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 246,
            top: 330,
            width: 1450,
            height: 420,
            borderRadius: 22,
            background:
              "linear-gradient(120deg, rgba(32, 48, 48, 0.92), rgba(17, 27, 28, 0.7)), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 118px)",
            border: "1px solid rgba(255, 236, 182, 0.14)",
            boxShadow: "inset 0 0 90px rgba(142, 247, 255, 0.08), 0 32px 120px rgba(0,0,0,0.32)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 676,
            top: 300,
            width: 590,
            height: 484,
            borderRadius: 34,
            background:
              "linear-gradient(180deg, rgba(241, 222, 168, 0.16), rgba(20, 33, 35, 0.2))",
            border: "1px solid rgba(255, 235, 182, 0.28)",
            boxShadow: "0 0 90px rgba(255, 231, 160, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -280,
            top: 760,
            width: 2500,
            height: 420,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 30%), repeating-linear-gradient(96deg, #111a1d 0 58px, #1e2a2d 58px 116px)",
            transform: "perspective(740px) rotateX(58deg)",
            transformOrigin: "top center",
            opacity: 0.96,
          }}
        />

        {[0, 1, 2, 3, 4].map((pane) => (
          <div
            key={pane}
            style={{
              position: "absolute",
              left: 300 + pane * 268,
              top: 304,
              width: 178,
              height: 292,
              borderRadius: 18,
              background:
                "linear-gradient(180deg, rgba(122, 193, 195, 0.22), rgba(11, 23, 27, 0.72))",
              border: "1px solid rgba(198, 241, 235, 0.18)",
              boxShadow: "inset 0 0 64px rgba(123, 244, 255, 0.1)",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: 702,
            top: 510,
            width: 548,
            height: 112,
            borderRadius: 8,
            background: "rgba(7, 15, 16, 0.78)",
            border: "1px solid rgba(255, 235, 182, 0.12)",
            boxShadow: "0 0 58px rgba(255, 230, 160, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 892,
            top: 612,
            width: 166,
            height: 166,
            background: "linear-gradient(180deg, #283536, #121c1f)",
            clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 578,
            top: 780,
            width: 816,
            height: 90,
            borderRadius: "50%",
            background: "rgba(9, 16, 18, 0.58)",
            filter: "blur(2px)",
          }}
        />

        {accentLights.map((light) => (
          <LedStrip key={`${light.left}-${light.top}`} frame={frame} {...light} />
        ))}

        {productTiles.map((tile) => (
          <ProductTile key={tile.label} frame={frame} {...tile} />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(3, 7, 9, 0.42), transparent 24%, transparent 72%, rgba(3, 7, 9, 0.44)), radial-gradient(circle at 50% 50%, transparent 54%, rgba(0,0,0,0.48))",
          opacity: 0.85,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 76,
          top: 58,
          width: 282,
          opacity: intro,
          transform: `translateY(${(1 - intro) * -18}px)`,
        }}
      >
        <Img src={staticFile("brand/simlux-full-transparent.png")} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 90,
          bottom: 84,
          width: 680,
          opacity: headline,
          transform: `translateY(${(1 - headline) * 36}px)`,
        }}
      >
        <div
          style={{
            color: "#9ef8f1",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "uppercase",
          }}
        >
          Decorative LED office lighting
        </div>
        <div
          style={{
            marginTop: 14,
            color: "#f7fbf4",
            fontSize: 70,
            fontWeight: 760,
            lineHeight: 0.96,
          }}
        >
          A brighter first impression for modern interiors
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 78,
          bottom: 72,
          width: 414,
          padding: "24px 28px",
          borderRadius: 8,
          border: "1px solid rgba(159, 247, 255, 0.26)",
          background: "rgba(7, 16, 20, 0.72)",
          color: "#f7fbf4",
          opacity: endGlow,
          transform: `translateX(${(1 - endGlow) * 34}px)`,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 720 }}>Profiles, neon, strips</div>
        <div style={{ marginTop: 8, fontSize: 22, color: "#c8d8d4", lineHeight: 1.28 }}>
          Integrated lighting for offices, showrooms, walls, ceilings, and bespoke details.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 10,
          background:
            "linear-gradient(90deg, #f8e59d, #9ff7ff, #f8e59d)",
          opacity: 0.6 + Math.sin(seconds * 2.1) * 0.08,
          boxShadow: "0 0 38px rgba(159, 247, 255, 0.42)",
        }}
      />
    </AbsoluteFill>
  );
};

const CarouselCard: React.FC<{
  frame: number;
  index: number;
  focusIndex: number;
  label: string;
  src: string;
}> = ({ frame, index, focusIndex, label, src }) => {
  const { fps } = useVideoConfig();
  const stopBase = clampInterpolate(frame, [118, 174], [0, 1]);
  const settleSpring = spring({
    frame: frame - 118,
    fps,
    config: {
      damping: 14,
      mass: 0.9,
      stiffness: 72,
    },
  });
  const zoomBase = clampInterpolate(frame, [150, 210], [0, 1]);
  const zoomSpring = spring({
    frame: frame - 150,
    fps,
    config: {
      damping: 13,
      mass: 0.75,
      stiffness: 84,
    },
  });
  const stop = Math.min(Math.max(stopBase * 0.5 + settleSpring * 0.5, 0), 1.06);
  const zoom = Math.min(Math.max(zoomBase * 0.38 + zoomSpring * 0.62, 0), 1.06);
  const focusOffset = index - focusIndex;
  const movingOffset = index - frame * 0.047;
  const bounceFrame = Math.max(0, frame - 118);
  const stopBounce = Math.sin(bounceFrame * 0.38) * Math.exp(-bounceFrame / 24);
  const settledOffset =
    focusOffset + Math.sign(focusOffset) * stopBounce * 0.16;
  const offset = movingOffset * (1 - stop) + settledOffset * stop;
  const distance = Math.abs(offset);
  const focused = index === focusIndex;
  const focusLift = focused ? zoom : 0;
  const travelBob = Math.sin(frame * 0.2 + index * 0.82) * 9 * (1 - stopBase * 0.55);
  const focusPop = focused ? Math.sin(Math.max(0, frame - 150) * 0.32) * Math.exp(-Math.max(0, frame - 150) / 22) : 0;
  const x = 960 + offset * 286 + focusPop * 18;
  const y = 318 + Math.min(distance, 3) * 24 + focusLift * 206 + travelBob - focusPop * 18;
  const scale =
    (focused ? 1.16 : 0.86) -
    Math.min(distance, 2.7) * 0.09 +
    focusLift * 0.72 +
    Math.abs(focusPop) * 0.05 +
    Math.sin(frame * 0.24 + index) * 0.01 * (1 - stopBase);
  const rotateZ = Math.sin(frame * 0.18 + index * 1.4) * 1.4 * (1 - stopBase) + focusPop * 1.5;
  const rotateY = Math.max(-44, Math.min(44, -offset * 16)) * (1 - focusLift * 0.72);
  const opacity = 1 - Math.min(distance, 4) * 0.16 + focusLift * 0.12;
  const zIndex = Math.round(1000 - distance * 70 + focusLift * 400);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 190,
        top: y - 142,
        width: 380,
        height: 284,
        padding: 14,
        borderRadius: 28,
        background: "rgba(11, 22, 26, 0.86)",
        border: "1px solid rgba(167, 244, 246, 0.3)",
        boxShadow: focused
          ? `0 38px ${88 + zoom * 82}px rgba(109, 238, 255, ${0.24 + zoom * 0.22})`
          : "0 24px 70px rgba(0, 0, 0, 0.34)",
        opacity,
        zIndex,
        transform: `perspective(900px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: 216,
          borderRadius: 20,
          objectFit: "cover",
          filter: "saturate(1.1) contrast(1.05)",
        }}
      />
      <div
        style={{
          height: 42,
          display: "flex",
          alignItems: "center",
          color: "#f8fbf4",
          fontSize: focused ? 24 : 20,
          fontWeight: 720,
          lineHeight: 1.08,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const ProductCarouselScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  const fadeIn = clampInterpolate(frame, [0, 26], [0, 1]);
  const focusIndex = 5;
  const captionIn = clampInterpolate(frame, [168, 218], [0, 1]);
  const sweep = interpolate(frame, [0, 96, 158, 204], [0, 1.08, -0.06, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const energyPulse = 0.5 + Math.sin(seconds * 6.6) * 0.5;

  return (
    <AbsoluteFill style={{ background: "#071015", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(157, 246, 255, 0.18), transparent 36%), linear-gradient(180deg, #101d22 0%, #071015 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 68,
          top: 52,
          width: 238,
          opacity: fadeIn,
        }}
      >
        <Img src={staticFile("brand/simlux-full-transparent.png")} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fadeIn,
          transform: `translateX(${-36 * sweep}px)`,
        }}
      >
        {[0, 1, 2, 3].map((line) => (
          <div
            key={`speed-${line}`}
            style={{
              position: "absolute",
              left: 280 + line * 390 - ((frame * 11 + line * 140) % 380),
              top: 214 + line * 86,
              width: 260,
              height: 3,
              borderRadius: 99,
              background:
                "linear-gradient(90deg, transparent, rgba(142, 249, 255, 0.46), transparent)",
              opacity: (1 - clampInterpolate(frame, [138, 190], [0, 1])) * 0.28,
              transform: "skewX(-20deg)",
            }}
          />
        ))}
        {carouselProducts.map((product, index) => (
          <CarouselCard
            key={product.src}
            frame={frame}
            index={index}
            focusIndex={focusIndex}
            {...product}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 9,
          background: "linear-gradient(90deg, #fff2b8, #8bf9ff, #fff2b8)",
          boxShadow: `0 0 ${42 + energyPulse * 28}px rgba(139, 249, 255, 0.48)`,
          opacity: 0.56 + energyPulse * 0.16,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 108,
          bottom: 82,
          width: 610,
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            color: "#9ef8f1",
            fontSize: 24,
            fontWeight: 720,
            textTransform: "uppercase",
          }}
        >
          Browse the LED collection
        </div>
        <div
          style={{
            marginTop: 12,
            color: "#f7fbf4",
            fontSize: 62,
            fontWeight: 780,
            lineHeight: 0.96,
          }}
        >
          From subtle profiles to vivid neon forms
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 110,
          bottom: 94,
          width: 430,
          padding: "24px 28px",
          borderRadius: 8,
          border: "1px solid rgba(159, 247, 255, 0.26)",
          background: "rgba(7, 16, 20, 0.76)",
          opacity: captionIn,
          transform: `translateY(${(1 - captionIn) * 32}px)`,
        }}
      >
        <div style={{ color: "#f7fbf4", fontSize: 30, fontWeight: 760 }}>
          Selected focus
        </div>
        <div style={{ marginTop: 8, color: "#c8d8d4", fontSize: 22, lineHeight: 1.25 }}>
          The carousel slows, locks onto one product, and brings it forward for a closer look.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SimluxDemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#071015" }}>
      <Sequence durationInFrames={300}>
        <OfficeLedLookaround />
      </Sequence>
      <Sequence from={300} durationInFrames={240}>
        <ProductCarouselScene />
      </Sequence>
    </AbsoluteFill>
  );
};
