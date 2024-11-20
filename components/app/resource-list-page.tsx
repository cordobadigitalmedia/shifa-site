"use client"

import { usePathname } from "next/navigation"
import {
  QuestionAnswerWrapperConnectionQuery,
  ResourceTypeConnectionQuery,
  ResourceTypeWrapperConnectionQuery,
} from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

import { Footer } from "@/components/footer"
import { ResourceTypeList } from "@/components/resource/resource-list"
import { SiteHeader } from "@/components/site-header"

export function ResourceIndexPageComponent(props: {
  data: ResourceTypeWrapperConnectionQuery
  variables: {}
  query: string
}) {
  const { data } = useTina(props)
  const pathname = usePathname()
  const rootPath = pathname.split("/").filter((item) => item !== "")[0]
  const currentLink =
    data.nav.links &&
    data.nav.links.filter((link) => link?.link?.replace(/\//g, "") === rootPath)
  return (
    <>
      <SiteHeader header={data.header} nav={data.nav} />
      <div className="flex min-h-[calc(100vh-90px)] flex-col">
        <div className="grow">
          <div className="container mx-auto p-3">
            <div className="prose max-w-none py-3">
              <h1>
                {Array.isArray(currentLink) && currentLink?.length > 0
                  ? `${currentLink[0]?.label}`
                  : "Advice"}
              </h1>
            </div>
            <ResourceTypeList {...data} />
          </div>
        </div>
        <Footer footer={data.footer} />
      </div>
    </>
  )
}
