// import { DataSearch } from "@/types/common";
// import { Card } from "@nextui-org/react";
// import { Col, Row, Tooltip } from "antd";
// import Image from "next/image";
// import React, { useState } from "react";
// import ModalDetails from "./ModalDetails";
// import { Download, Eye, Plus } from "lucide-react";
// import Link from "next/link";
// import { ScaleLoader } from "react-spinners";

// type Props = {
//   listData: any[],
//   isOpenFilter: boolean,
//   isLoading: number,
//   type: number

// }
// const SearchResult = (props: Props) => {
//   const { listData, isOpenFilter, isLoading } = props;
//   const [isDetails, setIsDetails] = useState<boolean>(false);
//   const [selectItem, setSelectItem] = useState();

//   return (
//     <>
//       <div
//         className={`${isOpenFilter ? "w-11/12" : "w-full"
//           } m-auto flex flex-col gap-4 pb-10`}
//       >
//         <p className="text-2xl text-gray-500">Popular</p>
//         <div>
//           {isLoading === 0 ?
//             <div>
//               {props.type === 0 ?
//                 <Row gutter={[30, 30]}>
//                   {listData &&
//                     listData?.map((item: any, index: number) => (
//                       <Col key={index} span={6} className="flex justify-center">
//                         <Card className={` relative col-span-12 sm:col-span-4 w-full rounded-sm hover:cursor-pointer overflow-hidden shadow-none`}>
//                           <Image
//                             width={1000}
//                             height={1000}
//                             alt="image 1"
//                             className="z-0 w-full h-full object-cover"
//                             src={
//                               item.url
//                                 ? `${process.env.NEXT_PUBLIC_API_URL}${item.url}`
//                                 : "/image/nophotos.png"
//                             }
//                             onClick={() => {
//                               setIsDetails(true);
//                               setSelectItem(item);
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-start justify-end">
//                             <div className="p-3 flex flex-col gap-2">
//                               <Tooltip title="Download" placement="leftTop">
//                                 <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
//                                   <Download width={15} height={15} />
//                                 </div>
//                               </Tooltip>
//                               <Tooltip title="Add Product" placement="leftTop">
//                                 <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
//                                   <Plus width={15} height={15} />
//                                 </div>
//                               </Tooltip>
//                               <Tooltip title="View Product" placement="leftTop">
//                                 <div className="w-8 h-8 bg-white flex items-center justify-center rounded-md hover:bg-gray-300">
//                                   <Link target="_blank" href={`/landing-page/product/${item.id}`} className="h-full w-full flex justify-center items-center">
//                                     <Eye width={15} height={15} />
//                                   </Link>
//                                 </div>
//                               </Tooltip>
//                             </div>
//                           </div>
//                         </Card>
//                       </Col>
//                     ))}
//                 </Row>

//                 :
//                 <Row gutter={[30, 30]}>
//                   {listData &&
//                     listData.map((item: any, index: number) => (
//                       <Col key={index} span={6} className="flex justify-center">
//                         <Card className={`${isOpenFilter ? "h-[300px]" : "h-[400px]"} relative col-span-12 sm:col-span-4 w-full rounded-sm hover:cursor-pointer overflow-hidden shadow-none`}>
//                           <video
//                             width={200}
//                             height={200}
//                             className="z-0 w-full h-full object-cover"
//                             controls // Thêm thuộc tính controls nếu bạn muốn người dùng có thể điều khiển video
//                             onClick={() => {
//                               setIsDetails(true);
//                               setSelectItem(item);
//                             }}
//                           >
//                             <source src={item.url ? `${process.env.NEXT_PUBLIC_API_URL}${item.url}` : "/video/novideo.mp4"} type="video/mp4" />
//                             Your browser does not support the video tag.
//                           </video>
//                         </Card>
//                       </Col>
//                     ))}
//                 </Row>

//               }
//             </div>
//             :
//             <div className="min-h-64 flex justify-center items-center">
//               <ScaleLoader color="gray" />
//             </div>
//           }
//         </div>
//       </div>
//       <ModalDetails isDetails={isDetails} selectItem={selectItem} />
//     </>
//   );
// };

// export default SearchResult;


import { DataSearch } from "@/types/common";
import { Card } from "@nextui-org/react";
import { Col, Row, Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import ModalDetails from "./ModalDetails";
import { ArrowDownToLine, ChevronLeft, ChevronRight, Download, Eye, Pen, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import SearchDetails from "./SearchDetails";

type Props = {
  listData: any[],
  isOpenFilter: boolean,
  isLoading: number,
  type: number,
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}
const SearchResult = (props: Props) => {
  const { listData, isOpenFilter, isLoading } = props;
  console.log(listData);
  const [openDetails, setOpenDetails] = useState<number>(-1);
  const handleOpenDetails = (id: any) => {
    setOpenDetails(id);
  }
  return (
    <div className="pb-10">
      {isLoading === 0 ?
        <div>
          {props.type === 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {listData?.map((item, index) => (
                <div key={index} className="break-inside-avoid mb-4">
                  <Card className="relative rounded-sm hover:cursor-pointer overflow-hidden shadow-none group">
                    <Image
                      width={1000}
                      height={1000}
                      alt="image 1"
                      className="z-0 w-full h-auto object-cover"
                      src={
                        item.url
                          ? `${process.env.NEXT_PUBLIC_API_URL}${item.url}`
                          : "/image/nophotos.png"
                      }
                      onClick={() => handleOpenDetails(item.id)}
                    />
                    <div className="absolute flex flex-row justify-center items-center bottom-0 bg-gray-950 w-full h-16 text-neutral-200 space-x-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <Link
                        target="_blank"
                        href={`/landing-page/product/${item.id}`}
                        className="hover:bg-neutral-600 h-full w-full flex flex-row items-center px-2 space-x-2 font-bold"
                      >
                        <Eye /> <span>View product</span>
                      </Link>
                      <button
                        className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center"
                      >
                        <Plus />
                      </button>
                      <button className="hover:bg-neutral-600 h-full w-1/5 flex justify-center items-center">
                        <ArrowDownToLine />
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Row gutter={[30, 30]}>
              {listData?.map((item, index) => (
                <Col key={index} span={6} className="flex justify-center">
                  <Card
                    className={`${isOpenFilter ? "h-[300px]" : "h-[400px]"
                      } relative col-span-12 sm:col-span-4 w-full rounded-sm hover:cursor-pointer overflow-hidden shadow-none`}
                  >
                    <video
                      width={200}
                      height={200}
                      className="z-0 w-full h-full object-cover"
                      controls
                    >
                      <source
                        src={
                          item.url
                            ? `${process.env.NEXT_PUBLIC_API_URL}${item.url}`
                            : "/video/novideo.mp4"
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        :
        <div className="flex justify-center items-center">
          <ScaleLoader color="gray" />
        </div>
      }

      {openDetails != -1 && <SearchDetails setOpen={setOpenDetails} id={openDetails} />}
      <div className="flex flex-row justify-center items-center py-10 space-x-4">
        {props.pageNumber > 1 &&
          <button onClick={()=>props.setPageNumber(prev=>prev-1)}  className=" flex flex-row bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 transition duration-200">
            <ChevronLeft />
            Prev
            
          </button>
        }
        <button onClick={()=>props.setPageNumber(prev=>prev+1)}  className="flex flex-row bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 transition duration-200">
        
          <span>NEXT</span>
          <ChevronRight />
        </button>
      </div>
    </div>

  );
};

export default SearchResult;
