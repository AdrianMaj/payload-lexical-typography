import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

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
  onChange,
  colors = [],
  hideAttribution = false,
}: {
  color: string;
  onChange: (color: string) => void;
  colors?: string[];
  hideAttribution?: boolean;
}) => {
  const [predefinedColors, setPredefinedColors] = useState(true);

  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "165px",
        width: "100%",
      }}
    >
      {predefinedColors ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "4px",
            padding: "8px",
          }}
        >
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => onChange(c)}
              style={{
                backgroundColor: c,
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                border:
                  color === c
                    ? "2px solid var(--theme-elevation-900)"
                    : "2px solid var(--theme-elevation-150)",
                cursor: "pointer",
              }}
            />
          ))}
          <div
            onClick={() => onChange("")}
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
        </div>
      ) : (
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
            />
          </div>
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
