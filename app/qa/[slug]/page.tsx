import client from "@/tina/__generated__/client"

import { QAPageComponent } from "@/components/app/qa-page"

export default async function QAPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const result = await client.queries.QuestionAnswerAndWrapper({
    relativePath: `${(await params).slug}.mdx`,
  })
  return <QAPageComponent {...result} />
}

export async function generateStaticParams() {
  const qas = await client.queries.qaConnection()
  const paths = qas.data?.qaConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.breadcrumbs.join(""),
  }))
  return paths || []
}
