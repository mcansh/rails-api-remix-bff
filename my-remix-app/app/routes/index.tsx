import * as React from "react";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";

export async function loader() {
  let status = fetch("http://rails:3000/healthcheck").then((res) =>
    res.json()
  ) as Promise<{
    status: "ok";
  }>;
  return defer({ status });
}

export default function Index() {
  let data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>

      <div>
        Rails API Status:{" "}
        <React.Suspense fallback={<span>Loading...</span>}>
          <Await resolve={data.status}>
            {({ status }) => <span>{status}</span>}
          </Await>
        </React.Suspense>
      </div>
    </div>
  );
}
