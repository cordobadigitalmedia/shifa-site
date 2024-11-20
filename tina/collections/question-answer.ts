import { Collection } from "tinacms"

export const QACollection: Collection = {
  name: "qa",
  label: "Question & Answer",
  path: "content/qa",
  format: "mdx",
  fields: [
    {
      name: "qaTitle",
      label: "QA Section Title",
      type: "string",
    },
    {
      name: "qaShort",
      label: "QA Short Title",
      type: "string",
    },
    {
      name: "qaImage",
      label: "QA Image",
      type: "image",
    },
    {
      name: "qa_items",
      label: "QA Items",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.question }
        },
      },
      fields: [
        {
          name: "question",
          label: "Question",
          type: "string",
        },
        {
          name: "answer",
          label: "Answer",
          type: "rich-text",
        },
        {
          name: "asker",
          label: "Questioner",
          type: "string",
        },
      ],
    },
  ],
}
