import { useState } from 'react';
import { Link } from 'react-router-dom';
import { simulatedApi } from '../utils/simulatedApi';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import type { Address } from '../types';

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>(() => simulatedApi.addresses.getAll());
  const [form, setForm] = useState({ label: '', fullName: '', phone: '', street: '', city: '', region: '', country: 'Cameroon' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!form.label || !form.fullName || !form.phone || !form.street || !form.city || !form.region) {
      alert('Please fill all fields');
      return;
    }
    if (editingId) {
      simulatedApi.addresses.update(editingId, form);
      setEditingId(null);
    } else {
      simulatedApi.addresses.add({ ...form, isDefault: addresses.length === 0 });
    }
    setAddresses(simulatedApi.addresses.getAll());
    setForm({ label: '', fullName: '', phone: '', street: '', city: '', region: '', country: 'Cameroon' });
  };

  const handleEdit = (addr: Address) => {
    setForm({ label: addr.label, fullName: addr.fullName, phone: addr.phone, street: addr.street, city: addr.city, region: addr.region, country: addr.country });
    setEditingId(addr._id || null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this address?')) {
      simulatedApi.addresses.delete(id);
      setAddresses(simulatedApi.addresses.getAll());
    }
  };

  return (
    <SectionErrorBoundary sectionName="Address Book">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-dark-blue-primary">Address Book</h1>
            <Link to="/account" className="text-blue-accent hover:underline">Account Settings</Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Address' : 'Add New Address'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="Label" className="border border-gray-300 rounded-md px-3 py-2" />
              <input value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className="border border-gray-300 rounded-md px-3 py-2" />
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="border border-gray-300 rounded-md px-3 py-2" />
              <input value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} placeholder="Street" className="border border-gray-300 rounded-md px-3 py-2" />
              <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" className="border border-gray-300 rounded-md px-3 py-2" />
              <input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} placeholder="Region" className="border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleSubmit} className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition">{editingId ? 'Update' : 'Save'}</button>
              {editingId && <button onClick={() => { setEditingId(null); setForm({ label: '', fullName: '', phone: '', street: '', city: '', region: '', country: 'Cameroon' }); }} className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50">Cancel</button>}
            </div>
          </div>

          <div className="space-y-4">
            {addresses.map(addr => (
              <div key={addr._id} className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-start">
                <div>
                  <p className="font-semibold text-dark-blue-primary">{addr.label}</p>
                  <p className="text-gray-600">{addr.fullName}, {addr.phone}</p>
                  <p className="text-gray-600">{addr.street}, {addr.city}, {addr.region}, {addr.country}</p>
                  {addr.isDefault && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-2 inline-block">Default</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(addr)} className="text-blue-accent hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(addr._id!)} className="text-red-600 hover:underline text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
