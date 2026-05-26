import { Precio } from '../model/precio';
import { PrecioAdicional } from '../model/precio-adicional';
import { seedSucursalBrillantes, seedSucursalDiamantes, seedSucursalPrincipalSJ } from './sucursales.seed';
import { Sucursal } from '../model/sucursal';

const generarPreciosParaSucursal = (sucursal: Sucursal, prefix: string, moneda: string = 'UF'): Precio[] => {
    const precios: Precio[] = [];
    let idCounter = 1;
    
    sucursal.niveles.forEach(nivel => {
        sucursal.jornadas.forEach(jornada => {
            const factorNivel = parseInt(nivel.id.replace('n-', '')); 
            const factorJornada = jornada.id === 'manana' ? 1.2 : 1.0;
            
            // Diamantes tiene un recargo base por ser una sede más premium
            const premiumBonus = sucursal.id === 'diamantes' ? 2 : 0;
            const valorMensualidad = (8 + factorNivel + premiumBonus) * factorJornada;
            const valorMatricula = valorMensualidad * 0.8;
            
            precios.push({
                id: `prc-${prefix}-${idCounter++}`,
                tenant: sucursal.tenant,
                sucursalId: sucursal.id,
                nivelId: nivel.id,
                jornadaId: jornada.id,
                matricula: parseFloat(valorMatricula.toFixed(2)),
                mensualidad: parseFloat(valorMensualidad.toFixed(2)),
                moneda: moneda,
                fechaInicioVigencia: "2026-01-01T00:00:00Z",
                fechaFinVigencia: "2026-12-31T23:59:59Z"
            });
        });
    });
    return precios;
};

export const seedPreciosInabif: Precio[] = [
    ...generarPreciosParaSucursal(seedSucursalBrillantes, 'brillantes'),
    ...generarPreciosParaSucursal(seedSucursalDiamantes, 'diamantes')
];

const generarPreciosSanJuan = (): Precio[] => {
    const precios: Precio[] = [];
    let idCounter = 1;
    
    seedSucursalPrincipalSJ.niveles.forEach(nivel => {
        seedSucursalPrincipalSJ.jornadas.forEach(jornada => {
            const baseMes = jornada.id === 'completa' ? 350000 : 220000;
            const mat = 150000;

            precios.push({
                id: `prc-sj-${idCounter++}`, 
                tenant: "sanjuan", 
                sucursalId: "principal", 
                nivelId: nivel.id, 
                jornadaId: jornada.id,
                matricula: parseFloat(mat.toFixed(2)),
                mensualidad: parseFloat(baseMes.toFixed(2)),
                moneda: "CLP",
                fechaInicioVigencia: "2026-01-01T00Z", 
                fechaFinVigencia: "2026-12-31T23Z"
            });
        });
    });
    return precios;
};

export const seedPreciosSanJuan: Precio[] = generarPreciosSanJuan();

export const seedPreciosAdicionalesInabif: PrecioAdicional[] = [
    {
        id: "pad-brillantes-danza",
        tenant: "inabif",
        servicioId: "srv-danza",
        servicioNombre: "Taller de Danza Opcional",
        servicioCategoria: "ADICIONAL",
        sucursalId: "brillantes",
        valor: 3.5,
        moneda: "UF",
        fechaInicioVigencia: "2026-01-01T00:00:00Z",
        fechaFinVigencia: "2026-12-31T23:59:59Z"
    }
];
