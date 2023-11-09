import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import useFetch from "./hooks/useFetch";
// import { useEffect } from "react";
import { BackendStackApiStack96B9424F as BackendApiStack } from "../../backend/outputs.json";
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
  color: gold;
  text-align: center;
`;

// const H2 = styled.h2`
//   color: blue;
// `;

function App() {
  const { get, loading } = useFetch(BackendApiStack.RestApiEndpoint0551178A);

  const { data, error, status, fetchStatus } = useQuery({
    queryKey: ["prices"],
    queryFn: () => get("/prices"),
    retry: 2,
    staleTime: 900000,
    refetchInterval: 900000,
    refetchIntervalInBackground: true,
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
    // <Container>
    //   <H1>Welcome to the Gold Price Tracker!</H1>
    //   <H2>Live Chennai</H2>
    //   {data ? <p>INR {data[0].goldPrice}</p> : null}
    //   <H2>Thangamayil</H2>
    //   {data ? <p>INR {data[1].goldPrice}</p> : null}
    //   <H2>Bhima</H2>
    //   {data ? <p>INR {data[2].goldPrice}</p> : null}
    // </Container>
    <Container>
      <H1>Welcome to the Gold Price Tracker!</H1>
      <table>
        <tr>
          <th>Website</th>
          <th>Price</th>
          <th>Last Updated</th>
        </tr>
        <tr>
          <td>{data ? data[0].siteName : null}</td>
          <td>{data ? data[0].goldPrice : null}</td>
          <td>{data ? data[0].dateTime : null}</td>
        </tr>
        <tr>
          <td>{data ? data[1].siteName : null}</td>
          <td>{data ? data[1].goldPrice : null}</td>
          <td>{data ? data[1].dateTime : null}</td>
        </tr>
        <tr>
          <td>{data ? data[2].siteName : null}</td>
          <td>{data ? data[2].goldPrice : null}</td>
          <td>{data ? data[2].dateTime : null}</td>
        </tr>
      </table>
    </Container>
  );
}

export default App;
