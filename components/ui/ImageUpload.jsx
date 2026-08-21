"use client";
import { useState, useRef } from 'react';
import { Camera } from '@phosphor-icons/react/dist/ssr';

export default function ImageUpload({ onChange, label = 'Profile picture' }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-canvas"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink/25">
            <Camera size={22} weight="light" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/40">
          <Camera size={16} weight="fill" className="text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </button>
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="text-sm text-clinic-600 hover:text-clinic-700">
          {preview ? 'Change photo' : 'Upload photo'}
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
    </div>
  );
}
