import { useEffect } from 'react';

const BASE_TITLE = 'Kiss Máté - Masszázsterapeuta Budapest';

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export const useMetaDescription = (description: string) => {
  useEffect(() => {
    let metaDescription = document.querySelector('meta[name="description"]');
    const previousContent = metaDescription?.getAttribute('content') || '';
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.setAttribute('content', description);
    
    return () => {
      if (metaDescription) {
        metaDescription.setAttribute('content', previousContent);
      }
    };
  }, [description]);
};

export const useSEO = (options: {
  title?: string;
  description?: string;
}) => {
  useDocumentTitle(options.title);
  
  useEffect(() => {
    if (options.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.setAttribute('content', options.description);
    }
  }, [options.description]);
};
