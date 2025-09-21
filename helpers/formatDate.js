// --- Helpers ---
const toDateObj = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v;
  if (typeof v?.toDate === "function") return v.toDate();     // Firestore Timestamp
  if (typeof v === "number") return new Date(v < 1e12 ? v * 1000 : v); // epoch s/ms
  const d = new Date(v);                                      // ISO/string
  return isNaN(d) ? null : d;
};

// format: "Sep 02, 2025" hoặc kèm giờ + UTC offset
export const formatDate = (
  input,
  {
    locale = "en-US",
    timeZone = "Asia/Ho_Chi_Minh",
    withTime = false,
    withSeconds = false,
    withUTC = false,       // thêm "UTC+7"
    hour12 = true,
  } = {}
) => {
  const d = toDateObj(input);
  if (!d) return "";

  const opts = withTime
    ? {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        ...(withSeconds ? { second: "2-digit" } : {}),
        hour12,
        timeZone,
        ...(withUTC ? { timeZoneName: "shortOffset" } : {}), // thường ra "GMT+7"
      }
    : { year: "numeric", month: "short", day: "2-digit", timeZone };

  const out = new Intl.DateTimeFormat(locale, opts).format(d);
  return withUTC ? out.replace("GMT", "UTC") : out; // đổi GMT -> UTC cho đúng ý bạn
};
