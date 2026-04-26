import { createBroker } from "../../../actions/brokers";

export default function NewBrokerPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
        Create Broker
      </h1>
      
      <form 
        action={createBroker} 
        className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
      >
        {/* Broker Name - Mirrors 'Title' */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Broker Name
          </label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" 
          />
        </div>

        {/* Rating - Mirrors 'Difficulty' style */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Broker Rating
          </label>
          <input 
            type="text" 
            name="rating" 
            required 
            placeholder="e.g. 4.9/5"
            className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" 
          />
        </div>

        {/* Logo - Mirrors 'Cover Image' */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Broker Logo
          </label>
          <input 
            type="file" 
            name="logo" 
            accept="image/*" 
            className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400" 
          />
        </div>

        {/* Website URL - Additional Broker Field */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Official Website URL
          </label>
          <input 
            type="url" 
            name="websiteUrl" 
            required 
            className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" 
          />
        </div>

        {/* Affiliate Link - Additional Broker Field */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Affiliate Link
          </label>
          <input 
            type="url" 
            name="affiliateLink" 
            required 
            className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white" 
          />
        </div>

        {/* Description - Mirrors 'Content' */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Detailed Review / Description
          </label>
          <textarea 
            name="description" 
            required 
            rows={10} 
            className="w-full p-2 border rounded-md dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Broker
        </button>
      </form>
    </div>
  );
}
