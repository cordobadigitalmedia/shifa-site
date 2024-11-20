/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { QuestionAnswerWrapperConnectionQuery } from "@/tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function QAList(props: QuestionAnswerWrapperConnectionQuery) {
  const qaSections = props.qaConnection.edges ? props.qaConnection.edges : []
  return (
    <>
      {qaSections.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-3">
          {qaSections.map((qaItem) => (
            <Card
              key={qaItem?.node?.id}
              className="mx-auto w-full max-w-sm overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={qaItem?.node?.qaImage as string}
                  alt={qaItem?.node?.qaTitle as string}
                  className="size-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle data-tina-field={tinaField(qaItem?.node, "qaTitle")}>
                  {qaItem?.node?.qaShort}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link
                    href={`/qa/${qaItem?.node?._sys.breadcrumbs.join("/")}`}
                  >
                    View {qaItem?.node?.qa_items?.length} Question & Answer
                    {qaItem?.node?.qa_items?.length === 1 ? `` : `s`}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
