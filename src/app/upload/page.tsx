import UploadMultiple from "@/components/example-form/UploadComponent";
import { FileUploadFillProgressDemo } from "@/components/example-form/UploadFile";
import { CreateProductForm } from "@/components/product-form/CreateProductForm";

export default function Page() {
    return (
        <div className="container flex flex-col mx-auto max-w-xl py-10 gap-6">
            <h1 className="font-bold text-5xl">This one for test just ignore it teacher </h1>
            <UploadMultiple />
            <hr />
            <h1 className="font-bold text-5xl">Upload Product:</h1>
            <CreateProductForm />
        </div>
    );
}