'use client';

import { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  readOnly?: boolean;
  language?: 'json' | 'toon' | 'xml' | 'csv' | 'yaml' | 'text';
}

export function CodeEditor({
  value,
  onChange,
  placeholder,
  label,
  className,
  readOnly = false,
  language = 'json',
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label htmlFor={`editor-${language}`}>{label}</Label>}
      <Textarea
        ref={textareaRef}
        id={`editor-${language}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          'font-mono text-sm min-h-[400px] resize-none',
          readOnly && 'bg-muted cursor-default'
        )}
      />
    </div>
  );
}
