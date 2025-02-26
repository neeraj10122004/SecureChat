import Register from "./pages/Register";
import axios from 'axios';

axios.defaults.baseURL = 'https://reimagined-tribble-x69x57q4497cq7j-5000.app.github.dev/'; // Change if using a different server
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Register />
    </>
  );
}

export default App;

