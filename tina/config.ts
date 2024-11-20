import { defineConfig } from "tinacms"

import { PageCollection } from "./collections/page"
import { AuthorCollection, PostCollection } from "./collections/post"
import { QACollection } from "./collections/question-answer"
import { ResourceCollection } from "./collections/resource"
import {
  FooterCollection,
  HeaderCollection,
  NavCollection,
} from "./collections/wrapper"

//Collection for advice and faq - list of Q/A fields
// Question, answer - RT, topic - string of existing values

//Collection for lessons - list of lesson fields
// title, content - RT, topic - string of existing values

//Collection of resources,
//Resource title
//List of resources - title, content, topic

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
      PostCollection,
      AuthorCollection,
      NavCollection,
      HeaderCollection,
      FooterCollection,
    ],
  },
})
