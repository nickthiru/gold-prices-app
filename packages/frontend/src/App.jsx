import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { styled } from "styled-components";
// import "./App.css";

const Container = styled.div`
  max-width: 960px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const H1 = styled.h1`
  color: red;
  text-align: center;
`;

const H2 = styled.h2`
  color: blue;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Container>
        <H1>Welcome to the Gold Price Tracker!</H1>
        <H2>Live Chennai</H2>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
