import clsx from "clsx";
import { useEffect, useState } from "react";

interface IFileSelector{
    label?:string,
    onFileChange?:(file:File)=>void
}

function FileSelector({
    label="Выберите файл",
    onFileChange
    }:IFileSelector) {
    const [selectedFiles,setSelectedFiles] = useState<File[]>([]);
    const [isDragging,setIsDragging] = useState(false);
    const [imagePreview,setImagePreview] = useState<string | ArrayBuffer | null>();
    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        if(event.target.files){
            const files = Array.from(event.target.files);
            setSelectedFiles(files);
            if(onFileChange){
                onFileChange(files[0])
            }
        }
    }
    useEffect(()=>{
        if(selectedFiles.length>0){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFiles[0]);
        }
    },[selectedFiles])
    const handleDragOver = (event:React.DragEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event:React.DragEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event:React.DragEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsDragging(false);
    
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const files = Array.from(event.dataTransfer.files);
            setSelectedFiles(files);
        }
    };
    return ( 
        <label className="flex flex-col">
            {label}
            <input 
                className="hidden" 
                type="file"
                onChange={(e)=>handleFileChange(e)}
                multiple={false}
            />
            <div 
                className={clsx("w-full h-[200px] group overflow-hidden relative bg-cover bg-center flex justify-center items-center rounded-2xl mt-2 cursor-pointer",
                    {
                        "bg-aside":!isDragging,
                        "bg-secondary":isDragging,
                    }
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {typeof imagePreview == "string" && <img 
                    className="h-full absolute z-10" 
                    src={imagePreview} 
                    alt="" 
                />}
                {typeof imagePreview == "string" && <img 
                    style={{backgroundImage:`url(${imagePreview})`}} 
                    className=" absolute blur-xl w-full h-full top-0 left-0"
                    src={imagePreview}
                    alt="" 
                />}
                {!isDragging && <div className="flex opacity-40 gap-2 select-none z-10 items-center bg-mainselect px-4 py-1 rounded-[999px] group-hover:opacity-100">
                    <img className="h-6" src="/image.svg" alt="" />
                    {selectedFiles.length == 0 ? <p>Файл не выбран</p>
                    : <p>{selectedFiles[0].name}</p>
                    }
                </div>}
            </div>
        </label>
     );
}

export default FileSelector;