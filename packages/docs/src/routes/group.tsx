import { createFileRoute } from '@tanstack/react-router'
import GroupDocs from '../pages/Group.page'

export const Route = createFileRoute('/group')({
  component: GroupDocs,
})
