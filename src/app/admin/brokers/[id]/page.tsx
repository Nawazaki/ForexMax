import prisma from "../../../../lib/prisma";
import { updateBroker } from "../../../actions/brokers";
import { notFound } from "next/navigation";

export default async function EditBrokerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const broker = await prisma.broker.findUnique({
    where: { id },
  });

  if (!broker) notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Edit Broker</h1>
      
      <form action={updateBroker} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <input type="hidden" name="id" value={broker.id} />
        
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Broker Name</label>
          <input type="text" name="name" defaultValue={broker.name} required className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Website URL</label>
          <input type="url" name="websiteUrl" defaultValue={broker.websiteUrl} required className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Affiliate Link</label>
          <input type="url" name="affiliateLink" defaultValue={broker.affiliateLink} required className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Logo Image (Leave empty to keep current)</label>
          <input type="file" name="logo" accept="image/*" className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Update Broker
        </button>
      </form>
    </div>
  );
}
