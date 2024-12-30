import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Invoices from "./components/invoices/Invoices.tsx";
import { Link, Route, Routes } from "react-router-dom";
import NotFound from "./components/not-found/NotFound.tsx";
import Headline from "./components/ui/typography/headline/Headline.tsx";
import Text from "./components/ui/typography/text/Text.tsx";
import ViewInvoice from "./components/view-invoice/ViewInvoice.tsx";
import { useEffect } from "react";
import { fetchInvoices } from "./features/invoice/invoice.slice.ts";
import { useAppDispatch } from "./hooks/useRedux.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
  }, []);
  return (
    <div className={"app"}>
      <Sidebar />
      <div className={"content"}>
        <Routes>
          <Route path="/" element={<Invoices />} />
          <Route path="/:id" element={<ViewInvoice />} />
          <Route
            path="*"
            element={
              <NotFound>
                <Headline variant={"h3"}>Page not found 🙁</Headline>
                <Text>
                  Go to dashboard by clicking the <br />
                  <strong>Home</strong> button👇
                </Text>
                <Link to={"/"}>Home</Link>
              </NotFound>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
