import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import UpdateTodo from "./pages/UpdateTodo";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout title="TO-DO APP" isHome={true}>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/add-task"
        element={
          <Layout title="Add Task" isHome={false}>
            <AddTodo />
          </Layout>
        }
      />
      <Route
        path="/update-task"
        element={
          <Layout title="Edit Task" isHome={false}>
            <UpdateTodo />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
