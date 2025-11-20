'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CodeEditor } from '@/components/CodeEditor';
import { yamlToToon, calculateTokenSavings, ToonOptions } from '@/lib/toon-converter';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useAutoSave, loadFromStorage, clearStorage } from '@/hooks/useAutoSave';

const EXAMPLE_YAML = `users:
  - id: 1
    name: Alice Johnson
    age: 30
    city: New York
    role: Developer
  - id: 2
    name: Bob Smith
    age: 25
    city: San Francisco
    role: Designer
  - id: 3
    name: Charlie Brown
    age: 35
    city: Chicago
    role: Manager`;

const STORAGE_KEY = 'yaml-to-toon-input';

export default function YamlToToonPage() {
  const [yamlInput, setYamlInput] = useState('');
  const [toonOutput, setToonOutput] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState<ToonOptions>({
    delimiter: ',',
    indentation: 2,
    showLengthMarkers: true,
  });
  const [stats, setStats] = useState({
    jsonTokens: 0,
    toonTokens: 0,
    savedTokens: 0,
    savedPercentage: 0,
  });
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  // Load saved input on mount
  useEffect(() => {
    const savedInput = loadFromStorage(STORAGE_KEY, '');
    if (savedInput) {
      setYamlInput(savedInput);
    }
  }, []);

  // Auto-save input with 1 second debounce
  useAutoSave(STORAGE_KEY, yamlInput, 1000);

  useEffect(() => {
    if (!yamlInput.trim()) {
      setToonOutput('');
      setError('');
      setStats({ jsonTokens: 0, toonTokens: 0, savedTokens: 0, savedPercentage: 0 });
      return;
    }

    try {
      const converted = yamlToToon(yamlInput, options);
      setToonOutput(converted);
      setError('');

      const tokenStats = calculateTokenSavings(yamlInput, converted);
      setStats(tokenStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid YAML');
      setToonOutput('');
      setStats({ jsonTokens: 0, toonTokens: 0, savedTokens: 0, savedPercentage: 0 });
    }
  }, [yamlInput, options]);

  const loadExample = () => {
    setYamlInput(EXAMPLE_YAML);
  };

  const clearAll = () => {
    setYamlInput('');
    setToonOutput('');
    setError('');
    clearStorage(STORAGE_KEY);
  };

  const handleCopy = () => {
    copyToClipboard(toonOutput);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Top Bar - Actions and Options */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={loadExample} variant="outline" size="default">
            Load Example
          </Button>
          <Button onClick={clearAll} variant="outline" size="default">
            Clear All
          </Button>
        </div>

        {/* Options - Inline */}
        <div className="flex flex-wrap items-center gap-4 lg:ml-auto">
          <div className="flex items-center gap-2">
            <Label htmlFor="delimiter" className="text-sm whitespace-nowrap">Delimiter</Label>
            <Select
              value={options.delimiter}
              onValueChange={(value) =>
                setOptions({ ...options, delimiter: value as ',' | '|' | '\t' })
              }
            >
              <SelectTrigger id="delimiter" className="h-9 w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=",">Comma (,)</SelectItem>
                <SelectItem value="|">Pipe (|)</SelectItem>
                <SelectItem value="\t">Tab</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="indentation" className="text-sm whitespace-nowrap">Indentation</Label>
            <Select
              value={String(options.indentation)}
              onValueChange={(value) =>
                setOptions({ ...options, indentation: Number(value) })
              }
            >
              <SelectTrigger id="indentation" className="h-9 w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
                <SelectItem value="8">8 spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="lengthMarkers"
              checked={options.showLengthMarkers}
              onCheckedChange={(checked) =>
                setOptions({ ...options, showLengthMarkers: checked as boolean })
              }
            />
            <Label
              htmlFor="lengthMarkers"
              className="text-sm font-normal cursor-pointer whitespace-nowrap"
            >
              Show length markers (#)
            </Label>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YAML Input */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">YAML Input</h2>
          <CodeEditor
            value={yamlInput}
            onChange={setYamlInput}
            placeholder="Paste your YAML here..."
            language="yaml"
          />
          {error && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </Card>

        {/* TOON Output */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">TOON Output</h2>
            {toonOutput && (
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="default" size="sm">
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          <CodeEditor
            value={toonOutput}
            onChange={() => {}}
            placeholder="TOON output will appear here..."
            language="toon"
            readOnly
          />
        </Card>
      </div>

      {/* Stats Bar */}
      <Card className="p-4 mb-6 mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">YAML Tokens</div>
            <div className="text-2xl font-bold">{stats.jsonTokens}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">TOON Tokens</div>
            <div className="text-2xl font-bold text-[#EA6A47] dark:text-[#EA6A47]">
              {stats.toonTokens}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Saved</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.savedPercentage}%
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
