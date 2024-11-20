import client from "@/tina/__generated__/client"

import { ResourceIndexPageComponent } from "@/components/app/resource-list-page"

export default async function QAIndexPage() {
  const result = await client.queries.ResourceTypeWrapperConnection()
  console.log(result)
  return <ResourceIndexPageComponent {...result} />
}
