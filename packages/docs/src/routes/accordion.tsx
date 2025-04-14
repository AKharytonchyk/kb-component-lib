import { createFileRoute } from '@tanstack/react-router'
import AccordionDocs from '../pages/Accordion.page'

export const Route = createFileRoute('/accordion')({
  component: AccordionDocs,
})
