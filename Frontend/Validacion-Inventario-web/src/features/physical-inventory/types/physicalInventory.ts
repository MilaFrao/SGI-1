export interface PhysicalInventoryItem {
    numeroPagina: number;
    codigoBarra: string;
    referencia: string | null;
    toma1: number;
    usuario1: string;
    toma2: number;
    usuario2: string | null;
    validacion1: number;
    estado: string;
    existencia: number;
    validacion2: number;
    validacion3: number;
    coincidencia: string;
}