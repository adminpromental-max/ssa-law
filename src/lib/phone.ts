export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("966")) return digits;
  if (digits.startsWith("0")) return `966${digits.slice(1)}`;
  return digits;
}

export function toWhatsAppUrl(phone: string): string {
  return `https://wa.me/${toWhatsAppNumber(phone)}`;
}
