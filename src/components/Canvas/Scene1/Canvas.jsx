import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Center,
  Float,
  AdaptiveEvents,
  AdaptiveDpr,
  Bvh,
} from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { Overlay } from "./Overlay";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { transform, useSpring } from "framer-motion";

const BgController = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const transformer = transform([0, 1], [0, 1], { clamp: true });
  const { gl } = useThree();
  const spring = useSpring(transformer(themeMode !== "light"), {
    stiffness: 20,
    damping: 10,
  });

  useEffect(() => {
    spring.set(transformer(themeMode === "light"));
  }, [themeMode]);

  useFrame((delta) => {
    gl.setClearColor(0xffffff, spring.get());
  });
  return null;
};

export const Scene1 = memo(({ position = [0, 0, 2.5], fov = 25 }) => {
  return (
    <>
      <Canvas
        className="canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "#303035",
        }}
        shadows
        camera={{ position, fov }}
        gl={{ preserveDrawingBuffer: true }}
        // onPointerMissed={() => (imgState.clicked = null)}
        // eventSource={document.getElementById("root")}
        // eventPrefix="client"
        // gl={{ antialias: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[3, 3, 3]} />
        {/* <color attach="background" args={["#303035"]} /> */}
        <Backdrop />
        <BgController />
        <CameraRig>
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
        {/* <ContactShadows
          position={[0, -0.4, 0]}
          opacity={1}
          scale={7}
          blur={1.5}
        /> */}
        {/* <OrbitControls default /> */}
        <Bvh firstHitOnly></Bvh>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {/* </Suspense> */}
      </Canvas>
      <Overlay />
      {/* <Loader /> */}
    </>
  );
});

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.color,
      0.25,
      delta
    )
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    );
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

function Shirt(props) {
  const tShirt = useRef();
  const decal = useRef();
  const snap = useSnapshot(state);
  const texture = useTexture(`/${snap.decal}.png`);
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    section2part === 0 &&
      easing.damp(tShirt.current.material, "opacity", 1, 0.25, delta) &&
      easing.damp(decal.current.material, "opacity", 1, 0.25, delta);
    section2part !== 0 &&
      easing.damp(tShirt.current.material, "opacity", 0, 0.25, delta) &&
      easing.damp(decal.current.material, "opacity", 0, 0.25, delta);
    // console.log(tShirt.current.material.opacity);
    // console.log(decal.current);
  });
  const currentSection = useSelector((state) => state.currentSection.Section);
  const section2part = useSelector((state) => state.section2.part);
  return (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      // floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh
        ref={tShirt}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        {...props}
        dispose={null}
        material-transparent={true}
        // material-opacity={currentSection === 2 && section2part === 0 ? 1 : 0}
      >
        <Decal
          ref={decal}
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={texture}
          map-anisotropy={16}
          transparent={true}
          // opacity={0.5}
          // material-transparent={true}
        />
      </mesh>
    </Float>
  );
}

useGLTF.preload("/shirt_baked_collapsed.glb");
["/react.png", "/three2.png", "/LR_fill_2.png", "/LR_back_2.png"].forEach(
  useTexture.preload
);
