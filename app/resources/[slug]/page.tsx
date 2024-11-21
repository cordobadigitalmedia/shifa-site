import client from "@/tina/__generated__/client"
import {
  Footer,
  Header,
  Nav,
  ResourceConnectionEdges,
} from "@/tina/__generated__/types"

import { ResourcesPageComponent } from "@/components/app/resources-page"

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  console.log(`${(await params).slug}`)
  const resourceType = `${(await params).slug}`
  const result = await client.queries.ResourceWrapperConnection()
  return <ResourcesPageComponent props={result} type={resourceType} />
}

export async function generateStaticParams() {
  const qas = await client.queries.resourceTypeConnection()
  const paths = qas.data?.resourceTypeConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.breadcrumbs.join(""),
  }))
  return paths || []
}
