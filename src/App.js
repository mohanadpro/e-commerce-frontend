import { RouterProvider } from 'react-router-dom';
import router from './components/root-component';
import { Container } from 'react-bootstrap';
import NavBar from './components/pages/navbar/NavBar';

function App() {
  return (
    <div className="App">
          <RouterProvider router={router}/>
    </div>
  );
}

export default App;
