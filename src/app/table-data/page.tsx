/* eslint-disable @typescript-eslint/no-explicit-any */
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
    size: 1000,
  });
  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const updateProduct = {
    name: "Docky",
    description:
      "Premium ultrabook with high performance, designed for developers and creative professionals.",
    stockQuantity: 25,
    priceIn: 1450,
    priceOut: 1899,
    discount: 5,
    color: [
      {
        color: "Platinum Silver",
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
        ],
      },
      {
        color: "Graphite Black",
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.pngg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
        ],
      },
    ],
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
    warranty: "2 years international warranty",
    availability: true,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1280px-Spring_Boot.svg.png",
    ],
    categoryUuid: "462d9f60-8346-45ab-b8b3-a597d240965b",
    supplierUuid: "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
    brandUuid: "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb",
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
