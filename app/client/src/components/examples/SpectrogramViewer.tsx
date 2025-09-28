import { SpectrogramViewer } from '../SpectrogramViewer';

export default function SpectrogramViewerExample() {
  return (
    <div className="p-6">
      <SpectrogramViewer
        width={800}
        height={400}
        sampleRate={44100}
      />
    </div>
  );
}