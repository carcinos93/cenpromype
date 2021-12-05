export default {
    property: [{
        "MENU": "usuarios",
        "SUBMENU": [
            { "nombre": "usuario", "url": "usuarios/usuario" },
            { "nombre": "rol", "url": "usuarios/rol" },
            { "nombre": "perfil", "url": "#" },
            { "nombre": "menu", "url": "tb/menu" }

        ]
    },
    {
        "MENU": "catalogos",
        "SUBMENU": [
            { "nombre": "grupo-indicador", "url": "catalogos/grupo-indicador"},
            { "nombre": "indicadores", "url": "catalogos/indicadores" },
            { "nombre": "indicadores-empresa", "url": "#" },
            { "nombre": "tipo-empresa", "url": "catalogos/tipo-empresa" },
            { "nombre": "actividades-economicas", "url": "catalogos/actividades-economicas" },
            { "nombre": "region", "url": "catalogos/region" },
            { "nombre": "pais", "url": "catalogos/pais" },
            { "nombre": "departamentos", "url": "catalogos/departamentos" },
            { "nombre": "sector-economico", "url": "catalogos/sector-economico" },
            { "nombre": "productos", "url": "tb/productos" },
            { "nombre": "documentos", "url": "tb/documentos" },
            { "nombre": "servicios", "url": "catalogos/servicios" },
            { "nombre": "documento-servicio", "url": "tb/documento-servicio" },
            { "nombre": "fuentes-informacion", "url": "catalogos/fuentes-informacion" },
            { "nombre": "importaciones", "url": "#" },
            { "nombre": "exportaciones", "url": "#" },
            { "nombre": "precio", "url": "#" },
            { "nombre": "aranceles", "url": "#" },
            { "nombre": "productos_pais", "url": "#" },
            { "nombre": "exportaciones_pais", "url": "#" },
            { "nombre": "importaciones_pais", "url": "#" },
            { "nombre": "exportaciones_producto", "url": "#" },
            { "nombre": "importaciones_producto", "url": "#" }
        ]
    },
    {
        "MENU": "subida_informes",
        "SUBMENU": [
            { "nombre": "crear_informe", "url": "#" },
            { "nombre": "administratar_informe", "url": "#" }
        ]
    },
    {
        "MENU": "subida_datos",
        "SUBMENU": [
            { "nombre": "cargar_archivo", "url": "#" }
        ]
    },
    {
        "MENU": "dashboard",
        "SUBMENU": [
            { "nombre": "inflacion", "url": "dashboard/inflacion" },
            { "nombre": "inversion-extranjera", "url": "dashboard/inversion-extranjera" },
            { "nombre": "poblacion-genero-pais", "url": "dashboard/poblacion-genero-pais" },
            { "nombre": "poblacion-total-pais", "url": "dashboard/poblacion-total-pais" },
            { "nombre": "cantidad-empresas", "url": "dashboard/cantidad-empresas" },
            { "nombre": "exportaciones-primera-fecha", "url": "dashboard/exportaciones-primera-fecha" },
            { "nombre": "importaciones-primera-fecha", "url": "dashboard/importaciones-primera-fecha" },
            { "nombre": "ipc-pais-indicador", "url": "dashboard/ipc-pais-indicador" }
        ]
    }
]}
