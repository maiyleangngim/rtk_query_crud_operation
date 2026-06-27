// components/product-form/CreateProductForm.tsx

"use client";

import { Controller, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field } from "@/components/ui/field";


import z from "zod";
import { ProductForm, productFormSchema } from "./product-form-schema";
import { productFields } from "./product-form-fields";
import { DynamicFormField } from "./fields/DynamicFormField";
import { FileUploadFillProgressDemo } from "../example-form/UploadFile";

type ProductFormValue = z.infer<typeof productFormSchema>;

interface CreateProductFormProps {
  productData?: ProductForm;
  isEditing?: boolean;
}

export function CreateProductForm({ productData, isEditing }: CreateProductFormProps) {
  const form = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValue>,
    defaultValues: productData || {
      name: "",
      description: "",
      stockQuantity: 0,
      priceIn: 0,
      priceOut: 0,
      discount: 0,
      warranty: "",
      availability: true,
      categoryUuid: "",
      supplierUuid: "",
      brandUuid: "",
      thumbnail: "",
    },
  });



  const onSubmit = (data: ProductForm) => {
    console.log("Product Data:", data);

    if (isEditing) {
      // Call update API here - e.g., useUpdateProductMutation()
      toast.success("Product updated successfully!");
    } else {
      // Call create API here
      toast.success("Product created successfully!");
    }
  };
  console.log("Form Values:", form.watch());

  console.log("Form: ", form.formState.errors);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Product" : "Create New Product"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the product information below."
            : "Fill in all the necessary information for the new product."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {productFields.map((fieldConfig) => (
            <DynamicFormField
              key={fieldConfig.name}
              fieldConfig={fieldConfig}
              control={form.control}
            />
          ))}


          {/* Image Upload Section */}
          <Controller
            name="thumbnail"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <FileUploadFillProgressDemo
                  onUploadComplete={(url) => field.onChange(url)}
                />


                {fieldState.error && (
                  <p className="text-sm text-destructive mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

        </form>
      </CardContent>

      <CardFooter>
        <Field
          orientation="horizontal"
          className="w-full justify-end gap-3"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button type="submit" form="product-form">
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}