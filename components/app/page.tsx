"use client"

import {
  PageAndNavQuery,
  PageBlocksFeaturedPostsPosts,
} from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

import { ImageGallery } from "@/components//page/image-gallery"
import { Footer } from "@/components/footer"
import { CardGrid } from "@/components/page/card-grid"
import { CollapsibleSection } from "@/components/page/collapsible-section"
import { CoverSection } from "@/components/page/cover-section"
import { FeaturedPosts } from "@/components/page/featured-posts"
import { PageContent } from "@/components/page/page-content"
import { WelcomeHero } from "@/components/page/welcome-hero"
import { SiteHeader } from "@/components/site-header"

export function PageComponent(props: {
  data: PageAndNavQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)
  return (
    <>
      <SiteHeader nav={data.nav} header={data.header} />
      <div className="flex min-h-[calc(100vh-90px)] flex-col">
        <div className="grow">
          {data.page.blocks?.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksWelcomeHero": {
                return <WelcomeHero key={block.title} {...block} />
              }
              case "PageBlocksCardgrid": {
                return (
                  <div
                    key={block.gridTitle}
                    className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3"
                  >
                    <CardGrid {...block} />
                  </div>
                )
              }
              case "PageBlocksCardgrid2Col": {
                return (
                  <div
                    key={block.gridTitle}
                    className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2"
                  >
                    <CardGrid {...block} />
                  </div>
                )
              }
              case "PageBlocksGallery": {
                return <ImageGallery key={block.galleryTitle} {...block} />
              }
              case "PageBlocksCoverSection": {
                return <CoverSection key={block.headline} {...block} />
              }
              case "PageBlocksFeaturedPosts": {
                return (
                  <FeaturedPosts
                    key={block.Posts?.[0]?.label || i}
                    posts={block.Posts as PageBlocksFeaturedPostsPosts[]}
                  />
                )
              }
              case "PageBlocksPageContent": {
                return <PageContent key={i} {...block} />
              }
              case "PageBlocksCollapsibleSection": {
                return (
                  <CollapsibleSection key={block.collapsibleTitle} {...block} />
                )
              }
            }
          })}
          <Footer footer={data.footer} />
        </div>
      </div>
    </>
  )
}
