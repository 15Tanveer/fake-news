const GlassContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-3xl bg-white/5 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 px-4 py-5 md:p-8 space-y-8 overflow-hidden">
      {children}
    </div>
  );

  export default GlassContainer;