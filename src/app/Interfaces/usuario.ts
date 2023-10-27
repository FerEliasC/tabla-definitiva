export interface Usuario {
    id: number;
    idUsuario: string;
    nombreCompleto: string;
    nombreUsuario: string;
    correo: string;
    password: string;
    rfc: string;
    esActivo: number;
    idEmpresa:number;
    empresaDescripcion:string;    
    idRol: number;
    rolDescripcion: string;
    noEmpresas: number[];
}
