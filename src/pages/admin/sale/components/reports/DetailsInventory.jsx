import React, { useMemo, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        position: 'relative',
        marginLeft: 0,
        width: 80,
        height: 60,
    },
    table: {
        width: '100%',
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        color: 'white',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #E0E0E0',
    },
    tableCell: {
        flex: 1,
        padding: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    totalText: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'right',
        fontSize: '15px',

    },
    footer: {
        marginTop: 20,
    },
    title: {
        fontSize: '18px'
    },
    aprobado: {
        backgroundColor: '#86EFAC',

    },
    anulado: {
        backgroundColor: '#FCA5A5'
    }
});

const DetailsIventory = ({ sales }) => {
    const [data, setData] = useState([]);


    return (
        <>
            <Document>
                <Page size="A4" orientation="landscape" style={styles.page}>
                    {/* Encabezado */}
                    <View style={styles.header}>
                        {/* <Image style={styles.logo} src="/logo.png" /> */}
                        <View>
                            <Text style={styles.title}>REPORTE INVENTARIO</Text>
                        </View>
                        <View>
                            {/* <Text>FECHA INICIO: {start == ''? 'Buscar en todo':start}</Text>
                            <Text>FECHA FIN: {end == ''? 'Buscar en todo':end}</Text> */}
                            {/* <Text>NOTA DE VENTA</Text>
                            <Text>No.: 00000</Text> */}
                        </View>
                    </View>

                    <Text>Direccion: Avenida San Martín Esquina Heroínas</Text>
                    <Text>Ciudad: Cochabamba</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Sr Propietario.(a): Brandon </Text>
                        <Text>NIT.: 90274238734 </Text>
                        <Text>Rojo: stock critico Verde: Stock saludable </Text>
                    </View>

                    {/* Tabla */}
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableCell, { flex: 0.5 }]}>N°</Text>
                            <Text style={styles.tableCell}>Nombre</Text>
                            <Text style={styles.tableCell}>Categoria</Text>
                            {/* <Text style={styles.tableCell}>Fecha de venta</Text> */}
                            <Text style={styles.tableCell}>Precio (.Bs)</Text>
                            <Text style={styles.tableCell}>Stock</Text>
                        </View>

                        {sales.map((sale, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{sale.nombre}</Text>
                                <Text style={styles.tableCell}>{sale.categoria_nombre} </Text>
                                <Text style={styles.tableCell}>{sale.precio}</Text>
                                {/* <Text style={styles.tableCell}>0000{sale.id}</Text> */}
                                <Text style={styles.tableCell}>{parseInt(sale.stock) > 10? <Text style={styles.aprobado}>{sale.stock}</Text>: <Text style={styles.anulado}>{sale.stock}</Text>}</Text>
                            </View>
                        ))}

                    </View>

                    {/* Total */}
                    {/* <Text style={styles.totalText}>Valor Total Bs: { } </Text> */}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>Recibo Original: LEYDIS FASHION</Text>
                        <Text>NIT: 1230809123 / No. Autorizacion 3423</Text>
                    </View>
                </Page>
            </Document></>
    )
}

export default DetailsIventory;
