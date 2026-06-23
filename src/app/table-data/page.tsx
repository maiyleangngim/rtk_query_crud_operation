"use client";
import { useState } from "react";
import { columns } from "@/components/tables/Columns";
import { DataTable } from "@/components/tables/TableComponent";
import { ViewProductDetail } from "@/components/ui/view-detail-product";
import {
  useDeleteProductByUUIDMutation,
  useGetAllProductQuery,
  useUpdateProductbyUUIDMutation,
} from "@/services/ecommerce";
import { toast } from "sonner";

export default function DataTablePage() {
  const { data } = useGetAllProductQuery({
    page: 0,
    size: 10000,
  });
  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const updateProduct = {
    name: "TechPro Quantum 15 Laptop",
    description:
      "High-performance editing and gaming laptop with an aluminum chassis.",
    stockQuantity: 45,
    priceIn: 850.0,
    priceOut: 1199.99,
    discount: 10,
    color: [
      {
        color: "Space Gray",
        images: ["https://cheat.casa", "https://cheat.casa"],
      },
      {
        color: "Matte Black",
        images: ["https://cheat.casa"],
      },
    ],
    thumbnail: "https://cheat.casa",
    warranty: "2 Years Limited Manufacturer Warranty",
    availability: true,
    images: ["https://cheat.casa", "https://cheat.casa"],
    categoryUuid: "c3e1b4f6-8c2d-4e91-a1b2-c3d4e5f6a7b8",
    supplierUuid: "fa18b9c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
    brandUuid: "b0f9e8d7-c6b5-a493-8271-615049382716",
  };
  const [updateProductByUUID] = useUpdateProductbyUUIDMutation();
  const [deleteProductByUUID] = useDeleteProductByUUIDMutation();

  // handle update ProductByUUID
  const handleUpdateProduct = (uuid: string) => {
    try {
    updateProductByUUID({
      uuid: uuid,
      accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      updateProduct: JSON.stringify(updateProduct),
    });
    toast.success("Product updated successfully!")
    }catch(error:any){
      toast.error(error?.data?.message || "Failed to update product.");
    }

  };

  // handle delete ProductByUUID
  const handleDeleteProduct = (uuid: string) => {
    try {
    deleteProductByUUID({
      uuid: uuid,
      accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    });
    toast.success("Product deleted successfully!")
    } catch (error: any){
      toast.error(error?.data?.message || "Failed to delete product.")
    }

  };

  const handleSelectUUID = (uuid: string) => {
    setSelectedUuid(uuid);
  };

  const handleClose = () => {
    setSelectedUuid(null);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({
          onViewDetail: handleSelectUUID,
          onDelete: handleDeleteProduct,
          onUpdate: handleUpdateProduct,
        })}
        data={tableData}
      />

      {/* Modal */}
      {selectedUuid && (
        <ViewProductDetail
          uuid={selectedUuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        />
      )}
    </div>
  );
}
