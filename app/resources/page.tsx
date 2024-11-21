import client from "@/tina/__generated__/client"

import { ResourceTypeIndexPageComponent } from "@/components/app/resource-type-list-page"

export default async function QAIndexPage() {
  const result = await client.queries.ResourceTypeWrapperConnection()
  console.log(result)
  return <ResourceTypeIndexPageComponent {...result} />
}
