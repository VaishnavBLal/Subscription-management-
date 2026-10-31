'use client';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('Software');
  const [salesPrice, setSalesPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [variantName, setVariantName] = useState('Odoo Brand');
  const [variantModifier, setVariantModifier] = useState('560');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        type,
        salesPrice: Number(salesPrice),
        costPrice: Number(costPrice),
        notes,
        variants: [{ name: variantName, priceModifier: Number(variantModifier) }],
      }),
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Catalog & Variants</h1>
      
      <form onSubmit={handleCreateProduct} className="bg-white p-6 rounded shadow mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input className="border p-2 w-full rounded" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Type</label>
          <input className="border p-2 w-full rounded" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Sales Price</label>
          <input type="number" className="border p-2 w-full rounded" value={salesPrice} onChange={(e) => setSalesPrice(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Cost Price</label>
          <input type="number" className="border p-2 w-full rounded" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Notes</label>
          <textarea className="border p-2 w-full rounded" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Variant Option (e.g. Odoo Brand)</label>
          <input className="border p-2 w-full rounded" value={variantName} onChange={(e) => setVariantName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Variant Price Modifier</label>
          <input type="number" className="border p-2 w-full rounded" value={variantModifier} onChange={(e) => setVariantModifier(e.target.value)} />
        </div>
        <div className="col-span-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Sales Price</th>
              <th className="p-3">Cost Price</th>
              <th className="p-3">Variants</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.type}</td>
                <td className="p-3">${p.salesPrice}</td>
                <td className="p-3">${p.costPrice}</td>
                <td className="p-3">
                  {p.variants.map((v: any) => (
                    <span key={v.id} className="inline-block bg-gray-200 text-xs px-2 py-1 rounded mr-1">
                      {v.name} (+${v.priceModifier})
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}