import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSimulatedOrders } from '../utils/simulatedApi';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

type TabId = 'profile' | 'security' | 'notifications';

interface TabConfig {
  id: TabId;
  label: string;
}

const tabs: TabConfig[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [notifPrefs, setNotifPrefs] = useState({ email: true, sms: false, whatsapp: true });
  const [saveMessage, setSaveMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const orders = getSimulatedOrders();

  const totalOrders = orders.filter(o => {
    if (typeof o.customer === 'string') return false;
    return o.customer._id === user?._id;
  }).length;

  const totalSpent = orders
    .filter(o => {
      if (typeof o.customer === 'string') return false;
      return o.customer._id === user?._id && o.status !== 'cancelled';
    })
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const handleProfileSave = useCallback(() => {
    if (!user) return;
    const updatedUser = { ...user, name: formData.name, email: formData.email, phone: formData.phone || undefined };
    updateUser(updatedUser);
    setEditing(false);
    setSaveMessage('Profile updated successfully.');
    setTimeout(() => setSaveMessage(''), 3000);
  }, [user, formData, updateUser]);

  const handlePasswordChange = useCallback(() => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('Passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters.');
      return;
    }
    setPasswordMessage('Password changed successfully.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordMessage(''), 3000);
  }, [passwordForm]);

  return (
    <SectionErrorBoundary sectionName="Profile">
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Profile</span>
            <h1 className="text-4xl font-bold text-dark-blue-primary mt-2">My Profile</h1>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 flex flex-wrap gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-dark-blue-primary">{totalOrders}</p>
              <p className="text-sm text-gray-600 mt-1">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-accent">FCFA{totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">Total Spent</p>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-semibold border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-blue-accent text-blue-accent'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-dark-blue-primary">Profile Information</h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-blue-accent text-sm font-semibold hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {saveMessage && (
                <p className="text-green-600 text-sm font-medium mb-4">{saveMessage}</p>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    />
                  ) : (
                    <p className="text-dark-blue-primary">{user?.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    />
                  ) : (
                    <p className="text-dark-blue-primary">{user?.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-dark-blue-primary">{user?.phone ?? 'Not set'}</p>
                  )}
                </div>
              </div>

              {editing && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleProfileSave}
                    className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' });
                    }}
                    className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-dark-blue-primary mb-6">Change Password</h2>
              {passwordMessage && (
                <p className={`text-sm font-medium mb-4 ${passwordMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordMessage}
                </p>
              )}
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="bg-blue-accent text-dark-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-dark-blue-primary mb-6">Notification Preferences</h2>
              <div className="space-y-4 max-w-md">
                {[
                  { key: 'email' as const, label: 'Email Notifications', description: 'Receive updates via email' },
                  { key: 'sms' as const, label: 'SMS Notifications', description: 'Receive updates via text message' },
                  { key: 'whatsapp' as const, label: 'WhatsApp Notifications', description: 'Receive updates via WhatsApp' },
                ].map(pref => (
                  <div key={pref.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-dark-blue-primary">{pref.label}</p>
                      <p className="text-sm text-gray-500">{pref.description}</p>
                    </div>
                    <button
                      onClick={() => setNotifPrefs({ ...notifPrefs, [pref.key]: !notifPrefs[pref.key] })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifPrefs[pref.key] ? 'bg-blue-accent' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifPrefs[pref.key] ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </SectionErrorBoundary>
  );
}