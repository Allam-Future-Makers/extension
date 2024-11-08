import React, { forwardRef, useEffect, useState } from "react";
import { apiService } from "./api";

interface PopupProps {
  text: string;
  position: { top: number; left: number };
  onClose: () => void;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  ({ text, position, onClose }, ref) => {
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const oneWord = text.split(" ").length === 1;

    useEffect(() => {
      setStyle({
        position: "absolute",
        top: position.top - 60, // Position above the selection
        left: position.left,
        backgroundColor: "#1C1760",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
      });
    }, [position]);

    const handleButtonClick = async (type: string) => {
      setLoading(true);
      setResult(null);

      switch (type) {
        case "Irab":
          const irabRes = await apiService.getIrab(text);
          setLoading(false);
          setResult(
            irabRes.diacratized_sentence +
              "<br>" +
              irabRes.irab_results
                .map((r) => `${r.word}: ${r.irab}`)
                .join("<br>") +
              "<br><br>" +
              irabRes.special_sentences
                .map((s) => `${s.sentence}: ${s.special_irab}`)
                .join("\n")
          );

          break;
        case "MSA":
          const msaRes = await apiService.getMSA(text);
          setLoading(false);
          setResult(msaRes.result);
          break;
        case "Tashkeel":
          const tashkeelRes = await apiService.getTashkeel(text);
          setLoading(false);
          setResult(tashkeelRes.diacritized);
          break;
        case "Mo3gam":
          const mo3gamRes = await apiService.getMo3gam(text);
          setLoading(false);
          setResult(mo3gamRes.answer);
          break;
      }
    };

    return (
      <div style={style} ref={ref}>
        {/* Top bar with close button and title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &times;
          </button>

          {/* Title */}
          <span
            style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
          >
            AQSA
          </span>

          {/* Invisible placeholder for spacing */}
          <div style={{ width: "20px" }}></div>
        </div>

        <div style={{ marginBottom: "8px" }}>{text}</div>

        {/* Button group with spacing */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          {!oneWord && (
            <button
              style={{ margin: "3px" }}
              onClick={() => handleButtonClick("Irab")}
            >
              Irab
            </button>
          )}
          <button
            style={{ margin: "3px" }}
            onClick={() => handleButtonClick("MSA")}
          >
            MSA
          </button>
          {!oneWord && (
            <button
              style={{ margin: "3px" }}
              onClick={() => handleButtonClick("Tashkeel")}
            >
              Tashkeel
            </button>
          )}
          {oneWord && (
            <button
              style={{ margin: "3px" }}
              onClick={() => handleButtonClick("Mo3gam")}
            >
              Mo3gam
            </button>
          )}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            برجاء الانتظار...
          </div>
        )}

        {/* Result display */}
        {result && (
          <div
            style={{
              backgroundColor: "#292B50",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "0.9em",
              marginBottom: "8px",
            }}
            dangerouslySetInnerHTML={{ __html: result }}
          ></div>
        )}
      </div>
    );
  }
);

export default Popup;
