import UploadMultiple from "@/components/example-form/UploadComponent";
import { FileUploadFillProgressDemo } from "@/components/example-form/UploadFile";
import { CreateProductForm } from "@/components/product-form/CreateProductForm";

export default function Page() {
    return (
        <div>
            <h1>Upload Files</h1>
            <UploadMultiple/>
            <hr />
            
            <CreateProductForm/>
        </div>
    );
}