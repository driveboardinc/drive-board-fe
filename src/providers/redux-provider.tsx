"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
}
