'use client'

import { ApolloClient, ApolloProvider } from "@apollo/client";
import React, { ReactNode } from "react";
import { initializeApollo } from "./libs/apolloClient";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={initializeApollo()}>{children}</ApolloProvider>
  );
};

export default Providers;
