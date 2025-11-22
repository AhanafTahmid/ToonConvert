'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CodeEditor } from '@/components/CodeEditor';
import { toonToJson, calculateTokenSavings } from '@/lib/toon-converter';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useAutoSave, loadFromStorage, clearStorage } from '@/hooks/useAutoSave';

const EXAMPLE_TOON = `items[3]{id,name,age,city,role}:
  1,Alice Johnson,30,New York,Developer
  2,Bob Smith,25,San Francisco,Designer
  3,Charlie Brown,35,Chicago,Manager`;

const STORAGE_KEY = 'toon-to-json-input';

export default function ToonToJsonPage() {
  const [toonInput, setToonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    toonTokens: 0,
    jsonTokens: 0,
    savedTokens: 0,
    savedPercentage: 0,
  });
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  // Load saved input on mount
  useEffect(() => {
    const savedInput = loadFromStorage(STORAGE_KEY, '');
    if (savedInput) {
      setToonInput(savedInput);
    }
  }, []);

  // Auto-save input with 1 second debounce
  useAutoSave(STORAGE_KEY, toonInput, 1000);

  useEffect(() => {
    if (!toonInput.trim()) {
      setJsonOutput('');
      setError('');
      setStats({ toonTokens: 0, jsonTokens: 0, savedTokens: 0, savedPercentage: 0 });
      return;
    }

    try {
      const parsed = toonToJson(toonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      setError('');

      // Calculate token savings (reversed: TOON input -> JSON output)
      const tokenStats = calculateTokenSavings(formatted, toonInput);
      // Swap the values since we're going from TOON to JSON
      setStats({
        toonTokens: tokenStats.toonTokens,
        jsonTokens: tokenStats.jsonTokens,
        savedTokens: tokenStats.savedTokens,
        savedPercentage: tokenStats.savedPercentage,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid TOON format');
      setJsonOutput('');
      setStats({ toonTokens: 0, jsonTokens: 0, savedTokens: 0, savedPercentage: 0 });
    }
  }, [toonInput]);

  const loadExample = () => {
    setToonInput(EXAMPLE_TOON);
  };

  const clearAll = () => {
    setToonInput('');
    setJsonOutput('');
    setError('');
    setStats({ toonTokens: 0, jsonTokens: 0, savedTokens: 0, savedPercentage: 0 });
    clearStorage(STORAGE_KEY);
  };

  const handleCopy = () => {
    copyToClipboard(jsonOutput);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={loadExample} variant="outline" size="default">
          Load Example
        </Button>
        <Button onClick={clearAll} variant="outline" size="default">
          Clear All
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TOON Input */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">TOON Input</h2>
          <CodeEditor
            value={toonInput}
            onChange={setToonInput}
            placeholder="Paste your TOON format here..."
            language="toon"
          />
          {error && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </Card>

        {/* JSON Output */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">JSON Output</h2>
            {jsonOutput && (
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
                <Button onClick={downloadJson} variant="default" size="sm">
                  Download
                </Button>
              </div>
            )}
          </div>
          <CodeEditor
            value={jsonOutput}
            onChange={() => {}}
            placeholder="JSON output will appear here..."
            language="json"
            readOnly
          />
        </Card>
      </div>

      {/* Stats Bar */}
      <Card className="p-4 mt-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">TOON Tokens</div>
            <div className="text-2xl font-bold text-[#EA6A47] dark:text-[#EA6A47]">
              {stats.toonTokens}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">JSON Tokens</div>
            <div className="text-2xl font-bold">{stats.jsonTokens}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Reduction</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.savedPercentage}%
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
