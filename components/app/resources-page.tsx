"use client"

import { useState } from "react"
import Image from "next/image"
import { ResourceWrapperConnectionQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Footer as FooterNav } from "@/components/footer"
import { ResourceTypeList } from "@/components/resource/resource-type-list"
import { SiteHeader } from "@/components/site-header"

export function ResourcesPageComponent({
  props,
  type,
}: {
  props: {
    data: ResourceWrapperConnectionQuery
    variables: {}
    query: string
  }
  type: string
}) {
  const { data } = useTina(props)
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const handleItemChange = (value: string) => {
    setSelectedItem(Number(value))
  }
  const resources = data.resourceConnection.edges?.filter(
    (item) => item?.node?.resourceType?._sys.breadcrumbs.join("/") === type
  )
  const description = resources?.[0]?.node?.resourceType?.typeDescription
  const backgroundImage = resources?.[0]?.node?.resourceType?.image
    ? resources?.[0]?.node?.resourceType?.image
    : "none"
  return (
    <>
      <SiteHeader header={data.header} nav={data.nav} />
      <div className="flex min-h-[calc(100vh-50px)] flex-col md:min-h-[calc(100vh-90px)]">
        <div className="grow">
          {backgroundImage !== "none" && (
            <section className={`relative h-[35vh]`}>
              <Image
                alt={resources?.[0]?.node?.resourceType?.name as string}
                className={`size-full object-cover`}
                height={1080}
                src={backgroundImage}
                style={{
                  aspectRatio: "1920/1080",
                  objectFit: "cover",
                }}
                data-tina-field={tinaField(
                  resources?.[0]?.node?.resourceType,
                  "image"
                )}
                width={1920}
              />
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50`}
              >
                <h1 className="max-w-5xl px-4 text-center text-4xl font-bold capitalize text-white sm:text-5xl md:text-6xl">
                  {`${type}s`}
                </h1>
              </div>
            </section>
          )}
          <div className="container mx-auto p-3">
            <div
              className="prose mt-2 max-w-none"
              data-tina-field={tinaField(
                resources?.[0]?.node?.resourceType,
                "typeDescription"
              )}
            >
              <TinaMarkdown content={description} />
            </div>
            {Array.isArray(resources) && resources?.length > 0 && (
              <>
                {resources.map((item) => (
                  <div key={item?.node?.id}>
                    <div
                      className="prose mt-2 max-w-none py-2"
                      data-tina-field={tinaField(item?.node, "resourceTitle")}
                    >
                      <h2>{item?.node?.resourceTitle}</h2>
                    </div>
                    {item?.node?.resourceDescription && (
                      <div
                        className="prose py-2"
                        data-tina-field={tinaField(
                          item?.node,
                          "resourceDescription"
                        )}
                      >
                        <TinaMarkdown
                          content={item?.node?.resourceDescription}
                        />
                      </div>
                    )}
                    <Select
                      onValueChange={handleItemChange}
                      value={selectedItem.toString()}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue
                          placeholder={`Select a ${item?.node?.resourceType?.name}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {item?.node?.items?.map((resourceItem, i) => (
                          <SelectItem
                            value={i.toString()}
                            data-tina-field={tinaField(
                              item?.node?.items?.[selectedItem],
                              "itemTitle"
                            )}
                          >
                            {resourceItem?.itemTitle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Card key={item?.node?.id} className="mt-3 p-2">
                      <CardContent>
                        <div
                          className="prose max-w-none"
                          data-tina-field={tinaField(
                            item?.node?.items?.[selectedItem],
                            "itemContent"
                          )}
                        >
                          <TinaMarkdown
                            content={
                              item?.node?.items?.[selectedItem]?.itemContent
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <FooterNav footer={data.footer} />
      </div>
    </>
  )
}
