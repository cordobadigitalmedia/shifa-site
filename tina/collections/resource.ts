import { Collection } from "tinacms"

import { resourceTypes } from "./common"

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
      name: "resourceType",
      label: "Resource Section Type",
      type: "reference",
      collections: ["resourceType"],
    },
    {
      name: "items",
      label: "Resource Items",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.itemTitle }
        },
      },
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
      ],
    },
  ],
}

export const ResourceTypeCollection: Collection = {
  name: "resourceType",
  label: "Resource Types",
  path: "content/resourceTypes",
  format: "md",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "string",
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
  ],
}
