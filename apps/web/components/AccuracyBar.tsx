// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AccuracyBar = ({ accuracy }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Detection Accuracy</span>
        <span>{accuracy}%</span>
      </div>
  
      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
        <div
          style={{ width: `${accuracy}%` }}
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-700 ease-out"
        />
      </div>
    </div>
  );

  export default AccuracyBar;