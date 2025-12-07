import { useState, useEffect } from 'react';
import defaultContent from '../data/siteContent.json';

// Deep merge helper function
const deepMerge = (target, source) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
};

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState(defaultContent);

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setSiteContent(deepMerge(defaultContent, parsedContent));
      } catch (error) {
        console.error('Error parsing site content:', error);
        setSiteContent(defaultContent);
      }
    }

    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'siteContent') {
        try {
          const newContent = JSON.parse(e.newValue || '{}');
          setSiteContent(deepMerge(defaultContent, newContent));
        } catch (error) {
          console.error('Error parsing updated site content:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateContent = (sectionKey, newContent) => {
    const updatedContent = {
      ...siteContent,
      [sectionKey]: newContent
    };
    setSiteContent(updatedContent);
    localStorage.setItem('siteContent', JSON.stringify(updatedContent));
    
    // Trigger a storage event to notify other tabs/windows
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'siteContent',
      newValue: JSON.stringify(updatedContent)
    }));
  };

  const refreshContent = () => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setSiteContent(deepMerge(defaultContent, parsedContent));
      } catch (error) {
        console.error('Error parsing site content:', error);
        setSiteContent(defaultContent);
      }
    }
  };

  return {
    siteContent,
    updateContent,
    refreshContent
  };
};