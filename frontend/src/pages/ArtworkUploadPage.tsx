import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Palette, ImageIcon, Upload, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';

type AiFeature = 'remove-background' | 'enhance-quality' | 'suggest-colors' | 'optimize-size';

const aiFeatures: { key: AiFeature; label: string; icon: React.ReactNode; description: string }[] = [
  { key: 'remove-background', label: 'Remove Background', icon: <Scissors size={20} />, description: 'Automatically remove the background from your design' },
  { key: 'enhance-quality', label: 'Enhance Quality', icon: <Sparkles size={20} />, description: 'Upscale and sharpen your design for print readiness' },
  { key: 'suggest-colors', label: 'Suggest Colors', icon: <Palette size={20} />, description: 'Get AI-recommended color palettes for your brand' },
  { key: 'optimize-size', label: 'Optimize Size', icon: <ImageIcon size={20} />, description: 'Resize your design to optimal print dimensions' },
];

export default function ArtworkUploadPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [designName, setDesignName] = useState('');
  const [aiResults, setAiResults] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setUploadedImage('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop');
  };

  const handleFileSelect = () => {
    setUploadedImage('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop');
  };

  const handleAiProcess = (feature: AiFeature) => {
    setProcessing(prev => ({ ...prev, [feature]: true }));
    setAiResults(prev => ({ ...prev, [feature]: '' }));
    setTimeout(() => {
      setProcessing(prev => ({ ...prev, [feature]: false }));
      const results: Record<string, string> = {
        'remove-background': 'Background removed successfully! Your design now has a transparent background ready for overlay.',
        'enhance-quality': 'Quality enhanced! Resolution improved to 300 DPI with optimized sharpness and clarity.',
        'suggest-colors': 'Suggested palette: Deep Navy, Coral Red, Slate Gray, and Ivory White for optimal brand contrast.',
        'optimize-size': 'Size optimized! Recommended dimensions: 3000x3000px at 300 DPI for best print quality.',
      };
      setAiResults(prev => ({ ...prev, [feature]: results[feature] || 'Processing complete!' }));
    }, 2000);
  };

  const handleSaveToCart = () => {
    if (!uploadedImage) return;
    addItem({
      productId: 'artwork-upload',
      productName: designName || 'Custom Artwork',
      productImage: uploadedImage,
       basePrice: 30000,
       quantity: 1,
       designUrl: uploadedImage,
       unitPrice: 30000,
    });
  };

  return (
    <SectionErrorBoundary sectionName="Artwork Upload">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/products" className="text-blue-accent hover:underline flex items-center gap-1">
              <ArrowLeft size={16} /> Back to Products
            </Link>
          </div>

          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Artwork Tools</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue-primary mt-2">Upload & Enhance Your Artwork</h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Upload your design, get AI-powered suggestions, and save your artwork to the cart for ordering.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-dark-blue-primary mb-6">Upload Design</h2>

                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition cursor-pointer ${dragActive ? 'border-blue-accent bg-blue-50' : 'border-gray-300 hover:border-blue-accent hover:bg-gray-100'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleFileSelect}
                >
                  {uploadedImage ? (
                    <div className="relative">
                      <img src={uploadedImage} alt="Uploaded design preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                        aria-label="Remove image"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 font-medium">Drag and drop your design here</p>
                      <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                      <p className="text-xs text-gray-400 mt-2">PNG, JPG, SVG up to 10MB</p>
                    </div>
                  )}
                </div>

                {uploadedImage && (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Design Name</label>
                    <input
                      type="text"
                      value={designName}
                      onChange={e => setDesignName(e.target.value)}
                      placeholder="Name your design"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    />
                  </div>
                )}
              </div>

              {uploadedImage && (
                <div className="mt-8 bg-gray-50 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-dark-blue-primary mb-6">AI Suggestions</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {aiFeatures.map(feature => (
                      <div key={feature.key} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-accent/10 flex items-center justify-center text-blue-accent">
                            {feature.icon}
                          </div>
                          <h3 className="font-semibold text-dark-blue-primary">{feature.label}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                        <button
                          onClick={() => handleAiProcess(feature.key)}
                          disabled={processing[feature.key]}
                          className="w-full bg-blue-accent text-dark-blue-primary px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {processing[feature.key] ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Sparkles size={16} />
                              Apply
                            </>
                          )}
                        </button>
                        {aiResults[feature.key] && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 flex items-start gap-2">
                              <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                              {aiResults[feature.key]}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-dark-blue-primary mb-6">Artwork Summary</h2>

                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img src={uploadedImage} alt="Design preview" className="w-full h-48 object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Design Name</p>
                      <p className="font-semibold text-dark-blue-primary">{designName || 'Untitled Design'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle size={14} /> Ready
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500">AI Enhancements Applied</p>
                      <div className="mt-2 space-y-1">
                        {aiFeatures.map(feature => (
                          <div key={feature.key} className="flex items-center gap-2 text-sm">
                            {aiResults[feature.key] ? (
                              <CheckCircle size={14} className="text-green-500" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                            )}
                            <span className={aiResults[feature.key] ? 'text-gray-700' : 'text-gray-400'}>{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleSaveToCart}
                      className="w-full bg-dark-blue-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-dark-blue-secondary transition shadow-md"
                    >
                      Save to Cart
                    </button>
                    <p className="text-xs text-gray-400 text-center">FCFA 30,000</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ImageIcon size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400 text-sm">Upload a design to see the summary</p>
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