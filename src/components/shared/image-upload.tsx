"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  disabled = false,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Simulate upload - replace with actual upload logic
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      // Create temporary URL for preview (mock)
      const url = URL.createObjectURL(file);
      newUrls.push(url);
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onChange([...value, ...newUrls].slice(0, maxFiles));
    setIsUploading(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative group w-24 h-24 rounded-lg overflow-hidden border"
          >
            <Image
              src={url}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {value.length < maxFiles && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || isUploading}
            className={cn(
              "w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-colors",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={disabled || isUploading}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground">
        {value.length}/{maxFiles} gambar (max 5MB per gambar)
      </p>
    </div>
  );
}