interface TextInputPanelProps {
  text: string;
  setText: (value: string) => void;
  loading: boolean;
  disabled?: boolean;
  onCompare: () => void;
}

const TextInputPanel = ({
  text,
  setText,
  loading,
  disabled = false,
  onCompare,
}: TextInputPanelProps) => (
  <div className="space-y-4">
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      disabled={disabled || loading}
      className="w-full h-44 bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-500 transition disabled:opacity-60"
      placeholder="Paste news content here..."
    />

    <button
      onClick={onCompare}
      disabled={loading || disabled}
      className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition font-semibold flex items-center justify-center gap-3 disabled:opacity-50 text-lg cursor-pointer"
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {loading ? "Analyzing..." : "Compare"}
    </button>
  </div>
);

export default TextInputPanel;
