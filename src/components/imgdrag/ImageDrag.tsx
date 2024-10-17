"use client";
import React, { useState, useRef } from "react";
import {
    DndContext,
    closestCenter,
    DragEndEvent,
    DragStartEvent
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";

interface ImageItemProps {
    id: string;
    photo: File;
}
type Props = {
    photos: File[];
    setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageItem: React.FC<ImageItemProps> = ({ id, photo }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
        opacity: isDragging ? 0.8 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex flex-col items-center rounded-lg border shadow-xl"
        >
            <img
                src={URL.createObjectURL(photo)}
                alt={photo.name}
                className="w-36 h-36 object-cover"
            />
        </div>
    );
};

const cropToSquare = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Unable to get 2D context'));
            return;
          }
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
          
          // Calculate positioning to crop from center
          const xOffset = (img.width - size) / 2;
          const yOffset = (img.height - size) / 2;
          
          ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);
          
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }
            resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
          }, 'image/jpeg', 0.8); // You can adjust quality here
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };
  
  // Function to process multiple files
  const processFiles = async (files: FileList): Promise<File[]> => {
    const processedFiles = await Promise.all(
      Array.from(files).map(file => cropToSquare(file).catch(error => {
        console.error(`Error processing file ${file.name}:`, error);
        return null;
      }))
    );
    return processedFiles.filter((file): file is File => file !== null);
  };

const PhotoGallery: React.FC<Props> = (props: Props) => {
    const [photos, setPhotos] = useState<File[]>([]);

    // const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = event.target.files;
    //     if (files) {
    //         // const newPhotos = Array.from(files);
    //         const newPhotos = await processFiles(files)
    //         // Filter out files that already exist in photos by name
    //         const existingNames = new Set(photos.map((photo) => photo.name));
    //         const uniqueNewPhotos = newPhotos.filter(
    //             (photo) => !existingNames.has(photo.name)
    //         );

    //         // Combine new unique photos with existing ones, limiting the number to 10
    //         let tempList = [...photos, ...uniqueNewPhotos];
    //         // If there are more than 10, keep the most recent 10
    //         if (tempList.length > 100) {
    //             tempList = tempList.slice(-100);
    //         }

    //         setPhotos(tempList);
    //         props.setPhotos(tempList);
    //     }
    // };

    const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPhotos = await processFiles(files);
    
            // Tạo danh sách tên mới cho các tệp
            const renamedPhotos = newPhotos.map((photo, index) => {
                const now = new Date();
                const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
                const formattedTime = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
                const newName = `${formattedDate}-${formattedTime}-${index}-${photo.name}`;
                return new File([photo], newName, { type: photo.type });
            });
    
            // Lọc tệp mới theo tên
            const existingNames = new Set(photos.map((photo) => photo.name));
            const uniqueNewPhotos = renamedPhotos.filter(
                (photo) => !existingNames.has(photo.name)
            );
    
            // Kết hợp và giới hạn số lượng tệp
            let tempList = [...photos, ...uniqueNewPhotos];
            if (tempList.length > 100) {
                tempList = tempList.slice(-100);
            }
    
            setPhotos(tempList);
            props.setPhotos(tempList);
        }
    };

    const handleAddMediaClick = () => {
        if (fileImgtRef.current) {
            fileImgtRef.current.click();
        }
    };

    const fileImgtRef = useRef<HTMLInputElement | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setPhotos((items) => {
                const activeIndex = items.findIndex(
                    (photo) => photo.name === active.id
                );
                const overIndex = items.findIndex((photo) => photo.name === over.id);
                return arrayMove(items, activeIndex, overIndex);
            });
            props.setPhotos((items) => {
                const activeIndex = items.findIndex(
                    (photo) => photo.name === active.id
                );
                const overIndex = items.findIndex((photo) => photo.name === over.id);
                return arrayMove(items, activeIndex, overIndex);
            })
        }
    };
    const handleDelPhoto = (ind: number) => {
        const tempPhoto = [...photos].filter((item, index) => ind != index);
        setPhotos(tempPhoto);
        props.setPhotos(tempPhoto);
    }
    return (
        <div>
            <div className="border px-4 text-neutral-600 space-y-4 shadow-lg py-8">
                <div className="flex flex-row justify-between items-center">
                    <span className="font-bold">Photos</span>
                    <div className="flex flex-col">
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={handleAddMediaClick}
                        >
                            Add photos
                        </button>
                        <input
                            type="file"
                            ref={fileImgtRef}
                            onChange={handleImgChange}
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={photos.map((photo) => photo.name)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            {photos.map((item, index) => (
                                <div key={item.name} className="relative group">
                                    <ImageItem id={item.name} photo={item} />
                                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button onClick={() => handleDelPhoto(index)} className="p-2 bg-white">
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default PhotoGallery;
