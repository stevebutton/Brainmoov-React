import { createContext, useContext, useState, useEffect } from 'react';

const DEFAULTS = {
  logo: 'https://raw.githubusercontent.com/stevebutton/brainmoove-prototype/main/gfx/newlogo.jpg',
  'children-bg': 'https://raw.githubusercontent.com/stevebutton/brainmoove-prototype/main/gfx/DSC_1906.jpg',
  'adults-bg': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1280&h=800&fit=crop&q=80',
  'seniors-bg': 'https://images.unsplash.com/photo-1573881611865-ba68e90df6c3?w=1280&h=800&fit=crop&q=80',
  'interview-bg': 'https://raw.githubusercontent.com/stevebutton/brainmoove-prototype/main/gfx/Interview.jpg',
};

const AssetContext = createContext(null);

export function AssetProvider({ children }) {
  const [assets, setAssets] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`/asset-config.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(config => setAssets({ ...DEFAULTS, ...config }))
      .catch(() => {});
  }, []);

  const updateAsset = async (slot, url) => {
    const next = { ...assets, [slot]: url };
    setAssets(next);
    try {
      await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch (_) {}
  };

  const resetAsset = (slot) => {
    updateAsset(slot, DEFAULTS[slot]);
  };

  return (
    <AssetContext.Provider value={{ assets, updateAsset, resetAsset, defaults: DEFAULTS }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  return useContext(AssetContext);
}
