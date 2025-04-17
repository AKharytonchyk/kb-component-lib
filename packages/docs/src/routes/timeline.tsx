import { createFileRoute } from '@tanstack/react-router'
import TimelineDocs from '../pages/Timeline'

export const Route = createFileRoute('/timeline')({
  component: TimelineDocs,
})
