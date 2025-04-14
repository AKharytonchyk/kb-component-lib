import { createFileRoute } from '@tanstack/react-router'
import AlertDocs from '../pages/Alert.page'

export const Route = createFileRoute('/alert')({
  component: AlertDocs,
})
