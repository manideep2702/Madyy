export default function AnimatedSeparator() {
  return (
    <div aria-hidden className="relative">
      {/* Golden shade, fades upward (toward hero) */}
      <div
        className="h-20 md:h-28 w-full"
        style={{
          background:
            "radial-gradient(30% 80% at 10% 50%, rgba(244, 185, 65, 0.22), transparent 70%), " +
            "radial-gradient(30% 80% at 90% 50%, rgba(244, 185, 65, 0.22), transparent 70%), " +
            // Fade upwards: strongest gold near bottom, fades to transparent towards top
            "linear-gradient(0deg, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.12) 40%, transparent 100%)",
        }}
      />
      {/* subtle top fade to blend into the dark hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-t from-transparent to-black" />
    </div>
  );
}
