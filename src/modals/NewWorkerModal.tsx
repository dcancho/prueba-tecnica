import { useState } from "react";
import axios from "axios";
import IDepartamento from "../domain/models/IDepartamento";
import IProvincia from "../domain/models/IProvincia";
import IDistrito from "../domain/models/IDistrito";
import INewWorkerRequest from "../domain/models/INewWorkerRequest";
import Departamentos from "../data/Departamentos";
import Provincias from "../data/Provincias";
import Distritos from "../data/Distritos";

interface INewWorkerModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setReloadPending: (value: boolean) => void;

}

export default function NewWorkerModal({ open, setOpen, setReloadPending }: INewWorkerModalProps) {

    // States for form
    const [tipoDocumento, setTipoDocumento] = useState('DNI');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [nombres, setNombres] = useState('');
    const [sexo, setSexo] = useState('M');
    const [departamento, setDepartamento] = useState('15');
    const [provincia, setProvincia] = useState('128');
    const [distrito, setDistrito] = useState('3151');

    // Send new register to API
    const handleSubmit = () => {

        const formData: INewWorkerRequest = {
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            nombres: nombres,
            sexo: sexo,
            idDepartamento: Number.parseInt(departamento),
            idProvincia: Number.parseInt(provincia),
            idDistrito: Number.parseInt(distrito)
        };

        axios.post('https://localhost:7123/api/v1/trabajador/register', formData)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    setOpen(false);
                    setReloadPending(true);
                }
                else {
                    alert('Error al registrar trabajador. Revise los datos');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-500 opacity-50 absolute inset-0"></div>
            <div className="bg-white p-4 text-black z-10 flex flex-col gap-4 max-w-3xl">
                <h2 id="modal-title">Nuevo trabajador</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="tipoDocumento">Tipo de documento</label>
                        <select name="tipoDocumento" id="tipoDocumento" className="border border-slate-950 rounded bg-inherit"
                            value={tipoDocumento}
                            onChange={(e) => setTipoDocumento(e.target.value)}
                        >
                            <option value="1">DNI</option>

                        </select>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="numeroDocumento">Número de documento</label>
                        <input type="text" name="numeroDocumento" id="numeroDocumento" className="border border-slate-950 rounded bg-inherit"
                            value={numeroDocumento}
                            onChange={(e) => setNumeroDocumento(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="nombres">Nombres</label>
                        <input type="text" name="nombres" id="nombres" className="border border-slate-950 rounded bg-inherit"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="sexo">Sexo</label>
                        <select name="sexo" id="sexo" className="border border-slate-950 rounded bg-inherit"
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="departamento">Departamento</label>
                        <select name="departamento" id="departamento" className="border border-slate-950 rounded bg-inherit" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                            {Departamentos.map((departamento: IDepartamento) => (
                                <option value={departamento.id}>{departamento.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="provincia">Provincia</label>
                        <select name="provincia" id="provincia" className="border border-slate-950 rounded bg-inherit" value={provincia}
                            onChange={(e) => setProvincia(e.target.value)}>
                            {Provincias
                                .filter((provincia: IProvincia) => provincia.departamentoId === Number.parseInt(departamento))
                                .map((provincia: IProvincia) => (
                                    <option value={provincia.id}>{provincia.nombre}</option>
                                ))}
                        </select>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="distrito">Distrito</label>
                        <select name="distrito" id="distrito" className="border border-slate-950 rounded bg-inherit" value={distrito}
                            onChange={(e) => setDistrito(e.target.value)}
                        >
                            {Distritos
                                .filter((distrito: IDistrito) => distrito.provinciaId === Number.parseInt(provincia))
                                .map((distrito: IDistrito) => (
                                    <option value={distrito.id}>{distrito.nombre}</option>
                                ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button className="bg-gray-100 hover:bg-gray-500 text-gray-800 hover:text-gray-100 font-bold py-2 px-4 rounded" onClick={() => setOpen(false)}>Cancelar</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >Guardar</button>
                    </div>
                </form>

            </div>
        </div>
    );
}