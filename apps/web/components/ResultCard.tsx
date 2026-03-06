interface ResultCardProps {
  result: string | null;
  analyzedText: string;
}

const ResultCard = ({ result, analyzedText }: ResultCardProps) => {
  if (!result) return null;

  const isReal = result === "REAL";

  return (
    <div className="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-center space-y-4 transition-all duration-500">
      <h2
        className={`text-2xl md:text-3xl font-bold tracking-wide ${
          isReal ? "text-green-400" : "text-red-400"
        }`}
      >
        {isReal ? "Authentic News" : "Fake News Detected"}
      </h2>

      <div className="text-left rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">Analyzed Content</p>
        <p className="text-sm md:text-base text-gray-200 whitespace-pre-wrap break-words">
          {analyzedText}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
