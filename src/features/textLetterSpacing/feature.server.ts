import { createServerFeature } from "@payloadcms/richtext-lexical";

import { type TextLetterSpacingFeatureProps } from "./feature.client";

export const TextLetterSpacingFeature = createServerFeature<
  TextLetterSpacingFeatureProps,
  TextLetterSpacingFeatureProps,
  TextLetterSpacingFeatureProps
>({
  feature({ props }) {
    return {
      ClientFeature: "payload-lexical-typography/client#TextLetterSpacingClientFeature",
      clientFeatureProps: {
        hideAttribution: props?.hideAttribution,
        spacings: props?.spacings,
        method: props?.method,
        scroll: props?.scroll,
        customSpacing: props?.customSpacing,
      },
    };
  },
  key: "textLetterSpacing",
});