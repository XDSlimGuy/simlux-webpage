import PreviewReady from "./preview-ready";

export default function Template({ children }) {
  return <div className="route-transition">{children}<PreviewReady /></div>;
}
