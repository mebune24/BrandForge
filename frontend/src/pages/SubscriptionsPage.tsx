import { useNavigate } from 'react-router-dom';
import { simulatedApi } from '../utils/simulatedApi';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import { useSubscription } from '../context/SubscriptionContext';

export default function SubscriptionsPage() {
  const plans = simulatedApi.subscriptions.getAll();
  const navigate = useNavigate();
  const { setSelectedPlan } = useSubscription();

  const handleSubscribe = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    navigate('/checkout');
  };

  return (
    <SectionErrorBoundary sectionName="Subscriptions">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Subscriptions</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Subscription Packages</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Choose a plan that fits your organization. Save more with recurring subscriptions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map(plan => (
              <div key={plan.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition border border-gray-100">
                <span className="text-xs font-semibold text-blue-accent uppercase tracking-wider">{plan.target}</span>
                <h3 className="text-2xl font-bold text-dark-blue-primary mt-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-accent mt-2">FCFA{plan.price.toLocaleString()}<span className="text-sm text-gray-500">/{plan.period === 'monthly' ? 'mo' : 'yr'}</span></p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleSubscribe(plan)} className="mt-6 w-full bg-dark-blue-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition">Subscribe Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
