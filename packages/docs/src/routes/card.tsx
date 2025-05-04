import { createFileRoute } from '@tanstack/react-router'
import CardDocs from '../pages/Card.page'

export const Route = createFileRoute('/card')({
  component: CardDocs,
})
