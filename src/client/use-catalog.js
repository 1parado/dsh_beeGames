import { useState, useEffect, useSyncExternalStore } from 'react';
import { createCatalogStore } from './catalog-store.js';
import { api } from './api.js';

export function useCatalog(localeTag) {
  const [catalog] = useState(() => createCatalogStore(api));
  useEffect(() => {
    void catalog.activate(localeTag);
    return catalog.deactivate;
  }, [catalog, localeTag]);
  const state = useSyncExternalStore(catalog.subscribe, catalog.getSnapshot, catalog.getSnapshot);
  return { ...state, catalog };
}
