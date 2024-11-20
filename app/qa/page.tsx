import client from "@/tina/__generated__/client"

import { QAIndexPageComponent } from "@/components/app/qa-list-page"

export default async function QAIndexPage() {
  const result = await client.queries.QuestionAnswerWrapperConnection()
  return <QAIndexPageComponent {...result} />
}
