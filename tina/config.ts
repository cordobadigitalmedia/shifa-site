import { defineConfig } from "tinacms"

import { FormCollection } from "./collections/form"
import { PageCollection } from "./collections/page"
import { AuthorCollection, PostCollection } from "./collections/post"
import { QACollection } from "./collections/question-answer"
import {
  ResourceCollection,
  ResourceTypeCollection,
} from "./collections/resource"
import {
  FooterCollection,
  HeaderCollection,
  NavCollection,
} from "./collections/wrapper"

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
    },
    accept: ["image"],
  },
  schema: {
    collections: [
      PageCollection,
      QACollection,
      ResourceCollection,
      ResourceTypeCollection,
      FormCollection,
      PostCollection,
      AuthorCollection,
      NavCollection,
      HeaderCollection,
      FooterCollection,
    ],
  },
})
