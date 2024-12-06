import React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Store = {
  name: string;
  phone: string;
  description: string;
  imageUrl: string;
};

const data: Store[] = [
  {
    name: "Perfumería Primor",
    phone: "912 345 678",
    description: "Tu perfumería de confianza con las mejores marcas de cosmética y perfumes.",
    imageUrl: "/stores/primor.jpg"
  },
  {
    name: "Droguería García",
    phone: "911 223 344",
    description: "Productos de limpieza, cosmética y cuidado personal.",
    imageUrl: "/stores/drogueria.jpg"
  },
  {
    name: "Herboristería El Jardín Natural",
    phone: "913 456 789",
    description: "Especialistas en productos naturales, hierbas medicinales y cosmética ecológica.",
    imageUrl: "/stores/herboristeria.jpg"
  },
  {
    name: "Cosmética Carmen",
    phone: "914 567 890",
    description: "Tu tienda especializada en productos de belleza profesional.",
    imageUrl: "/stores/cosmetica-carmen.jpg"
  }
];

const columns: ColumnDef<Store>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
];

export const DataTableDemo = () => {
  const [sorting, setSorting] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      <Input
        placeholder="Filtrar por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <Button
                      variant="ghost"
                      onClick={() => header.column.toggleSorting()}
                    >
                      {header.column.columnDef.header}
                    </Button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {cell.renderCell()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 