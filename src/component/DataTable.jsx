import { tableFeatures, useTable } from "@tanstack/react-table"

const features = tableFeatures({});

function DataTable({ data, columns }) {
    const table = useTable({
        features,
        data,
        columns,
    });
    return (
        <div className="overflow-auto rounded-lg border bg-white">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                    {table.getHeaderGroups().map(
                        (headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(
                                    (header) => (
                                        <th key={header.id} className="px-4 py-3">
                                            <table.FlexRender header={header} />
                                        </th>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(
                        (row) => (
                            <tr key={row.id} className="border-t hover:bg-slate-50">
                                {row.getAllCells().map(
                                    (cell) => (
                                        <td key={cell.id} className="px-4 py-3">
                                            <table.FlexRender cell={cell} />
                                        </td>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default DataTable;