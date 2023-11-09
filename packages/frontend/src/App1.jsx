import { useQuery } from "@tanstack/react-query";
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

function App() {
  const { get, loading } = useFetch(
    "https://e4d4pfsbu9.execute-api.us-east-1.amazonaws.com/prod"
  );

  const { data, error, status, fetchStatus } = useQuery({
    queryKey: ["prices"],
    queryFn: () => get("/prices"),
  });

  // useEffect(() => {
  //   data.forEach((obj) => console.log("(+) obj: \n" + JSON.stringify(obj)));
  // }, [data]);

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
    <Container>
      <H1>Welcome to the Gold Price Tracker!</H1>
      <H2>Live Chennai</H2>
      {data ? <p>INR {data[0].goldPrice}</p> : null}
      <H2>Thangamayil</H2>
      {data ? <p>INR {data[1].goldPrice}</p> : null}
      <H2>Bhima</H2>
      {data ? <p>INR {data[2].goldPrice}</p> : null}
    </Container>
  );
}

export default App;
