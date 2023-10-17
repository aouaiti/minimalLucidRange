import ApplicationBar from "./components/applicationBar/AppBar";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { Scene1 } from "./components/Canvas/Scene1/Canvas";
import { Scene2 } from "./components/Canvas/Scene2/App";
import Terms from "./components/Terms/Terms";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <Box id="main">
        <Box
          component={motion.div}
          style={{
            transformOrigin: "top",
            height: "100vh",
          }}
        >
          {/* <RouterProvider router={router} /> */}
          <BrowserRouter>
            <ApplicationBar />
            <Routes>
              {/* <Route path="/" element={<ApplicationBar />} /> */}
              <Route path="/" index element={<Scene1 />} />
              <Route path="/Gallery" element={<Scene2 />} />
              <Route path="/Terms" element={<Terms />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>
      <Loader />
    </>
  );
}
