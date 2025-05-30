"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
