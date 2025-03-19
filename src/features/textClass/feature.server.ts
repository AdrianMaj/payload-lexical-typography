import { createServerFeature } from "@payloadcms/richtext-lexical";

import { type TextClassFeatureProps } from "./feature.client";

export const TextClassFeature = createServerFeature<
  TextClassFeatureProps,
  TextClassFeatureProps,
  TextClassFeatureProps
>({
  feature({ props }) {
    return {
      ClientFeature: "payload-lexical-typography/client#TextClassClientFeature",
      clientFeatureProps: {
        hideAttribution: props?.hideAttribution,
        classes: props?.classes,
        scroll: props?.scroll,
      },
    };
  },
  key: "textClass",
});
