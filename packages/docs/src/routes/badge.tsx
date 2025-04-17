import { createFileRoute } from '@tanstack/react-router'
import BadgeDocs from '../pages/Badge.page'

export const Route = createFileRoute('/badge')({
  component: BadgeDocs,
})
