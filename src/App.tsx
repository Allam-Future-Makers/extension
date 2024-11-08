import React, { useState, useEffect, useRef } from "react";
import Popup from "./Popup";

const App: React.FC = () => {
  const [popupData, setPopupData] = useState<{
    text: string;
    position: { top: number; left: number };
  } | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleSelection = () => {
    const selection = window.getSelection();

    if (selection) {
      const selectedText = selection.toString();
      if (selectedText.trim().length === 0) return;
      const range = selection.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      // Start at the container of the range and find a valid HTMLElement ancestor
      let parentElement = range.startContainer as Node;
      while (parentElement && !(parentElement instanceof HTMLElement)) {
        parentElement = parentElement.parentNode as Node;
      }

      // Check if the selection is inside an element with ID "aqsa"
      if (
        parentElement instanceof HTMLElement &&
        parentElement.closest("#aqsa")
      ) {
        return; // Ignore selection if it's within #aqsa
      }

      if (rect) {
        setPopupData({
          text: selectedText,
          position: {
            top: rect.top + window.scrollY - 40,
            left: rect.left + window.scrollX + rect.width / 2,
          },
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  const closePopup = () => setPopupData(null);

  return (
    <>
      {popupData && (
        <Popup
          ref={popupRef}
          text={popupData.text}
          position={popupData.position}
          onClose={closePopup}
        />
      )}
    </>
  );
};

export default App;
