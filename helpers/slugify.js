export function slugify(input = "") {
  return String(input)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/[^a-z0-9-]+/g, "-") // giữ lại chữ, số, dấu gạch ngang
    .replace(/^-+|-+$/g, "") // bỏ gạch đầu/cuối
    .slice(0, 120); // giới hạn độ dài
}
