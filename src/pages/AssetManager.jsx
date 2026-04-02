import { useState, useRef } from 'react';
import { useAssets } from '../context/AssetContext';

const SLOTS = [
  { key: 'logo', label: 'BrainMoove Logo', description: 'Used in Banner, Intro Page, Treatment Finder, Carousel' },
  { key: 'children-bg', label: 'Children Background', description: 'Used in Audience Section (children programme)' },
  { key: 'adults-bg', label: 'Adults Background', description: 'Used in Audience Section (adults programme)' },
  { key: 'seniors-bg', label: 'Seniors Background', description: 'Used in Audience Section (seniors programme)' },
  { key: 'interview-bg', label: 'Interview / Video Panel', description: 'Used in Audience Section video panel background' },
];

function SlotCard({ slot, url, defaultUrl, onUpload, onReset }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef();

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setToast('Please select an image file.');
      setTimeout(() => setToast(''), 3000);
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slot', slot.key);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const { url: newUrl } = await res.json();
      await onUpload(slot.key, newUrl);
      setToast('Uploaded successfully!');
      setTimeout(() => setToast(''), 3000);
    } catch (e) {
      setToast('Upload failed. Is the dev server running?');
      setTimeout(() => setToast(''), 4000);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200">
      {/* Image Preview */}
      <div
        className="h-48 bg-slate-100 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
        {toast && (
          <div className="absolute top-3 left-3 right-3 bg-green-600 text-white text-sm px-3 py-2 rounded-lg shadow z-10">
            {toast}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Label */}
        <div>
          <h3 className="font-semibold text-slate-800">{slot.label}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{slot.description}</p>
        </div>

        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
            dragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {uploading ? (
            <p className="text-sm text-slate-500">Uploading...</p>
          ) : (
            <p className="text-sm text-slate-500">
              Drop image here or <span className="text-blue-600 font-medium">click to browse</span>
            </p>
          )}
        </div>

        {/* Current URL */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 truncate"
          />
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={() => onReset(slot.key)}
          disabled={url === defaultUrl}
          className="w-full text-sm py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Reset to default
        </button>
      </div>
    </div>
  );
}

export default function AssetManager() {
  const { assets, updateAsset, resetAsset, defaults } = useAssets();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Asset Manager</h1>
        <button
          onClick={() => { window.location.href = '/'; }}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Prototype
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SLOTS.map(slot => (
          <SlotCard
            key={slot.key}
            slot={slot}
            url={assets[slot.key]}
            defaultUrl={defaults[slot.key]}
            onUpload={updateAsset}
            onReset={resetAsset}
          />
        ))}
      </div>
    </div>
  );
}
