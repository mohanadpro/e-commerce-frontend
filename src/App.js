import { RouterProvider } from 'react-router-dom';
import router from './components/root-component';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
          <RouterProvider router={router}/>
      </Container>
    </div>
  );
}

export default App;
