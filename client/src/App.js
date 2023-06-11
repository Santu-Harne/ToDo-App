import './App.css';
import ToDoContent from './components/ToDoContent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="">
      <ToastContainer autoClose={2000} position='top-right' />
      <ToDoContent />
    </div>
  );
}

export default App;
