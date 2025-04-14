import { createFileRoute } from '@tanstack/react-router'
import BannerDocs from '../pages/Banner.page'

export const Route = createFileRoute('/banner')({
  component: BannerDocs,
})
