
export function formatPrice(
    price: number | string,
    options: {
        currency?: "VND" | "USD" | "SGD" | "MYR" | "THB" | "IDR",
        notation?: Intl.NumberFormatOptions["notation"]
    } = {}
)
{
    const {currency = "VND", notation = "standard"} = options
    const numericPrice = typeof price === "string" ? parseFloat(price) : price

   return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 3,
   }).format(numericPrice)

}