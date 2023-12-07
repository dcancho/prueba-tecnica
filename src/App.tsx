import { useState, useEffect } from 'react';
import './App.css'
import WorkersTable from './components/WorkersTable'
import IWorker from './domain/models/IWorker';
import axios from 'axios'
import NewWorkerModal from './modals/NewWorkerModal';

export default function App() {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const url = 'https://localhost:7123/api/v1/trabajador';
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [reloadPending, setReloadPending] = useState(false);
  const [filterSexo, setFilterSexo] = useState('Todos');

  // Filter workers by 'sexo'
  function filteredWorkers(): IWorker[] {
    if (filterSexo === 'M') {
      return workers.filter(worker => worker.sexo === 'M');
    } else if (filterSexo === 'F') {
      return workers.filter(worker => worker.sexo === 'F');
    } else {
      return workers;
    }
  }

  // Load data on first render
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setWorkers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Reload data after changes
  useEffect(() => {
    if (reloadPending) {
      axios.get(url)
        .then(response => {
          setWorkers(response.data);
          setReloadPending(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [reloadPending]);

  return (
    <div className='flex flex-col gap-4'>
      <h1>
        Listado de trabajadores
      </h1>
      <div className='w-full text-left flex flex-row justify-between'>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setNewModalOpen(true)}>
            Nuevo trabajador
          </button>
        </div>
        <div className='flex'>
          <label className="font-bold py-2 px-4">
            Filtrar por sexo:
            <select className="ml-2 bg-inherit" onChange={(e) => setFilterSexo(e.target.value)}>
              <option value="">Todos</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
        </div>
      </div>
      <WorkersTable workers={filteredWorkers()} setReloadPending={setReloadPending} />
      <NewWorkerModal open={newModalOpen} setOpen={setNewModalOpen} setReloadPending={setReloadPending} />
    </div>
  );
}