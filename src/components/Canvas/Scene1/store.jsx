import { proxy } from "valtio";

const state = proxy({
  intro: true,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
  color: "#726DE8",
  decal: "1",
});

export { state };
