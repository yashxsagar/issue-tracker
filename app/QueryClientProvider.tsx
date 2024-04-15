"use client";
import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient(); //Contains a cache for storying data that is fecthed from our backend
//Now we should pass this using QueryClientProvider to our component tree
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    // The reason we need to wrap this ReactQueryClientProvider is that because it uses ReactContext to pass QueryClient to our Component Tree
    //ReactContext is only available in client side rendered components so we use the 'use client' directive up top
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
