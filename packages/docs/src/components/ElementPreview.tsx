import React from 'react';

interface ElementPreviewProps {
  children: React.ReactNode;
}

export const ElementPreview: React.FC<ElementPreviewProps> = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        background: `repeating-linear-gradient(
          45deg,
          #ccc,
          #ccc 10px,
          #eee 10px,
          #eee 20px
        )`,
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 'calc(20px + 70px)',
        }}
      >
        {children}
      </div>
    </div>
  );
};