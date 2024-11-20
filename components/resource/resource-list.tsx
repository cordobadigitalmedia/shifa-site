/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import {
  QuestionAnswerWrapperConnectionQuery,
  ResourceTypeConnectionQuery,
} from "@/tina/__generated__/types"
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

export function ResourceTypeList(props: ResourceTypeConnectionQuery) {
  const resourceSections = props.resourceTypeConnection.edges
    ? props.resourceTypeConnection.edges
    : []
  return (
    <>
      {resourceSections.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-3">
          {resourceSections.map((resourceTypeItem) => (
            <Card
              key={resourceTypeItem?.node?.id}
              className="mx-auto w-full max-w-sm overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resourceTypeItem?.node?.image as string}
                  alt={resourceTypeItem?.node?.name as string}
                  className="size-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  data-tina-field={tinaField(resourceTypeItem?.node, "image")}
                />
              </div>
              <CardHeader>
                <CardTitle
                  data-tina-field={tinaField(resourceTypeItem?.node, "name")}
                >
                  {resourceTypeItem?.node?.name}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link
                    href={`/resource/${resourceTypeItem?.node?._sys.breadcrumbs.join(
                      "/"
                    )}`}
                  >
                    View {resourceTypeItem?.node?.name}s
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
