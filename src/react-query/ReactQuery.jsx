import { QueryClient, QueryClientProvider } from 'react-query'
import Test from './components/Test'

const queryClient = new QueryClient()

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  )
}
export default ReactQuery
