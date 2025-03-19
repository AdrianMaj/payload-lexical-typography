import { useState, useEffect, useRef } from "react";

import { type TextClassFeatureProps } from "../feature.client";

export const ClassPicker = ({
  className,
  onChange,
  hideAttribution,
  classes,
  scroll = true,
}: {
  className: string;
  onChange: (className: string) => void;
} & TextClassFeatureProps) => {
  const isEditingRef = useRef(false);

  const [appliedValue, setAppliedValue] = useState(className || "");


  useEffect(() => {
    if (isEditingRef.current) return;

    if (!className) {
      setAppliedValue("");
      return;
    }

    setAppliedValue(className);
  }, [className, classes]);

  const handleClassNameSelect = (value: string) => {
    setAppliedValue(value);
    onChange(value);
  };

  const handleReset = () => {
    isEditingRef.current = false;
    setAppliedValue("");
    onChange("");
  };

  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          maxHeight: scroll && classes.length > 4 ? "64px" : "none",
          overflowY: scroll && classes.length > 4 ? "auto" : "visible",
          paddingRight: scroll && classes.length > 4 ? "8px" : "0",
        }}
      >
        {classes.map((option, index) => (
          <button
            key={`${option.value}-${index}`}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            style={{
              cursor: "pointer",
              margin: "0",
              border:
                appliedValue === option.value
                  ? "1px solid var(--theme-elevation-900)"
                  : "1px solid transparent",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClassNameSelect(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleReset();
          }}
          className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
          style={{ marginLeft: "auto", margin: "0", cursor: "pointer", flex: 1 }}
        >
          Reset
        </button>
      </div>

      {!hideAttribution && (
        <p
          style={{
            color: "var(--theme-elevation-650)",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          Made with ❤️ by{" "}
          <a target="_blank" href="https://github.com/AdrianMaj">
            @AdrianMaj
          </a>
        </p>
      )}
    </div>
  );
};
