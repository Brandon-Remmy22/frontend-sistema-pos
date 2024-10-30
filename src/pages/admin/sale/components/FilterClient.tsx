import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  useReactTable,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import debounce from 'lodash/debounce';
import { selectClient } from '../../../../redux/Client/ClientSlice';
import { useSelector } from 'react-redux';
import { getClients, getClientsSearch } from '../../../../services/client/clientService';
import { RiAddCircleLine, RiCircleLine } from 'react-icons/ri';
const FilterClient = ({ addClient }) => {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Direccion",
      accessorKey: "direccion",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
    {
      header: "Carnet",
      accessorKey: "numDocumento",
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <button onClick={() => addClient(row.original)}><RiAddCircleLine color='green' size={23}></RiAddCircleLine></button>
      ),
    },

  ];
  const client = useSelector(selectClient);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [articulos, setArticulos] = useState([]); // Datos traídos del backend
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )


  const [table, setTable] = useState(useReactTable({
    data: articulos, // Initially empty
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  }));


  // Función para hacer la petición al backend
  const fetchArticles = async (term: null) => {
    if (!term) return; // No hacer nada si no hay término de búsqueda

    setLoading(true);
    try {
      const response = await getClientsSearch(term);
      setArticulos(response);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearchChange = useCallback(
    (e: any) => {
      const value = e.target.value;
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  // Usamos debounce para evitar peticiones innecesarias
  const debouncedFetch = useCallback(
    debounce((term: any) => {
      fetchArticles(term);
    }, 700), // Espera de 500ms después de dejar de escribir
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetch(searchTerm ? `${searchTerm}` : null);
    } else {
      setArticulos([]); // Vaciar artículos si no hay término de búsqueda
    }
  }, [searchTerm, debouncedFetch]);

  return (
    <>
      <div>
        <div className='flex justify-between'>
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar cliente..."
              className="border p-2 rounded w-full md:w-[200px] mb-2"
              style={{ borderColor: '#93A8FF' }}
            />
          </div>
          <div className='text-4xl'>{client ? client.nombre : 'SIN CLIENTE'}</div>
        </div>
        <div className="table-content overflow-y-auto custom-scrollbar">
          <table className='min-w-full leading-normal'>
            <thead className='sticky top-0 bg-gray-100  z-0'>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className='bg-gray-100 text-gray-600 uppercase text-xs leading-normal'>
                  {
                    headerGroup.headers.map(header => (
                      <th key={header.id} className="py-4 px-6 text-left relative" style={{ minHeight: '50px' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))
                  }
                </tr>
              ))}
            </thead>
            <tbody className='text-gray-700 text-md bg-white'>
              {table.getRowModel().rows.map((row, index) => (
                <tr className={`border-b border-gray-200 hover:bg-gray-100 group ${selectedRowIndex === index ? 'bg-blue-100' : ''
                  }`}
                  style={{ minHeight: '50px' }} key={row.id}
                  onClick={() => setSelectedRowIndex(index)}
                >
                  {
                    row.getVisibleCells().map(cell => (
                      <td className="py-4 px-6 text-left text-sm group-hover:bg-gray-100"
                        style={{ minHeight: '50px' }} key={cell.id} >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
              ))}
            </tbody>
          </table>


        </div>
        <div className="flex items-center gap-2 mt-4">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div className='mx-2'>Página</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="items-center gap-1 hidden lg:block">
            | Ir a la página :
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50, 60, 200].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}


export default FilterClient;