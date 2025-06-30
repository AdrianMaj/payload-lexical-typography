import { useEffect, useRef } from "react";

export const usePreventInlineToolbarClose = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleSelectionChange = (e: Event) => {
      const activeElement = document.activeElement;
      if (activeElement && container.contains(activeElement)) {
        e.stopImmediatePropagation();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (container.contains(e.target as Node)) {
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange, true);
    document.addEventListener("mouseup", handleMouseUp, true);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange, true);
      document.removeEventListener("mouseup", handleMouseUp, true);
    };
  }, []);

  const handleInputInteraction = (e: React.FocusEvent | React.MouseEvent) => {
    e.stopPropagation();

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      (e.currentTarget as HTMLElement).dataset.editorRange = JSON.stringify({
        startContainer: range.startContainer.textContent,
        startOffset: range.startOffset,
        endContainer: range.endContainer.textContent,
        endOffset: range.endOffset,
      });
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (!containerRef.current?.contains(activeElement)) {
        const rangeData = (e.currentTarget as HTMLElement).dataset.editorRange;
        if (rangeData) {
          delete (e.currentTarget as HTMLElement).dataset.editorRange;
        }
      }
    }, 10);
  };

  const containerProps = {
    ref: containerRef,
    onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
    onMouseMove: (e: React.MouseEvent) => e.stopPropagation(),
  };

  const inputProps = {
    onFocus: handleInputInteraction,
    onBlur: handleInputBlur,
    onMouseDown: handleInputInteraction,
  };

  return {
    containerProps,
    inputProps,
  };
};
