"use client";

import InventoryProducts from "./InventoryProducts";
import ProductFormDialog from "./Dialogs/ProductDialog";
import CatalogFormDialog from "./Dialogs/CatalogFormDialog";
import VariantDialog from "./Dialogs/VariantDialog";
import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";



function Inventory() {

  const { data: user } = useUserProfile();
  const business = user.business_profile;

  return (
    <div className="page-width">
      <div className="flex justify-between my-4">
        <SectionHeader 
          HeaderTitle="Inventory"
          SubText="Manage your inventory."
          Action={
            <a target="_blank" href={`/b/${business?.code}/`}>
              <Button variant={"link"} className="text-sm text-opacity underline underline-offset-2">View your store</Button>
            </a>
          }
        />
      </div>
      <InventoryProducts />
      <ProductFormDialog />
      <CatalogFormDialog />
      <VariantDialog />
    </div>
  )
}

export default Inventory