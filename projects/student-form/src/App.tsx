import Form from "./components/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="sm:flex justify-center px-5 py-8 md:py-12 xl:py-24">
        <div>
          <h1 className="mb-3 text-4xl font-bold">Student Form</h1>
          <hr className="mb-5" />
          <Form />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
