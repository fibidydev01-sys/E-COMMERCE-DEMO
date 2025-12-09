#!/bin/bash

# collect-files.sh
# Script untuk mengumpulkan semua file dari struktur proyek E-Commerce

OUTPUT_FILE="collected-files.txt"

echo "Mengumpulkan semua file ke $OUTPUT_FILE..."
echo "========================================" > $OUTPUT_FILE
echo "COLLECTED FILES - E-COMMERCE PROJECT" >> $OUTPUT_FILE
echo "Generated: $(date)" >> $OUTPUT_FILE
echo "========================================" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Function untuk menambahkan file ke output
add_file() {
    local file=$1
    if [ -f "$file" ]; then
        echo "" >> $OUTPUT_FILE
        echo "========================================" >> $OUTPUT_FILE
        echo "FILE: $file" >> $OUTPUT_FILE
        echo "========================================" >> $OUTPUT_FILE
        cat "$file" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
    fi
}

# App routes
add_file "src/app/(account)/addresses/page.tsx"
add_file "src/app/(account)/notifications/page.tsx"
add_file "src/app/(account)/orders/[id]/page.tsx"
add_file "src/app/(account)/orders/page.tsx"
add_file "src/app/(account)/profile/page.tsx"
add_file "src/app/(account)/wishlist/page.tsx"
add_file "src/app/(account)/layout.tsx"

add_file "src/app/(admin)/admin/categories/page.tsx"
add_file "src/app/(admin)/admin/dashboard/page.tsx"
add_file "src/app/(admin)/admin/stores/page.tsx"
add_file "src/app/(admin)/admin/users/page.tsx"
add_file "src/app/(admin)/layout.tsx"

add_file "src/app/(auth)/forgot-password/page.tsx"
add_file "src/app/(auth)/login/page.tsx"
add_file "src/app/(auth)/register/page.tsx"
add_file "src/app/(auth)/layout.tsx"

add_file "src/app/(main)/cart/page.tsx"
add_file "src/app/(main)/checkout/page.tsx"
add_file "src/app/(main)/products/[slug]/page.tsx"
add_file "src/app/(main)/products/page.tsx"
add_file "src/app/(main)/search/page.tsx"
add_file "src/app/(main)/layout.tsx"
add_file "src/app/(main)/page.tsx"

add_file "src/app/(seller)/seller/dashboard/page.tsx"
add_file "src/app/(seller)/seller/orders/page.tsx"
add_file "src/app/(seller)/seller/products/new/page.tsx"
add_file "src/app/(seller)/seller/products/page.tsx"
add_file "src/app/(seller)/layout.tsx"

add_file "src/app/globals.css"
add_file "src/app/layout.tsx"
add_file "src/app/page.tsx"

# Components - Admin
add_file "src/components/admin/admin-stats.tsx"
add_file "src/components/admin/index.ts"

# Components - Cart
add_file "src/components/cart/cart-drawer.tsx"
add_file "src/components/cart/cart-empty.tsx"
add_file "src/components/cart/cart-item.tsx"
add_file "src/components/cart/cart-summary.tsx"
add_file "src/components/cart/index.ts"

# Components - Checkout
add_file "src/components/checkout/address-form.tsx"
add_file "src/components/checkout/address-selector.tsx"
add_file "src/components/checkout/checkout-steps.tsx"
add_file "src/components/checkout/index.ts"
add_file "src/components/checkout/order-summary.tsx"
add_file "src/components/checkout/payment-methods.tsx"
add_file "src/components/checkout/shipping-options.tsx"

# Components - Home
add_file "src/components/home/category-showcase.tsx"
add_file "src/components/home/featured-products.tsx"
add_file "src/components/home/flash-deals.tsx"
add_file "src/components/home/hero-banner.tsx"
add_file "src/components/home/index.ts"
add_file "src/components/home/newsletter.tsx"

# Components - Layout
add_file "src/components/layout/account-sidebar.tsx"
add_file "src/components/layout/admin-sidebar.tsx"
add_file "src/components/layout/breadcrumbs.tsx"
add_file "src/components/layout/footer.tsx"
add_file "src/components/layout/header.tsx"
add_file "src/components/layout/index.ts"
add_file "src/components/layout/mobile-nav.tsx"
add_file "src/components/layout/seller-sidebar.tsx"

# Components - Order
add_file "src/components/order/index.ts"
add_file "src/components/order/order-card.tsx"
add_file "src/components/order/order-timeline.tsx"

# Components - Product
add_file "src/components/product/index.ts"
add_file "src/components/product/product-card.tsx"
add_file "src/components/product/product-gallery.tsx"
add_file "src/components/product/product-grid.tsx"
add_file "src/components/product/product-info.tsx"
add_file "src/components/product/product-reviews.tsx"
add_file "src/components/product/product-skeleton.tsx"

# Components - Search
add_file "src/components/search/filter-sidebar.tsx"
add_file "src/components/search/index.ts"
add_file "src/components/search/search-bar.tsx"
add_file "src/components/search/sort-dropdown.tsx"

# Components - Seller
add_file "src/components/seller/index.ts"
add_file "src/components/seller/product-form.tsx"
add_file "src/components/seller/sales-chart.tsx"
add_file "src/components/seller/stats-card.tsx"

# Components - Shared
add_file "src/components/shared/confirmation-dialog.tsx"
add_file "src/components/shared/empty-state.tsx"
add_file "src/components/shared/image-upload.tsx"
add_file "src/components/shared/index.ts"
add_file "src/components/shared/loading-spinner.tsx"
add_file "src/components/shared/logo.tsx"

# Components - UI
add_file "src/components/ui/accordion.tsx"
add_file "src/components/ui/alert-dialog.tsx"
add_file "src/components/ui/alert.tsx"
add_file "src/components/ui/avatar.tsx"
add_file "src/components/ui/badge.tsx"
add_file "src/components/ui/breadcrumb.tsx"
add_file "src/components/ui/button.tsx"
add_file "src/components/ui/card.tsx"
add_file "src/components/ui/checkbox.tsx"
add_file "src/components/ui/container.tsx"
add_file "src/components/ui/dialog.tsx"
add_file "src/components/ui/dropdown-menu.tsx"
add_file "src/components/ui/form.tsx"
add_file "src/components/ui/index.ts"
add_file "src/components/ui/input.tsx"
add_file "src/components/ui/label.tsx"
add_file "src/components/ui/navigation-menu.tsx"
add_file "src/components/ui/pagination.tsx"
add_file "src/components/ui/popover.tsx"
add_file "src/components/ui/price.tsx"
add_file "src/components/ui/progress.tsx"
add_file "src/components/ui/quantity-selector.tsx"
add_file "src/components/ui/radio-group.tsx"
add_file "src/components/ui/rating.tsx"
add_file "src/components/ui/scroll-area.tsx"
add_file "src/components/ui/section-title.tsx"
add_file "src/components/ui/select.tsx"
add_file "src/components/ui/separator.tsx"
add_file "src/components/ui/sheet.tsx"
add_file "src/components/ui/skeleton.tsx"
add_file "src/components/ui/slider.tsx"
add_file "src/components/ui/stock-indicator.tsx"
add_file "src/components/ui/switch.tsx"
add_file "src/components/ui/table.tsx"
add_file "src/components/ui/tabs.tsx"
add_file "src/components/ui/textarea.tsx"
add_file "src/components/ui/tooltip.tsx"

# Data
add_file "src/data/index.ts"
add_file "src/data/mock-addresses.ts"
add_file "src/data/mock-banners.ts"
add_file "src/data/mock-categories.ts"
add_file "src/data/mock-orders.ts"
add_file "src/data/mock-products.ts"
add_file "src/data/mock-reviews.ts"
add_file "src/data/mock-users.ts"

# Lib
add_file "src/lib/constants.ts"
add_file "src/lib/utils.ts"
add_file "src/lib/validations.ts"

# Stores
add_file "src/stores/auth-store.ts"
add_file "src/stores/cart-store.ts"
add_file "src/stores/filter-store.ts"
add_file "src/stores/index.ts"
add_file "src/stores/notification-store.ts"
add_file "src/stores/wishlist-store.ts"

# Types
add_file "src/types/index.ts"

echo "" >> $OUTPUT_FILE
echo "========================================" >> $OUTPUT_FILE
echo "SELESAI!" >> $OUTPUT_FILE
echo "========================================" >> $OUTPUT_FILE

echo "✅ Selesai! File tersimpan di: $OUTPUT_FILE"