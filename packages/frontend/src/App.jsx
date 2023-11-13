import { useQuery } from "@tanstack/react-query";
// import { styled } from "styled-components";

import useFetch from "./hook/useFetch";
import useFormatDateTime from "./hook/useFormatDateTime";

import Container from "./component/ui/kit/Container";

import { BackendStackApiStack96B9424F as BackendApi } from "../../backend/outputs.json";
import Header from "./component/ui/header/Header";

// const H1 = styled.h1`
//   color: gold;
//   text-align: center;
// `;

// const data = [
//   {
//     siteName: "Live Chennai",
//     uiDateTime: "2023-11-13T10:08:53",
//     goldPrice: 5590,
//   },
//   {
//     siteName: "Thangamayil",
//     uiDateTime: "2023-11-13T10:36:53",
//     goldPrice: 5545,
//   },
//   {
//     siteName: "Bhima",
//     uiDateTime: "2023-11-01T13:04:22",
//     goldPrice: 5640,
//   },
// ];

//
export default function App() {
  const { get, loading } = useFetch(BackendApi.RestApiEndpoint0551178A);

  const { data, error, status, fetchStatus } = useQuery({
    queryKey: ["prices"],
    queryFn: () => get("/prices"),
    retry: 2,
    staleTime: 900000,
    refetchInterval: 900000,
    refetchIntervalInBackground: true,
  });

  const { format } = useFormatDateTime();

  return (
    <Container>
      <Header>Welcome to the Gold Price Tracker!</Header>
      <div style={{ marginTop: "20px" }}>
        <table>
          <tbody>
            <tr>
              <th>Website</th>
              <th>22K Price &#40;INR&#41;</th>
              <th>Last Updated &#40;IST&#41;</th>
            </tr>
            {data
              ? data.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td>{obj.siteName}</td>
                      <td>{obj.goldPrice}</td>
                      <td>{format(obj.uiDateTime)}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
