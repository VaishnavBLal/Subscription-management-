'use client';
import { useState, useEffect } from 'react';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then((res) => res.json())
      .then((data) => setSubscriptions(data));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch('/api/subscriptions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, status } : s));
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Subscription Lifecycle & State Machine</h1>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">Sub Number</th>
              <th className="p-3">Customer</th>
              <th className="p-3">State</th>
              <th className="p-3">Payment Terms</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3 font-medium">{s.subNumber}</td>
                <td className="p-3">{s.customer?.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    s.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    s.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                    s.status === 'QUOTATION' ? 'bg-yellow-100 text-yellow-800' :
                    s.status === 'PAUSED' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-3">{s.paymentTerms}</td>
                <td className="p-3 space-x-2">
                  {s.status === 'DRAFT' && <button onClick={() => updateStatus(s.id, 'QUOTATION')} className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Make Quote</button>}
                  {s.status === 'QUOTATION' && <button onClick={() => updateStatus(s.id, 'CONFIRMED')} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Confirm</button>}
                  {s.status === 'CONFIRMED' && <button onClick={() => updateStatus(s.id, 'ACTIVE')} className="text-xs bg-green-500 text-white px-2 py-1 rounded">Activate</button>}
                  {s.status === 'ACTIVE' && <button onClick={() => updateStatus(s.id, 'PAUSED')} className="text-xs bg-purple-500 text-white px-2 py-1 rounded">Pause</button>}
                  {s.status !== 'CLOSED' && <button onClick={() => updateStatus(s.id, 'CLOSED')} className="text-xs bg-red-500 text-white px-2 py-1 rounded">Close</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}