import MenuBar from "../MenuBar/MenuBar.jsx";
import HomeWidgets from "../Widgets/HomeWidgets.jsx";
import WindowManager from "../Window/WindowManager.jsx";
import Dock from "../Dock/Dock.jsx";

export default function Desktop() {
  return (
    <>
      <MenuBar />
      <HomeWidgets />
      <WindowManager />
      <Dock />
    </>
  );
}
