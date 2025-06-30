import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { usePreventInlineToolbarClose } from "../../../utils/usePreventInlineToolbarClose";
import { type TextColorFeatureProps } from "../feature.client";

const injectStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = `
        div.react-colorful .react-colorful__pointer {
            width: 20px;
            height: 20px;
        }
        div.react-colorful .react-colorful__hue {
            height: 22px;
        }
    `;
  document.head.appendChild(style);
};

export const TextColorPicker = ({
  color,
  applyColor,
  onChange,
  colors = [],
  hideAttribution = false,
  colorPicker = true,
  listView,
  handleReset,
}: {
  color: string;
  applyColor: (color?: string) => void;
  onChange: (color: string) => void;
  handleReset: () => void;
} & TextColorFeatureProps) => {
  const { containerProps, inputProps } = usePreventInlineToolbarClose();
  const [predefinedColors, setPredefinedColors] = useState(true);

  useEffect(() => {
    injectStyles();
  }, []);

  const isGridView = listView === false || (listView !== true && typeof colors[0] === "string");

  return (
    <div
      {...containerProps}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "165px",
        width: "100%",
      }}
    >
      {!predefinedColors && colorPicker ? (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            width: "100%",
            paddingTop: "8px",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingBottom: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <HexColorPicker
            style={{
              maxWidth: "100%",
              height: "min-content",
              aspectRatio: "1",
            }}
            color={color}
            onChange={onChange}
          />
          <div className="field-type text">
            <input
              style={{
                width: "100%",
                margin: "8px 0",
                height: "25px",
                paddingTop: "0",
                paddingBottom: "1px",
                paddingLeft: "10px",
              }}
              type="text"
              value={color}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(e.target.value);
              }}
              {...inputProps}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: isGridView ? "grid" : "flex",
            gridTemplateColumns: isGridView ? "repeat(5, 1fr)" : undefined,
            flexDirection: isGridView ? undefined : "column",
            gap: isGridView ? "4px" : "6px",
            padding: "8px",
            overflowY: isGridView ? undefined : "auto",
            maxHeight: isGridView ? undefined : "266px",
          }}
        >
          {colors.map((unionC) => {
            const c = typeof unionC === "string" ? unionC : unionC.value;
            return (
              <button
                key={c}
                onClick={() => {
                  applyColor(c);
                }}
                style={{
                  display: "flex",
                  gap: isGridView ? "4px" : "6px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    backgroundColor: c,
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border:
                      color === c
                        ? "2px solid var(--theme-elevation-900)"
                        : "2px solid var(--theme-elevation-150)",
                  }}
                />
                {!isGridView && <span>{typeof unionC === "string" ? unionC : unionC.label}</span>}
              </button>
            );
          })}
          <button
            onClick={() => handleReset()}
            style={{
              display: "flex",
              gap: isGridView ? "4px" : "6px",
              alignItems: "center",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: "0",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                border: "2px solid var(--theme-elevation-150)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#FF0000",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%) rotate(45deg)",
                }}
              />
            </div>
            {!isGridView && <span>Reset</span>}
          </button>
        </div>
      )}
      {!predefinedColors && (
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
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              applyColor();
            }}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            style={{ marginLeft: "auto", margin: "0", cursor: "pointer", flex: 1 }}
          >
            Apply
          </button>
        </div>
      )}
      <div
        style={{
          width: "100%",
          padding: "8px",
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {colorPicker && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPredefinedColors((prev) => !prev);
            }}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            style={{
              margin: 0,
            }}
          >
            {predefinedColors ? "Color picker" : "Predefined colors"}
          </button>
        )}
        {!hideAttribution && (
          <p
            style={{
              color: "var(--theme-elevation-650)",
              fontSize: "10px",
            }}
          >
            Made with ❤️ by{" "}
            <a target="_blank" href="https://github.com/AdrianMaj">
              @AdrianMaj
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
