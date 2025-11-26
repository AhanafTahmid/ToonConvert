'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CodeEditor } from '@/components/CodeEditor';
import { toonToYaml, calculateTokenSavings } from '@/lib/toon-converter';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useAutoSave, loadFromStorage, clearStorage } from '@/hooks/useAutoSave';
import { AdBanner } from '@/components/AdBanner';

const EXAMPLE_TOON = `users[3]{id,name,age,city,role}:
  1,Alice Johnson,30,New York,Developer
  2,Bob Smith,25,San Francisco,Designer
  3,Charlie Brown,35,Chicago,Manager`;

const STORAGE_KEY = 'toon-to-yaml-input';

export default function ToonToYamlPage() {
  const [toonInput, setToonInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    toonTokens: 0,
    yamlTokens: 0,
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
      setYamlOutput('');
      setError('');
      setStats({ toonTokens: 0, yamlTokens: 0, savedTokens: 0, savedPercentage: 0 });
      return;
    }

    try {
      const converted = toonToYaml(toonInput);
      setYamlOutput(converted);
      setError('');

      // Calculate token savings (TOON input -> YAML output)
      const tokenStats = calculateTokenSavings(toonInput, converted);
      setStats({
        toonTokens: tokenStats.jsonTokens,  // Input tokens (TOON)
        yamlTokens: tokenStats.toonTokens,  // Output tokens (YAML)
        savedTokens: tokenStats.savedTokens, // Will be negative when output > input
        savedPercentage: tokenStats.savedPercentage, // Will be negative when output > input
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid TOON format');
      setYamlOutput('');
      setStats({ toonTokens: 0, yamlTokens: 0, savedTokens: 0, savedPercentage: 0 });
    }
  }, [toonInput]);

  const loadExample = () => {
    setToonInput(EXAMPLE_TOON);
  };

  const clearAll = () => {
    setToonInput('');
    setYamlOutput('');
    setError('');
    setStats({ toonTokens: 0, yamlTokens: 0, savedTokens: 0, savedPercentage: 0 });
    clearStorage(STORAGE_KEY);
  };

  const handleCopy = () => {
    copyToClipboard(yamlOutput);
  };

  const downloadYaml = () => {
    const blob = new Blob([yamlOutput], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.yaml';
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

      {/* Ad Banner 1 - After Action Buttons */}
      <AdBanner />

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

        {/* YAML Output */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">YAML Output</h2>
            {yamlOutput && (
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
                <Button onClick={downloadYaml} variant="default" size="sm">
                  Download
                </Button>
              </div>
            )}
          </div>
          <CodeEditor
            value={yamlOutput}
            onChange={() => {}}
            placeholder="YAML output will appear here..."
            language="yaml"
            readOnly
          />
        </Card>
      </div>

      {/* Ad Banner 2 - Before Stats */}
      <AdBanner type="ad2" />

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
            <div className="text-sm text-muted-foreground mb-1">YAML Tokens</div>
            <div className="text-2xl font-bold">{stats.yamlTokens}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Reduction</div>
            <div className={`text-2xl font-bold ${stats.savedPercentage < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              {stats.savedPercentage}%
            </div>
            {stats.savedPercentage < 0 && (
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                Not recommended
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Ad Banner 3 - After Stats */}
      <AdBanner type="ad3" />
    </div>
  );
}
