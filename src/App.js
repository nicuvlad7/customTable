import React, {useState} from 'react';
import './App.css';
import CustomTable from "./components/CustomTable";
import { prepareData } from "./helpers/helpers";

function App() {
  const rawData = [
    { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
    { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
    { name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
    { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
    { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' },
  ]
  const initialData = prepareData(rawData);
  const [selectedRows, setSelectedRows] = useState([]);

  const showIconOn = {
    header: false,
    subheader: false,
    data: {
      columnId: 'status',
      icon: <div title='status available' className='colored-circle' />,
      showOn: 'available'
    }
  }


  return (
      <div className="App">
        <header className="App-header">
          <CustomTable
              data={initialData}
              rowSelect={true}
              selectedRows={selectedRows}
              setSelectedData={setSelectedRows}
              hiddenColumn={['id']}
              showIconOn={showIconOn}
          />
        </header>
      </div>
  );
}

export default App;
