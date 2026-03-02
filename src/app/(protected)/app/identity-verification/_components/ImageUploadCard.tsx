'use client';

import { useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HiOutlineUpload, HiOutlineX } from 'react-icons/hi';

interface ImageUploadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string | null;
  onChange: (base64: string | null) => void;
  disabled?: boolean;
}

export function ImageUploadCard({
  title,
  description,
  icon,
  value,
  onChange,
  disabled = false,
}: ImageUploadCardProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File): Promise<void> => {
      if (!file.type.startsWith('image/')) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        onChange(base64);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent): void => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleClear = (): void => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
          disabled={disabled}
        />
        {value ? (
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/jpeg;base64,${value}`}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleClear}
              >
                <HiOutlineX className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div
            onClick={disabled ? undefined : handleClick}
            onDragOver={disabled ? undefined : handleDragOver}
            onDragLeave={disabled ? undefined : handleDragLeave}
            onDrop={disabled ? undefined : handleDrop}
            className={`
              aspect-[4/3] rounded-lg border-2 border-dashed
              flex flex-col items-center justify-center gap-3
              transition-colors
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary/50 hover:bg-muted/50'}
              ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            `}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
              <HiOutlineUpload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click or drag to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
