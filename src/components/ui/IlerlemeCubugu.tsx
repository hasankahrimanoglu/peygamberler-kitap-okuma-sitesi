type IlerlemeCubuguProps = {
  /** 0–100 */
  yuzde: number;
  /** "3 / 5 bölüm tamamlandı" gibi açıklama */
  etiket?: string;
  yuzdeGoster?: boolean;
  className?: string;
};

export function IlerlemeCubugu({
  yuzde,
  etiket,
  yuzdeGoster = true,
  className = "",
}: IlerlemeCubuguProps) {
  const deger = Math.max(0, Math.min(100, Math.round(yuzde)));

  return (
    <div className={className}>
      {(etiket || yuzdeGoster) && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          {etiket ? (
            <span className="text-sm text-murekkep-soluk">{etiket}</span>
          ) : (
            <span />
          )}
          {yuzdeGoster && (
            <span className="font-baslik text-sm font-semibold text-murekkep">
              %{deger}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={deger}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-yuzey-2"
      >
        <div
          className="h-full rounded-full bg-eylem transition-[width] duration-500"
          style={{ width: `${deger}%` }}
        />
      </div>
    </div>
  );
}
