"use client"

import { QuestionAnswerWrapperConnectionQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

import { Footer } from "@/components/footer"
import { QAList } from "@/components/qa/qa-list"
import { SiteHeader } from "@/components/site-header"

export function QAIndexPageComponent(props: {
  data: QuestionAnswerWrapperConnectionQuery
  variables: {}
  query: string
}) {
  const { data } = useTina(props)
  return (
    <>
      <SiteHeader header={data.header} nav={data.nav} />
      <div className="flex min-h-[calc(100vh-90px)] flex-col">
        <div className="grow">
          <div className="container mx-auto p-3">
            <div className="prose max-w-none py-3">
              <h1>Advice and FAQ</h1>
            </div>
            <QAList {...data} />
          </div>
        </div>
        <Footer footer={data.footer} />
      </div>
    </>
  )
}
