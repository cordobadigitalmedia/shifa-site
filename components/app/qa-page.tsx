"use client"

import Image from "next/image"
import Link from "next/link"
import { QuestionAnswerAndWrapperQuery } from "@/tina/__generated__/types"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"

export function QAPageComponent(props: {
  data: QuestionAnswerAndWrapperQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)
  const backgroundImage = data.qa.qaImage ? `${data.qa.qaImage}` : "none"
  return (
    <>
      <SiteHeader header={data.header} nav={data.nav} />
      <div className="flex min-h-[calc(100vh-90px)] flex-col">
        {backgroundImage !== "none" && (
          <section className={`relative h-[35vh]`}>
            <Image
              alt={data.qa.qaShort || ""}
              className={`size-full object-cover`}
              height={1080}
              src={backgroundImage}
              style={{
                aspectRatio: "1920/1080",
                objectFit: "cover",
              }}
              data-tina-field={tinaField(data.qa, "qaImage")}
              width={1920}
            />
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50`}
            >
              <h1
                className="max-w-5xl px-4 text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl"
                data-tina-field={tinaField(data.qa, "qaTitle")}
              >
                {data.qa.qaTitle || ""}
              </h1>
            </div>
          </section>
        )}
        <div className="grow">
          <div className="container mx-auto p-3">
            <Button asChild>
              <Link href="/qa">Back to all FAQs</Link>
            </Button>
            {Array.isArray(data.qa.qa_items) &&
              data.qa.qa_items?.length > 0 && (
                <Accordion type="single" collapsible className="w-full">
                  {data.qa.qa_items.map((item, i) => (
                    <AccordionItem value={item?.question as string}>
                      <AccordionTrigger>
                        <div className="text-primary line-clamp-1 text-left">
                          <Badge variant="secondary" className="mr-2">
                            {i + 1}
                          </Badge>
                          {item?.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p
                          className="text-muted-foreground text-base"
                          data-tina-field={tinaField(item, "question")}
                        >
                          {item?.question}
                        </p>
                        <blockquote
                          className="mt-6 border-l-2 pl-6 text-base"
                          data-tina-field={tinaField(item, "answer")}
                        >
                          <TinaMarkdown content={item?.answer} />
                        </blockquote>
                        <p
                          className="text-muted-foreground py-2 text-sm"
                          data-tina-field={tinaField(item, "asker")}
                        >
                          Asked by: {item?.asker}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
          </div>
        </div>
        <Footer footer={data.footer} />
      </div>
    </>
  )
}
