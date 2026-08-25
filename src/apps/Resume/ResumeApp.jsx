import { Download, FileText } from "lucide-react";
import styles from "./ResumeApp.module.css";

const CV_URL = "/jenny-le-cv.pdf";

export default function ResumeApp() {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = CV_URL;
    a.download = "Jenny_Le_CV.pdf";
    a.click();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <span className={styles.fileName}>
          <FileText size={15} /> jenny-le-cv.pdf
        </span>
        <button className={styles.download} onClick={handleDownload}>
          <Download size={15} /> Download
        </button>
      </div>
      <div className={styles.viewer}>
        <iframe
          src={CV_URL}
          title="Jenny Le CV"
          className={styles.frame}
        />
      </div>
    </div>
  );
}
