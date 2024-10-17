"use client"
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
import Image from "next/image";
interface ImageItemProps {
    id: string;
    photo: any;
}
export const ImageItem: React.FC<ImageItemProps> = ({ id, photo }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
        opacity: isDragging ? 0.8 : 1
    };

    if (photo instanceof File) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="flex flex-col items-center rounded-lg border shadow-xl"
            >
                <Image
                    src={URL.createObjectURL(photo)}
                    alt={photo.name}
                    className="w-36 h-36 object-cover"
                    width={200}
                    height={200}
                />
            </div>
        );
    }
    else{
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="flex flex-col items-center rounded-lg border shadow-xl"
            >
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL+photo.url}
                    alt="image"
                    className="w-36 h-36 object-cover"
                    width={200}
                    height={200}
                />
            </div>
        );
    }
};