import { createFileRoute } from '@tanstack/react-router'
import PapaerPage from '../pages/Paper.page'

export const Route = createFileRoute('/paper')({
  component: PapaerPage,
});
