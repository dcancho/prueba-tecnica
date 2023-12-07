import IWorker from "../domain/models/IWorker";
import DeleteWorkerConfirmation from "../modals/DeleteWorkerConfirmation";
import EditWorkerModal from "../modals/EditWorkerModal";
import { useState } from "react";

interface IWorkersTableProps {
  workers: IWorker[];
  setReloadPending: (value: boolean) => void;
}

export default function WorkersTable({ workers, setReloadPending }: IWorkersTableProps) {

  // States for modals
  const [selectedWorker, setSelectedWorker] = useState<IWorker>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <table className="border border-slate-950">
        <thead>
          <tr>
            <th className="border border-slate-950 pr-4 pl-4">Tipo de documento</th>
            <th className="border border-slate-950 pr-4 pl-4">Número de documento</th>
            <th className="border border-slate-950 pr-4 pl-4">Nombres</th>
            <th className="border border-slate-950 pr-4 pl-4">Sexo</th>
            <th className="border border-slate-950 pr-4 pl-4">Departamento</th>
            <th className="border border-slate-950 pr-4 pl-4">Provincia</th>
            <th className="border border-slate-950 pr-4 pl-4">Distrito</th>
            <th colSpan={2} className="border border-slate-950">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker: IWorker) => (
            <tr key={worker.id} className={worker.sexo === 'M' ? 'bg-blue-200' : 'bg-orange-200'}>
              <td className="border border-slate-950">{worker.tipoDocumento}</td>
              <td className="border border-slate-950">{worker.numeroDocumento}</td>
              <td className="border border-slate-950">{worker.nombres}</td>
              <td className="border border-slate-950">{worker.sexo}</td>
              <td className="border border-slate-950">{worker.nombreDepartamento}</td>
              <td className="border border-slate-950">{worker.nombreProvincia}</td>
              <td className="border border-slate-950">{worker.nombreDistrito}</td>
              <td className="border border-slate-950 pr-2 pl-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setEditModalOpen(true);
                    setSelectedWorker(worker);
                  }}
                >
                  Editar
                </button>
              </td>
              <td className="border border-slate-950 pr-2 pl-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setSelectedWorker(worker);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditWorkerModal open={editModalOpen} setOpen={setEditModalOpen} worker={selectedWorker} setReloadPending={setReloadPending}  />
      <DeleteWorkerConfirmation open={deleteModalOpen} setOpen={setDeleteModalOpen} worker={selectedWorker} setReloadPending={setReloadPending} />
    </>

  );
}