import { useState } from 'react';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

type AIFeature = 'background_removal' | 'mockup_generator' | 'color_suggestions' | 'size_optimizer' | 'quality_check';

const features: { key: AIFeature; label: string; description: string }[] = [
  { key: 'background_removal', label: 'AI Background Removal', description: 'Upload a logo and our AI will remove the background automatically.' },
  { key: 'mockup_generator', label: 'Product Mockup Generator', description: 'Generate realistic mockups of your design on apparel.' },
  { key: 'color_suggestions', label: 'Color Palette Suggestions', description: 'Get AI-recommended color combinations for your brand.' },
  { key: 'size_optimizer', label: 'Print Size Optimizer', description: 'AI analyzes your design and suggests optimal print size.' },
  { key: 'quality_check', label: 'Design Quality Check', description: 'Check resolution, format, and print readiness.' },
];

export default function AIAssistantPage() {
  const [activeFeature, setActiveFeature] = useState<AIFeature>('background_removal');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSimulate = () => {
    setProcessing(true);
    setResult(null);
    setTimeout(() => {
      setProcessing(false);
      switch (activeFeature) {
        case 'background_removal':
          setResult('Background removed successfully! Transparent PNG ready for download.');
          break;
        case 'mockup_generator':
          setResult('Mockup generated: White T-Shirt with your design. Click to download preview.');
          break;
        case 'color_suggestions':
          setResult('Recommended colors: Navy Blue, White, Charcoal Gray, Forest Green, Maroon.');
          break;
        case 'size_optimizer':
          setResult('Optimal print size: 10" x 8" for best visibility on chest print.');
          break;
        case 'quality_check':
          setResult('Design quality: Good (300 DPI). File format: PNG. Ready for print.');
          break;
      }
    }, 1500);
  };

  return (
    <SectionErrorBoundary sectionName="AI Design Assistant">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">AI Tools</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue-primary mt-2">AI Design Assistant</h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Leverage artificial intelligence to perfect your designs, generate mockups, and ensure print-ready quality.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Tools</h2>
              <div className="space-y-2">
                {features.map(f => (
                  <button key={f.key} onClick={() => { setActiveFeature(f.key); setResult(null); setUploadedImage(null); }} className={`w-full text-left p-4 rounded-xl border-2 transition ${activeFeature === f.key ? 'border-blue-accent bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <p className="font-semibold text-dark-blue-primary">{f.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{f.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-dark-blue-primary mb-6">{features.find(f => f.key === activeFeature)?.label}</h3>

                {(activeFeature === 'background_removal' || activeFeature === 'mockup_generator' || activeFeature === 'quality_check') && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Upload Design</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-accent transition cursor-pointer" onClick={() => setUploadedImage('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop')}>
                      {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded" className="max-h-48 mx-auto rounded-lg" />
                      ) : (
                        <div>
                          <p className="text-gray-500">Click to upload a sample design</p>
                          <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeFeature === 'color_suggestions' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Brand Color</label>
                    <div className="flex gap-3">
                      {['#1e3a8a', '#dc2626', '#16a34a', '#f59e0b', '#7c3aed'].map(color => (
                        <button key={color} className="w-10 h-10 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                )}

                {activeFeature === 'size_optimizer' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Product Type</label>
                    <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                      <option>T-Shirt (Chest Print)</option>
                      <option>Hoodie (Center Print)</option>
                      <option>Cap (Front Print)</option>
                      <option> polo (Left Chest)</option>
                    </select>
                  </div>
                )}

                <button onClick={handleSimulate} disabled={processing || (activeFeature !== 'color_suggestions' && activeFeature !== 'size_optimizer' && !uploadedImage)} className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition shadow-lg disabled:opacity-50">
                  {processing ? 'AI Processing...' : 'Run AI Analysis'}
                </button>

                {result && (
                  <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl">
                    <p className="font-semibold">Result:</p>
                    <p>{result}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
