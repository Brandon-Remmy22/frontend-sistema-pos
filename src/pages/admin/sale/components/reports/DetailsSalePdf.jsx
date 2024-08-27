import React,{ useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useEffect } from 'react';
// Configura las fuentes personalizadas si es necesario
// Font.register({ family: 'Helvetica-Bold', src: 'https://path-to-your-font-file.ttf' });

// Estilos para el PDF
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
        marginTop: 10,
        textAlign: 'right',
    },
    footer: {
        marginTop: 20,
    },
    title: {
        textAlign: 'center',
    }
});

const DetailsSalePdf = ({ client }) => {

    const totalImporte = useMemo(() => {
        return client.productos.reduce((total, item) => total + parseFloat(item.importe), 0);
    }, [client.productos]);
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    {/* Encabezado */}
                    <View style={styles.header}>
                        <Image style={styles.logo} src="/logo.png" />
                        <View>
                            <Text>TIENDA DE ROPA Y ACCESORIOS S.A</Text>
                            <Text style={styles.title}>LEYDIS FASHION</Text>
                        </View>
                        <View>
                            <Text>NIT: 1230809123</Text>
                            <Text>NOTA DE VENTA</Text>
                            <Text>No.: 00000{client.num_documento}</Text>
                        </View>
                    </View>

                    <Text>Direccion: Avenida San Martín Esquina Heroínas</Text>
                    <Text>Ciudad: Cochabamba</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Sr.(a): {client.nombre_cliente}</Text>
                        <Text>NIT, CI.: {client.ci}</Text>
                        <Text>Fecha: {client.fechaCreacion}</Text>
                    </View>

                    {/* Tabla */}
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableCell, { flex: 0.5 }]}>N°</Text>
                            <Text style={styles.tableCell}>Nombre Producto</Text>
                            <Text style={styles.tableCell}>Cantidad</Text>
                            <Text style={styles.tableCell}>Precio Unidad</Text>
                            <Text style={styles.tableCell}>Sub total</Text>
                        </View>

                        {client.productos.map((producto, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{producto.nombre_producto}</Text>
                                <Text style={styles.tableCell}>{producto.cantidad}</Text>
                                <Text style={styles.tableCell}>{producto.precio}</Text>
                                <Text style={styles.tableCell}>{producto.importe}</Text>
                            </View>
                        ))}

                    </View>

                    {/* Total */}
                    <Text style={styles.totalText}>Valor Total Bs: {totalImporte}</Text>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>Recibo Original: LEYDIS FASHION</Text>
                        <Text>NIT: 1230809123 / No. Autorizacion 3423</Text>
                    </View>
                </Page>
            </Document></>
    )
}

export default DetailsSalePdf;
