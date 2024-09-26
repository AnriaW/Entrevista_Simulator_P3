import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Route path="/mainPage" component={MainPageComponent} />

    </BrowserRouter>
  );
}
export const Wrapper = ({ children }) => (
    <RouterProvider router={createBrowserRouter([{path: '*', element: children}])} />
);