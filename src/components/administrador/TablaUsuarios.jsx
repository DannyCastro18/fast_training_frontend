'use client'
import { useEffect, useState } from "react"

export default function TablaUsuarios(){
    const [users, setUsers]= useState();
    const [email, setEmail]=useState();
    return(
        <>
        <section>
            <section>
                <button>Agregar usuario</button>
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Correo del usuario</th>
                            <th>Rol</th>
                            <th>Equipo</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((usuarios)=>{
                            <tr key={usuarios.id}>
                                <td>{usuarios.email}</td>
                                <td>{usuarios.rol}</td>
                                <td></td>
                                <td>
                                    <button className="inline-block rounded-sm bg-yellow-5000 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 mx-2"
                                        onClick={() => Delete(usuarios.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </section>
        </section>
        
        </>
    )
} 