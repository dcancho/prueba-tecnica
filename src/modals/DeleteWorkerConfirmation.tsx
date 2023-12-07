import axios from 'axios';
import IWorker from '../domain/models/IWorker';

// Delete a register by id
async function DeleteRegister(id: number) {
    console.log("Deleted register: " + id);
    // axios request to delete the register
    const url = `https://localhost:7123/api/v1/trabajador/remove/${id}`;
    await axios.delete(url)
}

interface IDeleteWorkerConfirmationProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    worker: IWorker;
    setReloadPending: (value: boolean) => void;
}

export default function DeleteWorkerConfirmation({ open, setOpen, worker, setReloadPending }: IDeleteWorkerConfirmationProps) {

    if (!open) return null;
    else {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-gray-500 opacity-50 absolute inset-0"></div>
                <div className="bg-white p-4 text-black z-10 flex flex-col gap-4 max-w-3xl">
                    <h2 id="modal-title">¿Seguro que desea eliminar el registro de {worker.nombres }?</h2>
                    <div className="flex flex-row gap-2 justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                            setOpen(false);
                        }}>
                            Cancelar
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {
                            setOpen(false);
                            await DeleteRegister(worker.id);
                            setReloadPending(false);
                        }}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}