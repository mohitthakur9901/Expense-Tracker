import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignupForm } from "./pages/Signup"
import { SignInForm } from "./pages/SignIn"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Income from "./pages/Income"
import Expenses from "./pages/Expenses"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<WithLayout />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SignInForm />} />

      </Routes>
    </BrowserRouter >

  )
}


const WithLayout = () => (
  <Layout className="">
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/income" element={<Income />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  </Layout>
);


export default App
