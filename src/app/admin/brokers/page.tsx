import prisma from "../../../lib/prisma";
import { deleteBroker } from "../../actions/brokers";
import Link from "next/link";

export default async function AdminBrokersPage() {
  const brokers = await prisma.broker.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Brokers Management</h1>
        <Link href="/admin/brokers/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Add Broker
        </Link>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase font-medium">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Website</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {brokers.map((broker) => (
              <tr key={broker.id} className="dark:text-white">
                <td className="p-4 font-medium">{broker.name}</td>
                <td className="p-4 text-zinc-500 dark:text-zinc-400 truncate max-w-xs">{broker.websiteUrl}</td>
                <td className="p-4 text-right space-x-3">
                  <Link href={`/admin/brokers/${broker.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <form action={deleteBroker} className="inline">
                    <input type="hidden" name="id" value={broker.id} />
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
