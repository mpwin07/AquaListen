import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface SpectrogramViewerProps {
  audioData?: Float32Array;
  sampleRate?: number;
  width?: number;
  height?: number;
  className?: string;
}

export function SpectrogramViewer({
  audioData,
  sampleRate = 44100,
  width = 800,
  height = 400,
  className = ""
}: SpectrogramViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; freq: number; time: number; amplitude: number } | null>(null);

  // TODO: remove mock functionality
  // Generate mock spectrogram data for demonstration
  const generateMockSpectrogram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // Generate mock spectrogram with frequency bands
    const freqBands = 256;
    const timeBins = 400;
    
    for (let t = 0; t < timeBins; t++) {
      for (let f = 0; f < freqBands; f++) {
        // Create realistic frequency distribution
        let amplitude = Math.random();
        
        // Lower frequencies tend to be stronger
        if (f < freqBands * 0.3) {
          amplitude *= 1.5;
        }
        
        // Add some structured patterns
        if (Math.sin(t * 0.1 + f * 0.05) > 0.3) {
          amplitude *= 2;
        }
        
        // Convert amplitude to color
        const intensity = Math.min(255, amplitude * 150);
        const hue = 240 - (intensity / 255) * 60; // Blue to yellow
        const saturation = 80;
        const lightness = (intensity / 255) * 50 + 10;
        
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        const x = (t / timeBins) * width * zoom + offset.x;
        const y = height - (f / freqBands) * height * zoom + offset.y;
        const w = Math.max(1, (width / timeBins) * zoom);
        const h = Math.max(1, (height / freqBands) * zoom);
        
        if (x >= 0 && x < width && y >= 0 && y < height) {
          ctx.fillRect(x, y, w, h);
        }
      }
    }

    // Add frequency scale
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    const freqLabels = [0, 1000, 2000, 5000, 10000, 20000];
    freqLabels.forEach(freq => {
      const y = height - (freq / 22050) * height;
      if (y >= 0 && y <= height) {
        ctx.fillText(`${freq}Hz`, 5, y);
      }
    });

    // Add time scale
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      const timeS = (i / 10) * 30; // Assume 30 second sample
      ctx.fillText(`${timeS.toFixed(1)}s`, x, height - 5);
    }
  };

  useEffect(() => {
    generateMockSpectrogram();
  }, [width, height, zoom, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      setOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
    } else {
      // Update tooltip
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert pixel coordinates to frequency/time
        const time = ((x - offset.x) / zoom) / width * 30; // 30 second sample
        const freq = (1 - ((y - offset.y) / zoom) / height) * 22050; // Nyquist frequency
        const amplitude = Math.random() * 0.8 + 0.1; // Mock amplitude
        
        setTooltip({ x, y, freq: Math.max(0, freq), time: Math.max(0, time), amplitude });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTooltip(null);
  };

  const zoomIn = () => setZoom(prev => Math.min(prev * 1.5, 5));
  const zoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const exportSpectrogram = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // TODO: remove mock functionality
      const link = document.createElement('a');
      link.download = 'spectrogram.png';
      link.href = canvas.toDataURL();
      link.click();
      console.log('Spectrogram exported');
    }
  };

  return (
    <Card className={className} data-testid="card-spectrogram">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Audio Spectrogram</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" data-testid="badge-sample-rate">
                {sampleRate}Hz
              </Badge>
              <Badge variant="outline" data-testid="badge-zoom">
                {zoom.toFixed(1)}x
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={zoomOut}
              data-testid="button-zoom-out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={zoomIn}
              data-testid="button-zoom-in"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetZoom}
              data-testid="button-reset-zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportSpectrogram}
              data-testid="button-export"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="border rounded cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            data-testid="canvas-spectrogram"
          />
          
          {tooltip && (
            <div
              className="absolute bg-black/80 text-white text-xs p-2 rounded pointer-events-none z-10"
              style={{
                left: tooltip.x + 10,
                top: tooltip.y - 10,
              }}
              data-testid="tooltip-spectrogram"
            >
              <div>Time: {tooltip.time.toFixed(2)}s</div>
              <div>Freq: {tooltip.freq.toFixed(0)}Hz</div>
              <div>Amplitude: {tooltip.amplitude.toFixed(3)}</div>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>• Drag to pan • Scroll to zoom • Hover for details</p>
          <p className="text-xs mt-1">
            Blue = low amplitude, Yellow = high amplitude. Lower frequencies at bottom.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}