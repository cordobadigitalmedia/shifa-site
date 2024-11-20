import { Collection } from "tinacms"

import { Topics } from "../lib"

export const ResourceCollection: Collection = {
  name: "resource",
  label: "Resources",
  path: "content/resources",
  format: "mdx",
  fields: [
    {
      name: "resourceTitle",
      label: "Resources Section Title",
      type: "string",
    },
    {
      name: "items",
      label: "Resource Items",
      type: "object",
      list: true,
      fields: [
        {
          name: "itemTitle",
          label: "Resource Item Title",
          type: "string",
        },
        {
          name: "itemContent",
          label: "Resource Item Content",
          type: "rich-text",
        },
        {
          name: "itemTopic",
          label: "Resource Topic",
          type: "string",
          options: Topics,
        },
      ],
    },
  ],
}
