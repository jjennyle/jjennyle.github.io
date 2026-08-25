import {
  FolderOpen,
  NotebookPen,
  Images,
  User,
  FileText,
  MessageCircle,
  Settings as SettingsIcon,
} from "lucide-react";

import ProjectsApp from "./Projects/ProjectsApp.jsx";
import ProjectDetail from "./Projects/ProjectDetail.jsx";
import JournalApp from "./Journal/JournalApp.jsx";
import GalleryApp from "./Gallery/GalleryApp.jsx";
import AboutApp from "./About/AboutApp.jsx";
import ResumeApp from "./Resume/ResumeApp.jsx";
import ContactApp from "./Contact/ContactApp.jsx";
import SettingsApp from "./Settings/SettingsApp.jsx";

/* Visible apps — appear on the desktop & dock. */
export const apps = [
  { id: "projects", title: "Projects", icon: FolderOpen, component: ProjectsApp, singleton: true, size: { w: 880, h: 620 } },
  { id: "journal", title: "Journal", icon: NotebookPen, component: JournalApp, singleton: true, size: { w: 820, h: 600 } },
  { id: "gallery", title: "Gallery", icon: Images, component: GalleryApp, singleton: true, size: { w: 900, h: 640 } },
  { id: "about", title: "About", icon: User, component: AboutApp, singleton: true, size: { w: 760, h: 640 } },
  { id: "resume", title: "Resume", icon: FileText, component: ResumeApp, singleton: true, size: { w: 760, h: 660 } },
  { id: "contact", title: "Contact", icon: MessageCircle, component: ContactApp, singleton: true, size: { w: 400, h: 460 } },
  { id: "settings", title: "Settings", icon: SettingsIcon, component: SettingsApp, singleton: true, size: { w: 660, h: 640 } },
];

/* Hidden app — project case-study windows spawned from Projects.app */
export const projectDetailApp = {
  id: "project",
  title: "Project",
  icon: FolderOpen,
  component: ProjectDetail,
  singleton: false,
  size: { w: 760, h: 680 },
};

const all = [...apps, projectDetailApp];
export const getApp = (id) => all.find((a) => a.id === id);

/* Which apps appear in the dock */
export const dockApps = ["about", "projects", "journal", "gallery", "resume", "contact", "settings"];
