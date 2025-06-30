import { useState, useEffect, useRef, type ChangeEvent } from "react";

import { usePreventInlineToolbarClose } from "../../../utils/usePreventInlineToolbarClose";
import { type TextSizeFeatureProps } from "../feature.client";

export const SizePicker = ({
  size,
  onChange,
  hideAttribution,
  sizes,
  method = "replace",
  scroll = true,
  customSize = true,
}: {
  size: string;
  onChange: (size: string) => void;
} & TextSizeFeatureProps) => {
  const isEditingRef = useRef(false);
  const { containerProps, inputProps } = usePreventInlineToolbarClose();

  const defaultSizeOptions = [
    { value: "0.875rem", label: "Small" },
    { value: "1.25rem", label: "Normal" },
    { value: "1.875rem", label: "Large" },
    { value: "3rem", label: "Huge" },
  ];

  const options =
    method === "replace" ? (sizes ?? defaultSizeOptions) : [...defaultSizeOptions, ...(sizes ?? [])];

  const units = ["px", "rem", "em", "vh", "vw", "%"];

  const [displayValue, setDisplayValue] = useState(size || "");
  const [appliedValue, setAppliedValue] = useState(size || "");

  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customNumberValue, setCustomNumberValue] = useState("");
  const [customUnit, setCustomUnit] = useState("px");

  const parseSizeValue = (sizeVal: string) => {
    const numericPart = parseFloat(sizeVal.replace(/[^0-9.]/g, ""));
    const unitPart = sizeVal.replace(/[0-9.]/g, "");
    return {
      number: isNaN(numericPart) ? "" : numericPart.toString(),
      unit: units.includes(unitPart) ? unitPart : "px",
    };
  };

  useEffect(() => {
    if (isEditingRef.current) return;

    if (!size) {
      setDisplayValue("");
      setAppliedValue("");
      setIsCustomMode(true);
      setCustomNumberValue("");
      setCustomUnit("px");
      return;
    }

    setDisplayValue(size);
    setAppliedValue(size);
    const { number, unit } = parseSizeValue(size);
    setCustomNumberValue(number);
    setCustomUnit(unit);

    const matchingOption = options.find((option) => option.value === size);
    setIsCustomMode(!matchingOption);
  }, [size, options]);

  const handleSizeSelect = (value: string) => {
    setDisplayValue(value);
    setAppliedValue(value);
    onChange(value);
    setIsCustomMode(false);

    const { number, unit } = parseSizeValue(value);
    setCustomNumberValue(number);
    setCustomUnit(unit);
  };

  const handleCustomNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isEditingRef.current = true;

    const numValue = e.target.value;
    setCustomNumberValue(numValue);

    const newValue = `${numValue}${customUnit}`;
    setDisplayValue(newValue);
    setIsCustomMode(true);
  };

  const handleCustomUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isEditingRef.current = true;

    const unitValue = e.target.value;
    setCustomUnit(unitValue);

    const newValue = `${customNumberValue}${unitValue}`;
    setDisplayValue(newValue);
    setIsCustomMode(true);
  };

  const applyCustomSize = () => {
    isEditingRef.current = false;
    setAppliedValue(displayValue);
    onChange(displayValue);
  };

  const handleReset = () => {
    isEditingRef.current = false;
    setDisplayValue("");
    setAppliedValue("");
    setCustomNumberValue("");
    setCustomUnit("px");
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
          gridTemplateColumns: "1fr 1fr",
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
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSizeSelect(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {customSize && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "8px" }}>Custom: </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "140px",
            }}
          >
            <div
              className="field-type number"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ flex: 1 }}
            >
              <input
                style={{
                  width: "100%",
                  margin: "8px 0",
                  borderRight: "0",
                  height: "25px",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  paddingTop: "0",
                  paddingBottom: "1px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                }}
                type="number"
                min={1}
                max={999}
                value={customNumberValue}
                onChange={handleCustomNumberChange}
                onClick={(e) => e.stopPropagation()}
                {...inputProps}
              />
            </div>
            <select
              value={customUnit}
              onChange={handleCustomUnitChange}
              onClick={(e) => e.stopPropagation()}
              style={{
                paddingLeft: "4px",
                paddingRight: "4px",
                width: "56px",
                boxShadow: "0 2px 2px -1px #0000001a",
                fontFamily: "var(--font-body)",
                border: "1px solid var(--theme-elevation-150)",
                borderRadius: "var(--style-radius-s)",
                background: "var(--theme-input-bg)",
                color: "var(--theme-elevation-800)",
                fontSize: "1rem",
                height: "25px",
                lineHeight: "20px",
                transitionProperty: "border, box-shadow, background-color",
                transitionDuration: ".1s, .1s, .5s",
                transitionTimingFunction: "cubic-bezier(0,.2,.2,1)",
                borderLeft: "0",
                transform: "translateX(-1px)",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                outline: "none",
              }}
            >
              {units.map((unit, index) => (
                <option key={`${unit}-${index}`} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
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
        {customSize && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              applyCustomSize();
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
