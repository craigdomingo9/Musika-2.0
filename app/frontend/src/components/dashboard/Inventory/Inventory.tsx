"use client";

import InventoryProducts from "./InventoryProducts";
import ProductFormDialog from "./Dialogs/ProductDialog";
import CatalogFormDialog from "./Dialogs/CatalogFormDialog";
import VariantDialog from "./Dialogs/VariantDialog";
import Link from "next/link";
import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness";
import { Button } from "@/components/ui/button";
import { testBusiness } from "@/lib/constants";



function Inventory() {

  const { data: business } = useFetchBusiness();
  
  return (
    <div>
      <div className="flex justify-between my-4">
        <h1 className="text-opacity text-xl font-semibold">Inventory</h1>
        <a target="_blank" href={`/b/${testBusiness}/`}>
          <Button variant={"link"} className="text-sm text-opacity underline underline-offset-2">View your store</Button>
        </a>
      </div>
      <InventoryProducts />
      <ProductFormDialog />
      <CatalogFormDialog />
      <VariantDialog />
    </div>
  )
}

export default Inventory