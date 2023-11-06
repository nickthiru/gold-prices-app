import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { styled } from "styled-components";
import useFetch from "./hooks/useFetch";
import { useEffect } from "react";
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
  const { get, loading } = useFetch(
    "https://e4d4pfsbu9.execute-api.us-east-1.amazonaws.com/prod"
  );

  const { data, error, status, fetchStatus } = useQuery({
    queryKey: ["prices"],
    queryFn: () => get("/prices"),
  });

  useEffect(() => {
    console.log("(+) data: \n" + data);
  }, [data]);

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <ReactQueryDevtools initialIsOpen={false} />
  //     <Container>
  //       <H1>Welcome to the Gold Price Tracker!</H1>
  //       <H2>Live Chennai</H2>
  //     </Container>
  //   </QueryClientProvider>
  // );

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <H1>Welcome to the Gold Price Tracker!</H1>
        <H2>Live Chennai</H2>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
