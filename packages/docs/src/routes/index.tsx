import { createFileRoute } from '@tanstack/react-router'
import HomeDocs from '../pages/Home.page'

export const Route = createFileRoute('/')({
  component: HomeDocs,
})
