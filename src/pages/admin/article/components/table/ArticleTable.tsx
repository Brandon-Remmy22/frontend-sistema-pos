import React, { useState, useEffect, useMemo, useCallback } from 'react';

import {
  useReactTable,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import OptionsColumn from './OptionsColumn';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './AppDispach';
import { getArticlesFetch } from '../../../../../redux/Article/ArticleSlice';
import { useAuth } from '../../../../../hooks/useAuth';


const ArticleTable = ({ articles }) => {

  const { userRole } = useAuth();
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "precio",
      accessorKey: "precio",
    },
    {
      header: "talla",
      accessorKey: "talla",
    },
    {
      header: "color",
      accessorKey: "color",
    },
    {
      header: "sexo",
      accessorKey: "sexo",
    },
    {
      header: "stock",
      accessorKey: "stock",
    },
    {
      header: "categoria",
      accessorKey: "categoria_nombre",
    },
    {
      header: "imagen",
      accessorKey: "img",
      cell: ({ row }) => (
        <img
          src={`http://localhost:8080/uploads/${row.original.img}`}
          alt={row.original.nombre}  // Texto alternativo usando el nombre del artículo
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      id: 'actions',
      header:  userRole === '1'? 'Acciones':'',
      cell: ({ row }) => (
        <>
          {userRole === '1' && (
            <OptionsColumn article={row.original} updateArticles={updateArticles} />
          )}
        </>
      ),
    },

  ];
  const dispatch = useDispatch<AppDispatch>();
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [table, setTable] = useState(useReactTable({
    data: articles, // Initially empty
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

  const updateArticles = () => {
    dispatch(getArticlesFetch());
  }

  return (
    <>
      <div>
        <div className="mb-4">
          {userRole === '1' && (<>                        </>)}
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            className="border p-2 rounded w-full md:w-[200px]"
            style={{ borderColor: '#93A8FF' }}
          />
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
              {table.getRowModel().rows.map(row => (

                <tr className="border-b border-gray-200 hover:bg-gray-100 group"
                  style={{ minHeight: '50px' }} key={row.id}>
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


export default ArticleTable;