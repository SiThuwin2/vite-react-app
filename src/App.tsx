import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import CreateNote, { createNoteAction } from "./pages/CreateNote";
import NoteDetails, { noteDetailLoader } from "./pages/NoteDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
        },
        {
          path: "/new",
          element: <CreateNote />,
          action: createNoteAction,
        },
        {
          path: "/note/:id",
          element: <NoteDetails />,
          loader: noteDetailLoader,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
