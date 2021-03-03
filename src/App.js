import './App.css';

import Header from './components/Header/Header'
import Map from './components/Map/Map'
import RotateAlert from './components/Alerts/RotateAlert/RotateAlert'
import ToastAlert from './components/Alerts/ToastAlert/ToastAlert'

function App() {
  return (
    <div className="app">
      <Header />
      <Map />
      {/* Testing state of toast messages */}
      <ToastAlert message="There has been an error" />
      {/* if the screen is rotated in landscape mode */}
      <RotateAlert />
    </div>
  );
}

export default App;
