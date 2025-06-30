import { useState, useEffect, useRef, type ChangeEvent } from "react";

import { usePreventInlineToolbarClose } from "../../../utils/usePreventInlineToolbarClose";
import { type TextFontFamilyFeatureProps } from "../feature.client";

export const FontFamilyPicker = ({
  fontFamily,
  onChange,
  hideAttribution,
  fontFamilies,
  method = "replace",
  scroll = true,
  customFontFamily = true,
}: {
  fontFamily: string;
  onChange: (fontFamily: string) => void;
} & TextFontFamilyFeatureProps) => {
  const { containerProps, inputProps } = usePreventInlineToolbarClose();
  const isEditingRef = useRef(false);

  const defaultFontFamilyOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Courier New, monospace", label: "Courier New" },
    { value: "Georgia, serif", label: "Georgia" },
  ];

  const options =
    method === "replace"
      ? (fontFamilies ?? defaultFontFamilyOptions)
      : [...defaultFontFamilyOptions, ...(fontFamilies ?? [])];

  const [displayValue, setDisplayValue] = useState(fontFamily || "");
  const [appliedValue, setAppliedValue] = useState(fontFamily || "");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customFontFamilyValue, setCustomFontFamilyValue] = useState("");

  useEffect(() => {
    if (isEditingRef.current) return;

    if (!fontFamily) {
      setDisplayValue("");
      setAppliedValue("");
      setIsCustomMode(true);
      setCustomFontFamilyValue("");
      return;
    }

    setDisplayValue(fontFamily);
    setAppliedValue(fontFamily);
    setCustomFontFamilyValue(fontFamily);

    const matchingOption = options.find((option) => option.value === fontFamily);
    setIsCustomMode(!matchingOption);
  }, [fontFamily, options]);

  const handleFontFamilySelect = (value: string) => {
    setDisplayValue(value);
    setAppliedValue(value);
    onChange(value);
    setIsCustomMode(false);
    setCustomFontFamilyValue(value);
  };

  const handleCustomFontFamilyChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isEditingRef.current = true;

    const value = e.target.value;
    setCustomFontFamilyValue(value);
    setDisplayValue(value);
    setIsCustomMode(true);
  };

  const applyCustomFontFamily = () => {
    isEditingRef.current = false;
    setAppliedValue(displayValue);
    onChange(displayValue);
  };

  const handleReset = () => {
    isEditingRef.current = false;
    setDisplayValue("");
    setAppliedValue("");
    setCustomFontFamilyValue("");
    onChange("");
  };

  return (
    <div
      {...containerProps}
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
          gridTemplateColumns: "1fr",
          gap: "12px",
          maxHeight: scroll && options.length > 4 ? "64px" : "none",
          overflowY: scroll && options.length > 4 ? "auto" : "visible",
          paddingRight: scroll && options.length > 4 ? "8px" : "0",
        }}
      >
        {options.map((option, index) => (
          <button
            key={`${option.value}-${index}`}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            style={{
              cursor: "pointer",
              margin: "0",
              border:
                appliedValue === option.value && !isCustomMode
                  ? "1px solid var(--theme-elevation-900)"
                  : "1px solid transparent",
              fontFamily: option.value,
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFontFamilySelect(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {customFontFamily && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "8px" }}>Custom: </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            <div
              className="field-type text"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ flex: 1 }}
            >
              <input
                style={{
                  width: "100%",
                  margin: "8px 0",
                  height: "25px",
                  paddingTop: "0",
                  paddingBottom: "1px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                }}
                type="text"
                value={customFontFamilyValue}
                onChange={handleCustomFontFamilyChange}
                onClick={(e) => e.stopPropagation()}
                placeholder="e.g. Arial, sans-serif"
                {...inputProps}
              />
            </div>
          </div>
        </div>
      )}
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
        {customFontFamily && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              applyCustomFontFamily();
            }}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            style={{ marginLeft: "auto", margin: "0", cursor: "pointer", flex: 1 }}
          >
            Apply
          </button>
        )}
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
